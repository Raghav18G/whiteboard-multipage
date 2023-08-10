/**
 *						  WHITEBOPHIR
 *********************************************************
 * @licstart  The following is the entire license notice for the 
 *	JavaScript code in this page.
 *
 * Copyright (C) 2013  Ophir LOJKINE
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend
 */

// const { func } = require("calculator");

 (function hand() { //Code isolation
	var selectorStates = {
		pointing: 0,
		selecting: 1,
		transform: 2
	}
	var selected = null;
	var selected_els = [];
	var selectionRect = createSelectorRect();
	var selectionRectTransform;
	var currentTransform = null;
	var transform_elements = [];
	var selectorState = selectorStates.pointing;
	var last_sent = 0;
	var blockedSelectionButtons = [""]
	var selectionButtons = [
		createButton("delete", "delete", 24, 24,
			function (me, bbox, s) {
				me.width.baseVal.value = me.origWidth / s;
				me.height.baseVal.value = me.origHeight / s;
				me.x.baseVal.value = bbox.r[0];
				me.y.baseVal.value = bbox.r[1] - (me.origHeight + 3) / s;
				me.style.display = "";
			},
			deleteSelection),

		createButton("duplicate", "duplicate", 24, 24,
			function (me, bbox, s) {
				me.width.baseVal.value = me.origWidth / s;
				me.height.baseVal.value = me.origHeight / s;
				me.x.baseVal.value = bbox.r[0] + (me.origWidth + 2) / s;
				me.y.baseVal.value = bbox.r[1] - (me.origHeight + 3) / s;
				me.style.display = "";
			},
			duplicateSelection),

		createButton("scaleHandle", "handle", 14, 14,
			function (me, bbox, s) {
				me.width.baseVal.value = me.origWidth / s;
				me.height.baseVal.value = me.origHeight / s;
				me.x.baseVal.value = bbox.r[0] + bbox.a[0] - me.origWidth / (2 * s);
				me.y.baseVal.value = bbox.r[1] + bbox.b[1] - me.origHeight / (2 * s);
				me.style.display = "";
			},
			startScalingTransform)
	];

	for (i in blockedSelectionButtons) {
		delete selectionButtons[blockedSelectionButtons[i]];
	}

	var getScale = Tools.getScale;

	function getParentMathematics(el) {
		var target;
		var a = el;
		var els = [];
		while (a) {
			els.unshift(a);
			a = a.parentElement;
		}
		var parentMathematics = els.find(function (el) {
			return el.getAttribute("class") === "MathElement";
		});
		if ((parentMathematics) && parentMathematics.tagName === "svg") {
			target = parentMathematics;
		}
		return target || el;
	}

	function deleteSelection() {
		var msgs = selected_els.map(function (el) {
			return ({
				"type": "delete",
				"id": el.id
			});
		});
		var data = {
			_children: msgs
		}
		Tools.drawAndSend(data);
		selected_els = [];
		hideSelectionUI();
	}

	function duplicateSelection() {
		if (!(selectorState == selectorStates.pointing)
			|| (selected_els.length == 0)) return;
		var msgs = [];
		var newids = [];
		for (var i = 0; i < selected_els.length; i++) {
			var id = selected_els[i].id;
			msgs[i] = {
				type: "copy",
				id: id,
				newid: Tools.generateUID(id[0])
			};
			newids[i] = id;
		}
		Tools.drawAndSend({ _children: msgs });
		selected_els = newids.map(function (id) {
			return Tools.svg.getElementById(id);
		});
	}

  function pointInTransformedBBox(point, transformedBBox) {
    // transformedBBox is an object representing the bounding box after transformations
    // It may contain properties like 'x', 'y', 'width', 'height', and others.
  
    const { x, y, width, height } = transformedBBox;
    const [px, py] = point;
  
    // Check if the point lies within the transformed bounding box
    return px >= x && px <= x + width && py >= y && py <= y + height;
  }
  

	function createSelectorRect() {
		var shape = Tools.createSVGElement("rect"); 
		shape.id = "selectionRect";
		shape.x.baseVal.value = 0;
		shape.y.baseVal.value = 0;
		shape.width.baseVal.value = 0;
		shape.height.baseVal.value = 0;
		shape.setAttribute("stroke", "black");
		shape.setAttribute("stroke-width", 1);
		shape.setAttribute("vector-effect", "non-scaling-stroke");
		shape.setAttribute("fill", "none");
		shape.setAttribute("stroke-dasharray", "5 5");
		shape.setAttribute("opacity", 1);
		Tools.svg.appendChild(shape);
		return shape;
	}

	function createButton(name, icon, width, height, drawCallback, clickCallback) {
		var shape = Tools.createSVGElement("image", {
			href: "tools/hand/" + icon + ".svg",
			width: width, height: height
		});
		shape.style.display = "none";
		shape.origWidth = width;
		shape.origHeight = height;
		shape.drawCallback = drawCallback;
		shape.clickCallback = clickCallback;
		Tools.svg.appendChild(shape);
		return shape;
	}

	function showSelectionButtons() {
		var scale = getScale();
		var selectionBBox = selectionRect.transformedBBox();
		for (var i = 0; i < selectionButtons.length; i++) {
			selectionButtons[i].drawCallback(selectionButtons[i],
				selectionBBox,
				scale);
		}
	}

	function hideSelectionButtons() {
		for (var i = 0; i < selectionButtons.length; i++) {
			selectionButtons[i].style.display = "none";
		}
	}

	function hideSelectionUI() {
		hideSelectionButtons();
		selectionRect.style.display = "none";
	}

	function startMovingElements(x, y, evt) {
		evt.preventDefault();
		selectorState = selectorStates.transform;
		currentTransform = moveSelection;
		selected = { x: x, y: y };
		// Some of the selected elements could have been deleted
		selected_els = selected_els.filter(function (el) {
			return Tools.svg.getElementById(el.id) !== null;
		});
		transform_elements = selected_els.map(function (el) {
			var tmatrix = get_transform_matrix(el);
			return {
				a: tmatrix.a, b: tmatrix.b, c: tmatrix.c,
				d: tmatrix.d, e: tmatrix.e, f: tmatrix.f
			};
		});
		var tmatrix = get_transform_matrix(selectionRect);
		selectionRectTransform = { x: tmatrix.e, y: tmatrix.f };
	}

	function startScalingTransform(x, y, evt) {
		evt.preventDefault();
		hideSelectionButtons();
		selectorState = selectorStates.transform;
		var bbox = selectionRect.transformedBBox();
		selected = {
			x: bbox.r[0],
			y: bbox.r[1],
			w: bbox.a[0],
			h: bbox.b[1],
		};
		transform_elements = selected_els.map(function (el) {
			var tmatrix = get_transform_matrix(el);
			return {
				a: tmatrix.a, b: tmatrix.b, c: tmatrix.c,
				d: tmatrix.d, e: tmatrix.e, f: tmatrix.f
			};
		});
		var tmatrix = get_transform_matrix(selectionRect);
		selectionRectTransform = {
			a: tmatrix.a, d: tmatrix.d,
			e: tmatrix.e, f: tmatrix.f
		};
		currentTransform = scaleSelection;
	}

	function startSelector(x, y, evt) {
		evt.preventDefault();
		selected = { x: x, y: y };
		selected_els = [];
		selectorState = selectorStates.selecting;
		selectionRect.x.baseVal.value = x;
		selectionRect.y.baseVal.value = y;
		selectionRect.width.baseVal.value = 0;
		selectionRect.height.baseVal.value = 0;
		selectionRect.style.display = "";
		tmatrix = get_transform_matrix(selectionRect);
		tmatrix.e = 0;
		tmatrix.f = 0;
	}


	function calculateSelection() {
		var selectionTBBox = selectionRect.transformedBBox();
		var elements = Tools.drawingArea.children;
		var selected = [];
		for (var i = 0; i < elements.length; i++) {
			if (transformedBBoxIntersects(selectionTBBox, elements[i].transformedBBox()))
				selected.push(Tools.drawingArea.children[i]);
		}
		return selected;
	}

	function moveSelection(x, y) {
		var dx = x - selected.x;
		var dy = y - selected.y;
		var msgs = selected_els.map(function (el, i) {
			var oldTransform = transform_elements[i];
			return {
				type: "update",
				id: el.id,
				transform: {
					a: oldTransform.a,
					b: oldTransform.b,
					c: oldTransform.c,
					d: oldTransform.d,
					e: dx + oldTransform.e,
					f: dy + oldTransform.f
				}
			};
		})
		var msg = {
			_children: msgs
		};
		var tmatrix = get_transform_matrix(selectionRect);
		tmatrix.e = dx + selectionRectTransform.x;
		tmatrix.f = dy + selectionRectTransform.y;
		var now = performance.now();
		if (now - last_sent > 70) {
			last_sent = now;
			Tools.drawAndSend(msg);
		} else {
			draw(msg);
		}
	}

	function scaleSelection(x, y) {
		var rx = (x - selected.x) / (selected.w);
		var ry = (y - selected.y) / (selected.h);
		var msgs = selected_els.map(function (el, i) {
			var oldTransform = transform_elements[i];
			var x = el.transformedBBox().r[0];
			var y = el.transformedBBox().r[1];
			var a = oldTransform.a * rx;
			var d = oldTransform.d * ry;
			var e = selected.x * (1 - rx) - x * a +
				(x * oldTransform.a + oldTransform.e) * rx
			var f = selected.y * (1 - ry) - y * d +
				(y * oldTransform.d + oldTransform.f) * ry
			return {
				type: "update",
				id: el.id,
				transform: {
					a: a,
					b: oldTransform.b,
					c: oldTransform.c,
					d: d,
					e: e,
					f: f
				}
			};
		})
		var msg = {
			_children: msgs
		};

		var tmatrix = get_transform_matrix(selectionRect);
		tmatrix.a = rx;
		tmatrix.d = ry;
		tmatrix.e = selectionRectTransform.e +
			selectionRect.x.baseVal.value * (selectionRectTransform.a - rx)
		tmatrix.f = selectionRectTransform.f +
			selectionRect.y.baseVal.value * (selectionRectTransform.d - ry)
		var now = performance.now();
		if (now - last_sent > 70) {
			last_sent = now;
			Tools.drawAndSend(msg);
		} else {
			draw(msg);
		}
	}

	function updateRect(x, y, rect) {
		rect.x.baseVal.value = Math.min(x, selected.x);
		rect.y.baseVal.value = Math.min(y, selected.y);
		rect.width.baseVal.value = Math.abs(x - selected.x);
		rect.height.baseVal.value = Math.abs(y - selected.y);
	}

	function resetSelectionRect() {
		var bbox = selectionRect.transformedBBox();
		var tmatrix = get_transform_matrix(selectionRect);
		selectionRect.x.baseVal.value = bbox.r[0];
		selectionRect.y.baseVal.value = bbox.r[1];
		selectionRect.width.baseVal.value = bbox.a[0];
		selectionRect.height.baseVal.value = bbox.b[1];
		tmatrix.a = 1; tmatrix.b = 0; tmatrix.c = 0;
		tmatrix.d = 1; tmatrix.e = 0; tmatrix.f = 0;
	}

	function get_transform_matrix(elem) {
		// Returns the first translate or transform matrix or makes one
		var transform = null;
		for (var i = 0; i < elem.transform.baseVal.numberOfItems; ++i) {
			var baseVal = elem.transform.baseVal[i];
			// quick tests showed that even if one changes only the fields e and f or uses createSVGTransformFromMatrix
			// the brower may add a SVG_TRANSFORM_MATRIX instead of a SVG_TRANSFORM_TRANSLATE
			if (baseVal.type === SVGTransform.SVG_TRANSFORM_MATRIX) {
				transform = baseVal;
				break;
			}
		}
		if (transform == null) {
			transform = elem.transform.baseVal.createSVGTransformFromMatrix(Tools.svg.createSVGMatrix());
			elem.transform.baseVal.appendItem(transform);
		}
		return transform.matrix;
	}

	function draw(data) {
		if (data._children) {
			batchCall(draw, data._children);
		}
		else {
			switch (data.type) {
				case "update":
					var elem = Tools.svg.getElementById(data.id);
					if (!elem) throw new Error("Mover: Tried to move an element that does not exist.");
					var tmatrix = get_transform_matrix(elem);
					for (i in data.transform) {
						tmatrix[i] = data.transform[i]
					}
					break;
				case "copy":
					var newElement = Tools.svg.getElementById(data.id).cloneNode(true);
					newElement.id = data.newid;
					Tools.drawingArea.appendChild(newElement);
					break;
				case "delete":
					data.tool = "Eraser";
					messageForTool(data);
					break;
				default:
					throw new Error("Mover: 'move' instruction with unknown type. ", data);
			}
		}
	}

	function clickSelector(x, y, evt) {
		selectionRect = selectionRect || createSelectorRect();
		for (var i = 0; i < selectionButtons.length; i++) {
			if (selectionButtons[i].contains(evt.target)) {
				var button = selectionButtons[i];
			}
		}
		if (button) {
			button.clickCallback(x, y, evt);
		} else if (pointInTransformedBBox([x, y], selectionRect.transformedBBox())) {
			hideSelectionButtons();
			startMovingElements(x, y, evt);
		} else if (Tools.drawingArea.contains(evt.target)) {
			hideSelectionUI();
			selected_els = [getParentMathematics(evt.target)];
			startMovingElements(x, y, evt);
		} else {
			hideSelectionButtons();
			startSelector(x, y, evt);
		}
	}

	function releaseSelector(x, y, evt) {
		if (selectorState == selectorStates.selecting) {
			selected_els = calculateSelection();
			if (selected_els.length == 0) {
				hideSelectionUI();
			}
		} else if (selectorState == selectorStates.transform)
			resetSelectionRect();
		if (selected_els.length != 0) showSelectionButtons();
		transform_elements = [];
		selectorState = selectorStates.pointing;
	}

	function moveSelector(x, y, evt) {
		if (selectorState == selectorStates.selecting) {
			updateRect(x, y, selectionRect);
		} else if (selectorState == selectorStates.transform && currentTransform) {
			currentTransform(x, y);
		}
	}

	function startHand(x, y, evt, isTouchEvent) {
		evt.preventDefault()
        evt.stopPropagation();
		if (!isTouchEvent) {
			selected = {
				x: document.documentElement.scrollLeft + evt.clientX,
				y: document.documentElement.scrollTop + evt.clientY,
			}
			console.log('harsh moce called')
		
		}
		else{
			selected = {
				x: document.documentElement.scrollLeft + evt.touches[0].clientX,
				y: document.documentElement.scrollTop + evt.touches[0].clientY,
			}
		}
	}
	
	function moveHand(x, y, evt, isTouchEvent) {
		evt.preventDefault()
        evt.stopPropagation();
		if (selected && !isTouchEvent) { //Let the browser handle touch to scroll
			console.log(selected.x ,evt, selected.y , evt.clientY,selected)
			window.scrollTo(selected.x - evt.clientX, selected.y - evt.clientY);
		}
		else{
			if(selected){
				const touch = evt.touches[0]
			window.scrollTo(selected.x - touch.clientX, selected.y - touch.clientY);
			}
		}
	}

	
	function press(x, y, evt, isTouchEvent) {
		console.log("press",isTouchEvent)
		evt.preventDefault()
        evt.stopPropagation();
		if (!handTool.secondary.active) startHand(x, y, evt, isTouchEvent);
		else clickSelector(x, y, evt, isTouchEvent);
	}


	function move(x, y, evt, isTouchEvent) {
		console.log('move')
        evt.stopPropagation();
		evt.preventDefault()
		if (!handTool.secondary.active) moveHand(x, y, evt, isTouchEvent);
		else moveSelector(x, y, evt, isTouchEvent);
	}

	function release(x, y, evt, isTouchEvent) {
		console.log('release')
		evt.preventDefault()
        evt.stopPropagation();
		move(x, y, evt, isTouchEvent);
		if (handTool.secondary.active) releaseSelector(x, y, evt, isTouchEvent);
		selected = null;

	}

	function deleteShortcut(e) {
		if (e.key == "Delete" &&
			!e.target.matches("input[type=text], textarea"))
			deleteSelection();
	}

	function duplicateShortcut(e) {
		if (e.key == "d" &&
			!e.target.matches("input[type=text], textarea"))
			duplicateSelection();
	}

	function switchTool() {
		onquit();
		if (handTool.secondary.active) {
			window.addEventListener("keydown", deleteShortcut);
			window.addEventListener("keydown", duplicateShortcut);
		}
	}

	function onquit() {
		selected = null;
		hideSelectionUI();
		window.removeEventListener("keydown", deleteShortcut);
		window.removeEventListener("keydown", duplicateShortcut);
	}
  var gridSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M0,0V17H17V0ZM12,1V4H9V1ZM8,9v3H5V9ZM5,8V5H8V8ZM9,9h3v3H9ZM9,8V5h3V8ZM8,1V4H5V1ZM1,1H4V4H1ZM1,5H4V8H1ZM1,9H4v3H1Zm0,7V13H4v3Zm4,0V13H8v3Zm4,0V13h3v3Zm7,0H13V13h3Zm0-4H13V9h3Zm0-4H13V5h3Zm0-4H13V1h3Z"/></g></g></svg>';
  var handSvg = `<svg class="tool-icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.9094 3.92194C17.8955 2.88646 16.4495 2.50452 15.034 2.9073C14.6356 3.02066 14.2207 2.78959 14.1074 2.39119C13.994 1.99279 14.2251 1.57792 14.6235 1.46456C16.5617 0.913072 18.5781 1.43959 19.9812 2.8725C20.271 3.16846 20.266 3.64331 19.97 3.9331C19.6741 4.2229 19.1992 4.2179 18.9094 3.92194ZM11.1938 3.30839C10.9797 2.94131 10.3559 2.7187 9.72223 3.08085C9.09088 3.44168 8.97984 4.07772 9.19017 4.4384L11.7158 8.76952C11.9245 9.12734 11.8036 9.58656 11.4457 9.79522C11.0879 10.0039 10.6287 9.88296 10.42 9.52514L7.89439 5.19403C7.89427 5.19381 7.89452 5.19424 7.89439 5.19403L7.05251 3.75032C6.83845 3.38324 6.21464 3.16063 5.58096 3.52278C4.94961 3.88361 4.83857 4.51965 5.0489 4.88033L8.83739 11.377C9.04604 11.7348 8.92513 12.1941 8.56731 12.4027C8.20949 12.6114 7.75027 12.4905 7.54161 12.1326L5.85784 9.24522C5.64378 8.87814 5.01997 8.65553 4.38629 9.01768C3.75494 9.37851 3.6439 10.0145 3.85423 10.3752L7.64272 16.8719C9.25165 19.631 13.222 20.5264 16.589 18.6021C19.9536 16.6792 21.1497 12.8377 19.5445 10.085L17.0188 5.75387C16.8048 5.3868 16.1809 5.16418 15.5473 5.52633C14.9159 5.88716 14.8049 6.5232 15.0152 6.88389L16.699 9.7713C16.7998 9.94411 16.8273 10.15 16.7755 10.3432C16.7237 10.5365 16.5969 10.701 16.4232 10.8003C14.8808 11.6818 14.4081 13.3863 15.0834 14.5443C15.292 14.9022 15.1711 15.3614 14.8133 15.57C14.4555 15.7787 13.9963 15.6578 13.7876 15.3C12.7284 13.4835 13.3951 11.2368 15.051 9.92287L11.1938 3.30839ZM13.922 5.00916L12.4896 2.55277C11.7737 1.32517 10.1665 1.09928 8.97794 1.77853C8.61165 1.98787 8.3001 2.27483 8.0652 2.60775C7.26515 1.72687 5.88732 1.62001 4.83667 2.22046C3.64583 2.90104 3.03354 4.40197 3.75312 5.63596L4.75529 7.35452C4.37025 7.39635 3.98835 7.51742 3.642 7.71536C2.45116 8.39595 1.83887 9.89687 2.55845 11.1309L6.34694 17.6275C8.45768 21.2471 13.4115 22.1458 17.3333 19.9044C21.2574 17.6617 22.9547 12.9554 20.8402 9.32937L18.3146 4.99825C17.5987 3.77065 15.9915 3.54476 14.803 4.22401C14.453 4.42406 14.1529 4.69498 13.922 5.00916ZM4.41743 17.859C4.77525 17.6504 5.23447 17.7713 5.44313 18.1291C6.26999 19.5471 7.53408 20.6193 9.09296 21.3151C9.47121 21.4839 9.64099 21.9274 9.47217 22.3057C9.30335 22.6839 8.85986 22.8537 8.48161 22.6849C6.6701 21.8764 5.1503 20.6046 4.14735 18.8847C3.93869 18.5269 4.05961 18.0677 4.41743 17.859Z" fill="#1C274C"/></svg><label style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Hand</p></label>`;
   var handTool = {
    //The new tool
    name: "Hand",
    shortcut: "h",
    listeners: {
      press: press,
      move: move,
      release: release,
    },
    onquit: onquit,
    secondary: {
      name: "Selector",
      icon: gridSVG,
      active: false,
      switch: switchTool,
    },
    draw: draw,
    iconHTML: handSvg,
    mouseCursor: "pointer",
    showMarker: true,
  };

  Tools.add(handTool);
  Tools.change("Hand"); // Use the hand tool by default 
})(); //End of code isolation
