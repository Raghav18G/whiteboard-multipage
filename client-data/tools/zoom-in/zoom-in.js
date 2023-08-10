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

(function () {
  //Code isolation
  var origin = {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    x: 0.0,
    y: 0.0,
    clientY: 0,
    scale: 1.0,
  };
  var moved = false,
    pressed = false;
  var zoomOutSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" class="tool-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5ZM11.5 8.25C11.9142 8.25 12.25 8.58579 12.25 9V10.75H14C14.4142 10.75 14.75 11.0858 14.75 11.5C14.75 11.9142 14.4142 12.25 14 12.25H12.25V14C12.25 14.4142 11.9142 14.75 11.5 14.75C11.0858 14.75 10.75 14.4142 10.75 14V12.25H9C8.58579 12.25 8.25 11.9142 8.25 11.5C8.25 11.0858 8.58579 10.75 9 10.75H10.75V9C10.75 8.58579 11.0858 8.25 11.5 8.25Z" fill="#1C274C"/></svg><label class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Zoom in</p></label>';
 
  function zoom(origin, scale) {
    var oldScale = origin.scale;
    var newScale = Tools.setScale(scale);
    window.scrollTo(
      origin.scrollX + origin.x * (newScale - oldScale),
      origin.scrollY + origin.y * (newScale - oldScale)
    );
  }

  function setOrigin(x, y, evt, isTouchEvent) {
    origin.scrollX = window.scrollX;
    origin.scrollY = window.scrollY;
    origin.x = x;
    origin.y = y;
    //origin.clientY = getClientY(evt, isTouchEvent);
    origin.scale = Tools.getScale();
  }

  function setHashScale() {
    var coords = window.location.hash.slice(1).split(",");
    var x = coords[0] | 0;
    var y = coords[1] | 0;
    var scale = Tools.getScale().toFixed(2);
    var hash = "#" + (x | 0) + "," + (y | 0) + "," + scale;
    window.history.pushState({}, "", hash);
  }

  function press(x, y, evt, isTouchEvent) {
    // if($("#menu").width()>Tools.menu_width+3)return;
    evt.preventDefault();
    setOrigin(x, y, evt, isTouchEvent);
    moved = false;
    pressed = true;
  }

  //Tools.board.addEventListener("wheel", onwheel,{ 'passive': false });

  function release(x, y, evt, isTouchEvent) {
    if (evt) evt.preventDefault();
    if (pressed && !moved) {
      Tools.scaleIndex = Math.min(
        Tools.scaleIndex + 1,
        Tools.scaleDefaults.length - 1
      );
      var scale = Tools.scaleDefaults[Tools.scaleIndex];
      zoom(origin, scale);
      setHashScale();
    }
    pressed = false;
  }

  Tools.zoomComplete = true;

  function keyZoomIn() {
    if (!Tools.zoomComplete) return;
    var scale = Tools.getScale();
    //find middle of page
    var pageX =
      window.scrollX +
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
        2;
    var pageY =
      window.scrollY +
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
        2;
    var x = pageX / scale;
    var y = pageY / scale;
    setOrigin(x, y);
    Tools.scaleIndex = Math.min(
      Tools.scaleIndex + 1,
      Tools.scaleDefaults.length - 1
    );
    scale = Tools.scaleDefaults[Tools.scaleIndex];
    zoom(origin, scale);
    setHashScale();
  }

  Tools.add({
    //The new tool
    icon: "🔎",
    // "iconHTML":"<i style='color: #B10DC9;margin-top:7px' class='fas fa-search-plus'></i>",
    iconHTML: zoomOutSVG,
    name: "Zoom In",
    //"icon": "",
    shortcuts: {
      actions: [{ key: "x", action: keyZoomIn }],
    },
    listeners: {
      press: press,
      release: release,
    },
    mouseCursor: "zoom-in",
    isExtra: false,
  });
})(); //End of code isolation
