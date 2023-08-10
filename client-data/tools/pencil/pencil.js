/**
 *                        WHITEBOPHIR
 *********************************************************
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
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

(function () { //Code isolation

	//Indicates the id of the line the user is currently drawing or an empty string while the user is not drawing
	var pencilSVG = '<svg class="tool-icon-svg" xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none"><path d="M14.363 3.63703L15.2722 2.72777C16.7787 1.22127 19.2855 1.28554 20.8713 2.87134C22.4571 4.45713 22.5214 6.96394 21.0149 8.47045L20.1056 9.3797M14.363 3.63703C14.363 3.63703 14.5305 5.62304 16.3251 7.41762C18.1196 9.21221 20.1056 9.3797 20.1056 9.3797M14.363 3.63703L5.04663 12.9534C4.48044 13.5196 4.19735 13.8027 3.95569 14.1166C3.67063 14.4869 3.4284 14.8894 3.23331 15.3167C3.06792 15.679 2.94798 16.0655 2.7081 16.8384L1.69162 20.1137M20.1056 9.3797L10.7893 18.696C10.2231 19.2622 9.94002 19.5453 9.62607 19.787C9.25573 20.072 8.85332 20.3143 8.42597 20.5094C8.06369 20.6747 7.67722 20.7947 6.90427 21.0346L3.62893 22.0511M3.62893 22.0511L2.82829 22.2995C2.44792 22.4176 2.02238 22.3069 1.72909 22.0136C1.43579 21.7203 1.3251 21.2948 1.44314 20.9144L1.69162 20.1137M3.62893 22.0511L1.69162 20.1137" stroke="#1C274C" stroke-width="1.5"/></svg><label class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Pencil</p></label>';
	var eraserSVG = '<svg class="tool-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 17"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M13,0,0,13l4,4h8l9-9Zm6.59,8L14.5,13.09,7.91,6.5,13,1.41Zm-8,8H4.42l-3-3,5.8-5.79,6.58,6.58Z"/></g></g></svg> <label class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Eraser</p></label>';
	var curLineId = "",
		startX=0,
		startY=0,
		// penIcons = ["✏","W"],
		penIcons = [pencilSVG, eraserSVG];
		lastTime = performance.now(), //The time at which the last point was drawn
		end=false;
	var curPen = {
		"mode":"Pencil",
		"penSize":3,
		"eraserSize":16
	};
	//The data of the message that will be sent for every new point
	function PointMessage(x, y) {
		this.type = 'child';
		this.parent = curLineId;
		this.x = x-(Tools.showMarker?25:0);
		this.y = y-(Tools.showMarker?25:0);
	}

	function onStart(){
		if(curPen.mode=="White out"){
			Tools.setSize(curPen.eraserSize);
			Tools.showMarker=true;
		}
	};

	function onQuit(){
		if(curPen.mode=="White out"){
			Tools.setSize(curPen.penSize);
		}
		Tools.showMarker=false;
		var cursor = Tools.svg.getElementById("mycursor");
		if(cursor){
			cursor.remove();
		}
	};


	function startLine(x, y, evt) {
		//Prevent the press from being interpreted by the browser
		evt.preventDefault();

		Tools.suppressPointerMsg = true;
		curLineId = Tools.generateUID("l"); //"l" for line

		Tools.drawAndSend({
			'type': 'line',
			'id': curLineId,
			'color': (curPen.mode=="Pencil"?Tools.getColor():"white"),
			'size': Tools.getSize(),
			'opacity': Tools.getOpacity()
		});
		startX=x;
		startY=y;
		//Immediatly add a point to the line
		continueLine(x, y);
	}

	function continueLine(x, y, evt) {
		/*Wait 20ms before adding any point to the currently drawing line.
		This allows the animation to be smother*/
		if (curLineId !== "" && (performance.now() - lastTime > 20 || end)) {
			Tools.drawAndSend(new PointMessage(x, y));
			lastTime = performance.now();
			if(wb_comp.list["Measurement"]){
				wb_comp.list["Measurement"].update(
					{type:"Path",
					x:startX,
					y:startY,
					x2:x,
					y2:y,
					}
				)
			}
		}
		if (evt) evt.preventDefault();
	}

	function stopLine(x, y, evt) {
		evt.preventDefault();
		//Add a last point to the line
		end=true;
		continueLine(x, y);
		end=false;
		curLineId = "";
		Tools.suppressPointerMsg = false;
	}

	var renderingLine = {};
	function draw(data) {
		Tools.drawingEvent=true;
		switch (data.type) {
			case "line":
				renderingLine = createLine(data);
				if(data.pts) addPoints(renderingLine,data.pts);
				break;
			case "child":
				var line = (renderingLine.id == data.parent) ? renderingLine : svg.getElementById(data.parent);
				if (!line) {
					console.error("Pencil: Hmmm... I received a point of a line that has not been created (%s).", data.parent);
					return false;
				}else{
					if(Tools.useLayers){
						if(line.getAttribute("class")!="layer"+Tools.layer){
							line.setAttribute("class","layer-"+Tools.layer);
							Tools.group.appendChild(line);
						}
					}
				};
				addPoints(line, [[data.x, data.y]], true);
				break;
			case "endline":
				//TODO?
				break;
			default:
				console.error("Pencil: Draw instruction with unknown type. ", data);
				break;``
		}
	}

	function dist(x1, y1, x2, y2) {
		//Returns the distance between (x1,y1) and (x2,y2)
		return Math.hypot(x2 - x1, y2 - y1);
	}

	function getPathData(line) {
		var pathData = Tools.pathDataCache[line.id];
		if (!pathData) {
			pathData = line.getPathData();
			Tools.pathDataCache[line.id] = pathData;
		}
		return pathData;
	}

	var svg = Tools.svg;
	function addPoints(line, npts, single) {
		var pts = getPathData(line); //The points that are already in the line as a PathData
		for(var i = 0; i  < npts.length; i++){
			var npoint;
			var x = npts[i][0];
			var y = npts[i][1];
			var nbr = pts.length; //The number of points already in the line
			switch (nbr) {
				case 0: //The first point in the line
					//If there is no point, we have to start the line with a moveTo statement
					npoint = { type: "M", values: [x, y] };
					break;
				case 1: //There is only one point.
					//Draw a curve that is segment between the old point and the new one
					npoint = {
						type: "C", values: [
							pts[0].values[0], pts[0].values[1],
							x, y,
							x, y,
						]
					};
					break;
				default: //There are at least two points in the line
					//We add the new point, and smoothen the line
					var ANGULARITY = 3; //The lower this number, the smoother the line
					var prev_values = pts[nbr - 1].values; // Previous point
					var ante_values = pts[nbr - 2].values; // Point before the previous one
					var prev_x = prev_values[prev_values.length - 2];
					var prev_y = prev_values[prev_values.length - 1];
					var ante_x = ante_values[ante_values.length - 2];
					var ante_y = ante_values[ante_values.length - 1];


					//We don't want to add the same point twice consecutively
					if (!((prev_x == x && prev_y == y)
						|| (ante_x == x && ante_y == y))){

						var vectx = x - ante_x,
							vecty = y - ante_y;
						var norm = Math.hypot(vectx, vecty);
						var dist1 = dist(ante_x, ante_y, prev_x, prev_y) / norm,
							dist2 = dist(x, y, prev_x, prev_y) / norm;
						vectx /= ANGULARITY;
						vecty /= ANGULARITY;
						//Create 2 control points around the last point
						var cx1 = prev_x - dist1 * vectx,
							cy1 = prev_y - dist1 * vecty, //First control point
							cx2 = prev_x + dist2 * vectx,
							cy2 = prev_y + dist2 * vecty; //Second control point
						prev_values[2] = cx1;
						prev_values[3] = cy1;
						
						npoint = {
							type: "C", values: [
								cx2, cy2,
								x, y,
								x, y,
							]
						};
					}else{
						if(single)return;
					}
			}
			if(npoint)pts.push(npoint);
		}
		line.setPathData(pts);
	}

	function createLine(lineData) {
		//Creates a new line on the canvas, or update a line that already exists with new information
		var line = svg.getElementById(lineData.id) || Tools.createSVGElement("path");
		line.id = lineData.id;
		//If some data is not provided, choose default value. The line may be updated later
		line.setAttribute("stroke", lineData.color || "black");
		line.setAttribute("stroke-width", lineData.size || 10);
		if(Tools.useLayers)
		line.setAttribute("class","layer-"+Tools.layer);
		if(lineData.data){
			line.setAttribute("data-lock",lineData.data);
		}
		if(lineData.transform)
			line.setAttribute("transform",lineData.transform);
		line.setAttribute("opacity", Math.max(0.1, Math.min(1, lineData.opacity)) || 1);
		Tools.group.appendChild(line);
		return line;
	}


	function toggle(elem){
		var index = 0;
		if(curPen.mode=="Pencil"){
			curPen.mode="White out"
			curPen.penSize=Tools.getSize();
			Tools.setSize(curPen.eraserSize);
			Tools.showMarker=true;
			index=1;
		}else{
			curPen.mode="Pencil"
			curPen.eraserSize=Tools.getSize();
			Tools.setSize(curPen.penSize);
			Tools.showMarker=false;
			var cursor = Tools.svg.getElementById("mycursor");
			if(cursor){
				cursor.remove();
			}
		}
		elem.getElementsByClassName("tool-icon")[0].innerHTML = penIcons[index];

		  // Update the title attribute based on the current mode
		  elem.setAttribute("title", curPen.mode === "Pencil" ? "For Eraser click to toggle" : "For Pencil click to toggle");

	};

	Tools.add({ //The new tool
		// "name": "Pencil",
		// "icon": "✏",
		"iconHTML": pencilSVG,
		"name": "Pencil",
		"title":" For Eraser",
		"listeners": {
			"press": startLine,
			"move": continueLine,
			"release": stopLine,
		},
		"shortcuts": {
            "changeTool":"1"
        },
		"draw": draw,
		"toggle":toggle,
		"onstart":onStart,
		"onquit":onQuit,
		"mouseCursor": "crosshair",
		"stylesheet": "tools/pencil/pencil.css"
	});

})(); //End of code isolation
