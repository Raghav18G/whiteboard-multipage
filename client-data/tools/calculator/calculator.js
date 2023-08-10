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


(function calculator() { //Code isolation

	var toggle = 0;
	var opened = false;
	var msg = {
		"type": "e",
		"state":"",
	};
	var win = {
		toggle : 0,
		max:false
	 };
	var calculatorSVG = '<svg class="tool-icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.25 6.448L22.25 6.552C22.25 7.45047 22.2501 8.19971 22.1701 8.79448C22.0857 9.42228 21.9 9.98908 21.4445 10.4445C20.9891 10.9 20.4223 11.0857 19.7945 11.1701C19.1997 11.2501 18.4505 11.25 17.552 11.25L6.448 11.25C5.54953 11.25 4.80029 11.2501 4.20552 11.1701C3.57772 11.0857 3.01092 10.9 2.55545 10.4445C2.09998 9.98908 1.91431 9.42228 1.82991 8.79448C1.74994 8.1997 1.74997 7.45048 1.75 6.552L1.75 6.44801C1.74997 5.54953 1.74994 4.80031 1.82991 4.20552C1.91431 3.57773 2.09998 3.01093 2.55545 2.55546C3.01092 2.09999 3.57772 1.91432 4.20552 1.82991C4.80029 1.74995 5.5495 1.74997 6.44797 1.75L17.552 1.75C18.4505 1.74997 19.1997 1.74995 19.7945 1.82991C20.4223 1.91432 20.9891 2.09999 21.4445 2.55546C21.9 3.01093 22.0857 3.57773 22.1701 4.20552C22.2501 4.8003 22.25 5.54954 22.25 6.448ZM20.6835 4.40539C20.6214 3.94393 20.5142 3.74644 20.3839 3.61612C20.2536 3.4858 20.0561 3.37858 19.5946 3.31654C19.1116 3.2516 18.464 3.25 17.5 3.25L6.5 3.25C5.53598 3.25 4.88843 3.2516 4.40539 3.31654C3.94393 3.37858 3.74643 3.4858 3.61611 3.61612C3.4858 3.74644 3.37857 3.94393 3.31653 4.40539C3.25159 4.88843 3.25 5.53599 3.25 6.5C3.25 7.46401 3.25159 8.11157 3.31653 8.59461C3.37857 9.05607 3.4858 9.25357 3.61611 9.38389C3.74643 9.5142 3.94393 9.62142 4.40539 9.68347C4.88842 9.74841 5.53598 9.75 6.5 9.75L17.5 9.75C18.464 9.75 19.1116 9.74841 19.5946 9.68347C20.0561 9.62143 20.2536 9.5142 20.3839 9.38389C20.5142 9.25357 20.6214 9.05607 20.6835 8.59461C20.7484 8.11157 20.75 7.46401 20.75 6.5C20.75 5.53599 20.7484 4.88843 20.6835 4.40539Z" fill="#1C274C"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.25 17.448L13.25 17.552C13.25 18.4505 13.2501 19.1997 13.1701 19.7945C13.0857 20.4223 12.9 20.9891 12.4445 21.4445C11.9891 21.9 11.4223 22.0857 10.7945 22.1701C10.1997 22.2501 9.45051 22.25 8.55205 22.25L6.448 22.25C5.54954 22.25 4.80028 22.2501 4.20552 22.1701C3.57772 22.0857 3.01092 21.9 2.55545 21.4445C2.09998 20.9891 1.91431 20.4223 1.82991 19.7945C1.74994 19.1997 1.74996 18.4505 1.74999 17.5521L1.74999 17.448C1.74997 16.5496 1.74994 15.8003 1.82991 15.2055C1.91431 14.5777 2.09998 14.0109 2.55545 13.5555C3.01092 13.1 3.57772 12.9143 4.20552 12.8299C4.8003 12.7499 5.54952 12.75 6.448 12.75L8.552 12.75C9.45048 12.75 10.1997 12.7499 10.7945 12.8299C11.4223 12.9143 11.9891 13.1 12.4445 13.5555C12.9 14.0109 13.0857 14.5777 13.1701 15.2055C13.2501 15.8003 13.25 16.5495 13.25 17.448ZM11.6835 15.4054C11.6214 14.9439 11.5142 14.7464 11.3839 14.6161C11.2536 14.4858 11.0561 14.3786 10.5946 14.3165C10.1116 14.2516 9.46401 14.25 8.5 14.25L6.5 14.25C5.53598 14.25 4.88843 14.2516 4.40539 14.3165C3.94393 14.3786 3.74643 14.4858 3.61611 14.6161C3.4858 14.7464 3.37857 14.9439 3.31653 15.4054C3.25159 15.8884 3.25 16.536 3.25 17.5C3.25 18.464 3.25159 19.1116 3.31653 19.5946C3.37857 20.0561 3.4858 20.2536 3.61611 20.3839C3.74643 20.5142 3.94393 20.6214 4.40539 20.6835C4.88842 20.7484 5.53599 20.75 6.5 20.75L8.5 20.75C9.46401 20.75 10.1116 20.7484 10.5946 20.6835C11.0561 20.6214 11.2536 20.5142 11.3839 20.3839C11.5142 20.2536 11.6214 20.0561 11.6835 19.5946C11.7484 19.1116 11.75 18.464 11.75 17.5C11.75 16.536 11.7484 15.8884 11.6835 15.4054Z" fill="#1C274C"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.25 16.4748C22.25 16.0303 22.25 15.6592 22.2292 15.3546C22.2076 15.0375 22.1609 14.738 22.0407 14.4476C21.7616 13.7738 21.2262 13.2384 20.5524 12.9593C20.262 12.8391 19.9625 12.7924 19.6454 12.7708C19.3407 12.75 18.9697 12.75 18.5252 12.75L18.4747 12.75C18.0303 12.75 17.6592 12.75 17.3546 12.7708C17.0375 12.7924 16.738 12.8391 16.4476 12.9593C15.7738 13.2384 15.2384 13.7738 14.9593 14.4476C14.839 14.738 14.7924 15.0375 14.7708 15.3546C14.75 15.6592 14.75 16.0303 14.75 16.4747L14.75 18.5253C14.75 18.9697 14.75 19.3408 14.7708 19.6454C14.7924 19.9625 14.839 20.262 14.9593 20.5524C15.2384 21.2262 15.7738 21.7616 16.4476 22.0407C16.738 22.161 17.0375 22.2076 17.3546 22.2292C17.6592 22.25 18.0303 22.25 18.4747 22.25L18.5253 22.25C18.9697 22.25 19.3407 22.25 19.6454 22.2292C19.9625 22.2076 20.262 22.161 20.5524 22.0407C21.2262 21.7616 21.7616 21.2262 22.0407 20.5524C22.1609 20.262 22.2076 19.9625 22.2292 19.6454C22.25 19.3408 22.25 18.9698 22.25 18.5254L22.25 16.4748ZM20.6548 15.0216C20.6868 15.0988 20.7163 15.216 20.7327 15.4567C20.7496 15.7042 20.75 16.0238 20.75 16.5L20.75 18.5C20.75 18.9762 20.7496 19.2958 20.7327 19.5433C20.7163 19.784 20.6868 19.9012 20.6548 19.9784C20.528 20.2846 20.2846 20.528 19.9784 20.6549C19.9012 20.6868 19.784 20.7163 19.5433 20.7327C19.2958 20.7496 18.9762 20.75 18.5 20.75C18.0238 20.75 17.7042 20.7496 17.4567 20.7327C17.216 20.7163 17.0988 20.6868 17.0216 20.6549C16.7154 20.528 16.472 20.2846 16.3451 19.9784C16.3132 19.9012 16.2837 19.784 16.2673 19.5433C16.2504 19.2958 16.25 18.9762 16.25 18.5L16.25 16.5C16.25 16.0238 16.2504 15.7042 16.2673 15.4567C16.2837 15.216 16.3132 15.0988 16.3451 15.0216C16.472 14.7154 16.7154 14.472 17.0216 14.3452C17.0988 14.3132 17.216 14.2837 17.4567 14.2673C17.7042 14.2504 18.0238 14.25 18.5 14.25C18.9762 14.25 19.2958 14.2504 19.5433 14.2673C19.784 14.2837 19.9012 14.3132 19.9784 14.3452C20.2846 14.472 20.528 14.7154 20.6548 15.0216Z" fill="#1C274C"/></svg><label class="label-tool" style="font-size:10px;line-height: 2px; font-weight:400;margin-top: 14px;"><p>Calculator</p></label>';
	var elt = document.getElementById('calculator');
	var container = document.getElementById('calc-container');
	var calculator = Desmos.GraphingCalculator(elt);
	var lastState;
	calculator.observeEvent('change', relayChanges);
	

    //elt.style.width = '600px';
	//elt.style.height = '400px';
	//calculator.resize();

	function toggleCalc() {
		var btn = document.getElementById("toolID-Calculator");
		if(toggle){
			container.style.display = "none";
			btn.style.backgroundColor = "";
			btn.style.borderRadius = "";
			toggle=0;
		}else{
			Tools.focusWindow(container);
			if(win.max)pos_max_win()
			else pos_win()
			btn.style.backgroundColor = "#eeeeff";
			btn.style.borderRadius = "8px";
			container.style.display = "block";
			toggle=1;
			if(opened) return;
			opened = true;
			init_window();
			
		}
	};

	function relayChanges() {
		msg.state = calculator.getState();
		diff(msg,lastState,msg.state);
		lastState = msg.state;
		Tools.send(msg,"Calculator");
	};

	//diff and merge "should" allow people to work on different expressions without interrupting each other
	function diff(state){
		const [olist,nlist] = getLists(lastState,state);
		let prevExpressions = {};
		let ids = new Set();
		olist.forEach(
			expression => {
				prevExpressions[expression.id]=expression
				ids.add(expression.id);
			}
		);
		nlist.forEach(
			expression => {
				if(JSON.stringify(expression)==JSON.stringify(prevExpressions[expression.id])){
					ids.delete(expression.id);
				}else{
					ids.add(expression.id);
				}
			}
		);
		msg.diff = Array.from(ids);
	};

	function merge(state,newDiff){
		const [olist,nlist] = getLists(lastState,state);
		let newExpressions = {};
		olist.forEach(
			expression => {
				if(!newDiff.includes(expression.id)){
					newExpressions[expression.id]=expression
				}
			}
		);
		nlist.forEach(
			expression => {
				if(newDiff.includes(expression.id) || !newExpressions[expression.id]){
					newExpressions[expression.id]=expression
				}
			}
		);
		if(!state.expressions)state.expressions = {};
		state.expressions.list = [];
		for (const id in newExpressions) {
			state.expressions.list.push(newExpressions[id])
		}
	};

	function getLists(
		{
			expressions: {
				list: olist = []
			} = {}
		} = {},
		{
			expressions: {
				list: nlist = []
			} = {}
		}
	){
		return [olist,nlist]
	};

	function draw(data) {
		var elem;
		switch (data.type) {
			case "e":
				calculator.unobserveEvent('change');
				merge(data.state,data.diff);
				calculator.setState(data.state);
				lastState = data.state;
				calculator.observeEvent('change', relayChanges);
				break;
			default:
				console.error("Clear: 'calc' instruction with unknown type. ", data);
				break;
		}
	}

	function init_window(){
		document.getElementById("close-calc").addEventListener("click", toggleCalc);
		document.getElementById("max-calc").addEventListener("click", toggleMax);
		dragElement(document.getElementById("calc-container"));
		function dragElement(elmnt) {

			var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
			var header = document.getElementById(elmnt.id + "-header")
			if (document.getElementById(header)) {
			/* if present, the header is where you move the DIV from:*/
			//	if(!isTouchDevice){
					header.addEventListener("mousedown",dragMouseDown,false);
				//}else{
					header.addEventListener("touchstart",dragMouseDown,{ 'passive': false });
				//}
			} else {
				/* otherwise, move the DIV from anywhere inside the DIV:*/
				//if(!isTouchDevice){
					header.addEventListener("mousedown",dragMouseDown,false);
				//}else{
					header.addEventListener("touchstart",dragMouseDown,{ 'passive': false });
				//}
			}
		
			function dragMouseDown(e) {
				e = e || window.event;
				if(win.max)return;
				//e.preventDefault();
				// get the mouse cursor position at startup:
				if(e.type.startsWith("touch")){
					if (e.changedTouches.length === 1) {
						var touch = e.changedTouches[0];
						pos3 = touch.pageX
						pos4 = touch.pageY
					}
				}else{
					pos3 = e.clientX;
					pos4 = e.clientY;
				}
				Tools.focusWindow(elmnt);
				// call a function whenever the cursor moves:
				//if(!isTouchDevice){
					document.addEventListener("mouseup",closeDragElement,false);
					document.addEventListener("mousemove",elementDrag,false);
				//}else{
					document.addEventListener("touchend",closeDragElement,{ 'passive': false });
					document.addEventListener("touchmove",elementDrag,{ 'passive': false });
				//}
			
			}
		
			function elementDrag(e) {
				e = e || window.event;
				e.preventDefault();
				// calculate the new cursor position:
				if(e.type.startsWith("touch")){
					if (e.changedTouches.length === 1) {
						var touch = e.changedTouches[0];
						pos1 = pos3 - touch.pageX;
						pos2 = pos4 - touch.pageY;
						pos3 = touch.pageX
						pos4 = touch.pageY
					}
				}else{
					pos1 = pos3 - e.clientX;
					pos2 = pos4 - e.clientY;
					pos3 = e.clientX;
					pos4 = e.clientY;
				}
				
				// set the element's new position:
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			}
		
			function closeDragElement(e) {
				//e.preventDefault();
			/* stop moving when mouse button is released:*/
				document.removeEventListener("mouseup",closeDragElement,false);
				document.removeEventListener("mousemove",elementDrag,false);
				document.removeEventListener("touchend",closeDragElement,false);
				document.removeEventListener("touchmove",elementDrag,false);
			}
		}
	};

	function toggleMax() {
		if(win.max){
			pos_win();
			win.max=false;
		}else{
			pos_max_win()
			win.max=true;
		}
	};

	function pos_win(){
		container.style.position = "";
		container.style.zIndex= "";
		container.style.left =  (win.l? win.l - document.documentElement.scrollLeft: (65+document.documentElement.scrollLeft)) + "px";
		container.style.top =   (win.t? win.t - document.documentElement.scrollTop: (19+document.documentElement.scrollTop)) + "px"; 
		container.style.width = ''; 
		container.style.height = '';
	};
	function pos_max_win(){
		container.style.position = "fixed";
		container.style.zIndex=100;
		win.l = $(container).offset().left;
		win.t = $(container).offset().top;
		container.style.left =  '0px'; 
		container.style.top =  '0px'; 
		container.style.width = '100%'; 
		container.style.height = '100%';
	};


	Tools.add({ //The new tool
		"name": "Calculator",
		// "icon": "🗑",
		// "iconHTML":"<i id='calc-icon' style='color: #FF8C00;margin-top:7px' class='fas fa-calculator'></i>",
		"iconHTML": calculatorSVG,
		//"shortcut": "e",
		"listeners": {},
		"draw": draw,
		"oneTouch":true,
		"isExtra":false,
		"onstart":toggleCalc,
		"mouseCursor": "crosshair",
		"stylesheet": "tools/calculator/calculator.css"
	});

})(); //End of code isolation