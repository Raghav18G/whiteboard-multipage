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

;(function Background() {
  let selectedColor = "#fff"
  var toggle = 0
  //Code isolation
  let colorsArray = [
    "#FFF",
    "#000",
    "#FF9B9B",
    "#DDFFBB",
    "#B2A4FF",
    "#606C5D",
    "#F99B7D",
    "#393E46",
    "#BDE6F1",
    "#3F0071",
    "#C400FF",
    "#161D6F",
    "#5E454B",
  ]
  const bgImage = [
    "image.jpeg",
    "images-6.jpeg",
    "images-15.jpeg",
    "images-21.jpeg",
    "image.jpeg",
    "images-6.jpeg",
    "images-15.jpeg",
    "images-21.jpeg",
    "image.jpeg",
    "images-6.jpeg",
    "images-15.jpeg",
    "images-21.jpeg",
  ]
  let modalContent = document.getElementById("colorPickerModalContent")
  let bgContent = document.getElementById("backgorundPattern")

  let data = {
    type: "color",
    toggle: 0,
  }
  //to set the color in backgroud
  function setSelectedColor(color) {
    selectedColor = color
    data.type = "color"
    backgroundChange(data)
  }
  function setBg(bg) {
    selectedColor = `./assets/${bg}`
    data.type = "background"
    backgroundChange(data)
  }
  // creating modal small color boxes to add in backgound tool
  colorsArray.map(color => {
    var div = document.createElement("div")
    div.className = "colorContainer"
    div.style.backgroundColor = color
    div.onclick = function () {
      setSelectedColor(color)
    }
    modalContent?.appendChild(div)
  })
  bgImage.map(bg => {
    var bgPattern = document.createElement("img")
    bgPattern.setAttribute("src", `./assets/${bg}`)
    bgPattern.className = "patternContainer"
    bgPattern.onclick = function () {
      setBg(bg)
    }
    bgContent?.appendChild(bgPattern)
  })

  var bgChangeSVG =
    '<svg class="tool-icon-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image-fill" viewBox="0 0 16 16"><path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/></svg><label id="tool-transform-localization" class="label-tool" style="font-size:10px;font-weight:400;line-height: 2px; margin-top: 14px;"><p>Background</p></label>'

  function toggleColorPicker(evt) {
    // if($("#menu").width()>Tools.menu_width+3)return;

    colorPickerModal.style.display = "block"

    // if (evt) evt.preventDefault()
    if (toggle) {
      toggle = 0
      colorPickerModal.style.display = "none"
    } else {
      toggle = 1
    }
    data.toggle = toggle
    // msg.id = Tools.generateUID("g") //g for grid
    // msg.toggle = toggle
    backgroundChange(data)
  }

  function backgroundChange(data) {
    var pattern = Tools.svg.getElementById("rect_1")
    switch (data.type) {
      case "color":
        var elem = Tools.svg.getElementById("rect_1")
        pattern.setAttribute("width","100%") // reset the rect size to 100% as previous
        pattern.setAttribute("height","100%")
        elem.setAttribute("fill", selectedColor)
        break
      case "background":
        var getImage = document.getElementById("setImagePattern")
        const getVisibleArea = getVisibleViewport();
        getImage.setAttribute("href", selectedColor)
        pattern.setAttribute("width",getVisibleArea.width) // fit the image on the available view port
        pattern.setAttribute("height",getVisibleArea.height)
        pattern.setAttribute("fill", "url(#imagePattern)")
        break

      default:
        console.error("Clear: 'clear' instruction with unknown type. ", data)
        break
    }
  }

  var svg = Tools.svg

  Tools.add({
    //The new tool
    name: "Background",
    // "icon": "🗑",
    // "iconHTML":"<i style='color:gray;margin-top:7px'  class='fas fa-th'></i>",
    iconHTML: bgChangeSVG,
    shortcuts: {
      actions: [{ key: "12", action: toggleColorPicker }],
    },
    listeners: {},
    draw: backgroundChange,
   // oneTouch: true,
    onstart: toggleColorPicker, // start the fn while tool is selected
    mouseCursor: "crosshair",
  })
})() //End of code isolation

//Close the modal of Color Picker
var closeModalBtn = document.getElementById("closeModalBtn")

closeModalBtn.addEventListener("click", function () {
  colorPickerModal.style.display = "none"
})

//to manage change in tabs components click
function openTab(event, tabId) {
  // Get all tab content elements
  var tabContents = document.getElementsByClassName("color-tab-content")
  // Hide all tab content elements
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("show")
  }

  // Show the selected tab content
  document.getElementById(tabId).classList.add("show")

  // Get all tab elements
  var tabs = document.getElementsByClassName("color-tab")

  // Remove the "active" class from all tabs
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active")
  }

  // Add the "active" class to the clicked tab
  event.currentTarget.classList.add("active")
}
