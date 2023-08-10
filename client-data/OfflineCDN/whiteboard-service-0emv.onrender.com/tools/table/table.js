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

(function Table() {
  var curText = {
    x: 0,
    y: 0,
    size: 36,
    rawSize: 16,
    oldSize: 0,
    opacity: 1,
    color: "#000",
    id: 0,
    sentText: "",
    lastSending: 0,
  };
  let toggleTable = 1;
  let cell = null;
  let columnIndex = 0;
  var tableSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" class="bi bi-table" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" id="mainIconPathAttribute" fill="#000000"></path> </svg>';

  function draw() {
    Tools.drawingEvent = true;
    switch (data.type) {
      case "new":
        draw;
        createTable(data);
        break;
      case "update":
        var table = document.getElementById(data.id);
        if (table === null) {
          console.error(
            "Text: Hmmm... I received text that belongs to an unknown text field"
          );
          return false;
        } else {
          if (Tools.useLayers) {
            if (table.getAttribute("class") != "layer" + Tools.layer) {
              table.setAttribute("class", "layer-" + Tools.layer);
              Tools.group.appendChild(textField);
            }
          }
        }
        // updateText(table, data.txt);
        break;
      default:
        console.error("Text: Draw instruction with unknown type. ", data);
        break;
    }
  }

  const modal = document.getElementById("table-actions");

  const addInputElement = (row) => {
    const td = document.createElement("td");
    td.style.border = "1px solid #000";
    let input = document.createElement("input");
    input.style.outline = "none";
    input.style.padding = "4px 10px";
    td.appendChild(input);
    row.appendChild(td);
    input.type = "text";
    input.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      cell = e.target;
    });

    return td;
  };


  const createTable = (e,fieldData) => {
    console.log(e);
    Tools.curTool = null;

    const foreignObject = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "foreignObject"
    );
    const getExistingForeignObject = document.getElementsByTagName('foreignObject')
    console.log(getExistingForeignObject, "getExistig")
    for (let k of getExistingForeignObject) {
      if (getExistingForeignObject.length !== 0)
        k.remove()
    }
    foreignObject.setAttribute("overflow", "visible");
    const table = document.createElement("table");
    table.style.position = "absolute";
    foreignObject.style.x =  250;
    foreignObject.style.y =  300;
    foreignObject.style.width = "1px";
    foreignObject.style.height = "1px";

    table.setAttribute("id", "table");
    // Tools.positionElement(table, 100, 100);

    for (let i = 0; i < 2; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 3; j++) {
        addInputElement(tr);
      }
      table.appendChild(tr);
    }
    const editTableButton = document.createElement("button");
    editTableButton.setAttribute('id', "editTableButton")
    editTableButton.innerHTML = '<i class="fa fa-pencil">&#xf040;</i>';
    editTableButton.classList.add('btn-edit-table')
    foreignObject.appendChild(editTableButton);

    // Add an event listener to the edit button
    editTableButton.addEventListener("click", function (e) {
      if (toggleTable) {
        toggleTable = 0
      }
      else {
        toggleTable = 1
      }
      e.preventDefault()
      modal.style.display = toggleTable ? "none" : "block";
      modal.style.top = (e.clientY + 10) + "px";
      modal.style.left = e.clientX + "px";
    });
    editTableButton.addEventListener("touchstart", function (e) {
      const tableTouch= e.touches[0] || e
      if (toggleTable) {
        toggleTable = 0
      }
      else {
        toggleTable = 1
      }
      e.preventDefault()
      modal.style.display = toggleTable ? "none" : "block";
      modal.style.top = (tableTouch.clientY + 10) + "px";
      modal.style.left = tableTouch.clientX + "px";
    });

    const addRow = document.getElementById("add-row");
    addRow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const tableColumns = table.rows[0].getElementsByTagName("td");
      const tr = document.createElement("tr");
      for (let i = 0; i < tableColumns.length; i++) {
        addInputElement(tr);
      }
      table.appendChild(tr);
    });

    const addColumn = document.getElementById("add-column");
    addColumn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const tableRows = table.rows;

      for (let i = 0; i < tableRows.length; i++) {
        const elem = addInputElement(tableRows[i]);
        tableRows[i].appendChild(elem);
      }
    });

    const deleteRow = document.getElementById("delete-row");
    deleteRow.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      cell = e.target;
      //const rowToBeDeleted = cell.parentNode;
      let rowsTR = document.getElementsByTagName('tr')

      if (rowsTR.length - 1 > 0) { table.removeChild(table.lastElementChild); }
    });

    const deleteColumn = document.getElementById("delete-column");
    deleteColumn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      //console.log("harsh")

      const tableEle = document.getElementById("table");
      const rows = tableEle.getElementsByTagName("tr");

      for (var i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        // //columnIndex = cells.length-1
        console.log(cells.length, columnIndex, "column delete");
        if (cells.length - 1 > columnIndex) {
          cells[columnIndex].parentNode.removeChild(cells[columnIndex]);
        }
        //console.log(cells,cells[columnIndex],"parnet node")
        // const lastCellIndex = cells.length - 1;

        // if (lastCellIndex >= 0) {
        //   const lastCell = cells[lastCellIndex];
        //   lastCell.parentNode.removeChild(lastCell);
        // }
      }
    });

    table.style.border = "1px solid #000";
    table.style.borderCollapse = "collapse";

    foreignObject.append(table);

    if (Tools.useLayers) table.setAttribute("class", "layer-" + Tools.layer);
    table.setAttribute(
      "opacity",
      Math.max(0.1, Math.min(1, fieldData?.opacity)) || 1
    );
    if (fieldData?.txt) elem.textContent = fieldData?.txt;
    if (fieldData?.data) {
      elem.setAttribute("data-lock", fieldData?.data);
    }
    if (fieldData?.transform)
      elem.setAttribute("transform", fieldData?.transform);
    Tools.group.appendChild(foreignObject);
    return Table;
  };

  Tools.add({
    name: "Table",
    iconHTML: tableSvg,
    listeners: {},
    // draw: backgroundChange,
    oneTouch: true,
    onstart: createTable, // start the fn while tool is selected
    mouseCursor: "crosshair",
    draw: draw,
  });
})(); //End of code isolation