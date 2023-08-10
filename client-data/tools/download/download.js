/**
 *                        WHITEBOPHIR
 *********************************************************
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2020  Ophir LOJKINE
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

(function download() {
  //Code isolation
  var downloadSvg =
  '<svg class="tool-icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><label class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Download</p></label>';
 
  function hideDownloadModal() {
    document.getElementById("downloadModal").style.display = "none";
  }
  
  // close the modal when click outside of it
  const modal = document.getElementById("downloadModal");
  function closeModal() {
      modal.style.display = "none";
  }
  window.addEventListener("click", function(event) {
      if (event.target === modal) {
          closeModal();
      }
  });
  
  function downloadOption() {
    console.log("DOWNLOADING");
    document.getElementById("downloadModal").style.display = "block";
    document
      .getElementById("downloadModalClose")
      .addEventListener("click", () => {
        document.getElementById("downloadModal").style.display = "none";
      });

    // Add a mousedown event listener to the document
    document.addEventListener("mousedown", function (event) {
      var downloadModal = document.getElementById("downloadModal");
      if (
        event.target !== downloadModal &&
        !downloadModal.contains(event.target)
      ) {
        // Clicked outside the download modal, hide it
        hideDownloadModal();
      }
    });

    // Get all the <h4> elements inside the download modal
    const downloadItems = document.querySelectorAll(
      ".downloadModal-content h4"
    );

    // Add a click event listener to each <h4> element
    downloadItems.forEach((h4Element) => {
      h4Element.addEventListener("click", function () {
        // Remove the 'selected' class from all <h4> elements
        downloadItems.forEach((item) => item.classList.remove("selected"));

        // Add the 'selected' class to the clicked <h4> element
        h4Element.classList.add("selected");
      });
    });

    document
      .getElementById("downloadAsSVG")
      .addEventListener("click", downloadSVGFile);
    document
      .getElementById("downloadAsPDF")
      .addEventListener("click", downloadAsPDF);
    document
      .getElementById("downloadAsPNG")
      .addEventListener("click", downloadAsPNG);
    document
      .getElementById("downloadAsJPG")
      .addEventListener("click", downloadAsJPG);
  }

  //   Downloading As PDF
  function downloadAsPDF() {
    document.getElementById("downloadModal").style.display = "none";
    document
      .getElementById("downloadAsPDF")
      .removeEventListener("click", () => {
        console.log("Removed Event Listener");
      });

    let canvas = document.getElementById("canvas");

    const { jsPDF } = window.jspdf;
    html2canvas(canvas, {
      x: window.scrollX,
      y: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight,
    }).then(function (res) {
      const doc = new jsPDF();
      var imgData = res.toDataURL("image/jpeg", 1.0);

      doc.addImage(imgData, "JPEG", 10, 30, 180, 160);
      doc.save("download.pdf");
    });
  }

  //   Downloading As PNG
  function downloadAsPNG() {
    let canvas = document.getElementById("canvas");
    html2canvas(canvas, {
      x: window.scrollX,
      y: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight,
    }).then(function (res) {
      var canvasURL = res.toDataURL("image/png");
      /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
      canvasURL = canvasURL.replace(
        /^data:image\/[^;]*/,
        "data:application/octet-stream"
      );

      /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
      canvasURL = canvasURL.replace(
        /^data:application\/octet-stream/,
        `data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20`
      );
      let filename = `${Tools.boardName}.png`;
      downloadwithSpecificExtension(canvasURL, filename);
    });
  }

  //   Downloading As JPEG
  function downloadAsJPG() {
    let canvas = document.getElementById("canvas");
    html2canvas(canvas, {
      x: window.scrollX,
      y: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight,
    }).then(function (res) {
      var canvasURL = res.toDataURL("image/jpg");
      /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
      canvasURL = canvasURL.replace(
        /^data:image\/[^;]*/,
        "data:application/octet-stream"
      );

      /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
      canvasURL = canvasURL.replace(
        /^data:application\/octet-stream/,
        `data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20`
      );
      let filename = `${Tools.boardName}.jpg`;
      downloadwithSpecificExtension(canvasURL, filename);
    });
  }

  function downloadSVGFile() {
    var canvasCopy = Tools.svg.cloneNode(true);
    console.log("CANVAS COPY", canvasCopy);
    canvasCopy.removeAttribute("style", ""); // Remove css transform
    var styleNode = document.createElement("style");

    // Copy the stylesheets from the whiteboard to the exported SVG
    styleNode.innerHTML = Array.from(document.styleSheets)
      .filter(function (stylesheet) {
        if (
          stylesheet.href &&
          (stylesheet.href.match(/boards\/tools\/.*\.css/) ||
            stylesheet.href.match(/board\.css/))
        ) {
          // This is a Stylesheet from a Tool or the Board itself, so we should include it
          return true;
        }
        // Not a stylesheet of the tool, so we can ignore it for export
        return false;
      })
      .map(function (stylesheet) {
        return Array.from(stylesheet.cssRules).map(function (rule) {
          return rule.cssText;
        });
      })
      .join("\n");

    canvasCopy.appendChild(styleNode);
    var outerHTML =
      canvasCopy.outerHTML || new XMLSerializer().serializeToString(canvasCopy);

    var blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
    document
      .getElementById("downloadAsSVG")
      .removeEventListener("click", () => {
        console.log("Removed Event Listener");
      });
    downloadContent(blob, Tools.boardName + ".svg");
  }

  function downloadContent(blob, filename) {
    if (window.navigator.msSaveBlob) {
      // Internet Explorer
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const url = URL.createObjectURL(blob);
      var element = document.createElement("a");
      element.setAttribute("href", url);
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      document.getElementById("downloadModal").style.display = "none";
      window.URL.revokeObjectURL(url);
    }
  }

  function downloadwithSpecificExtension(URL, filename) {
    var element = document.createElement("a");
    element.setAttribute("href", URL);
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    document.getElementById("downloadModal").style.display = "none";
  }

  Tools.add({
    //The new tool
    name: "Download",
    shortcut: { actions: [{ key: "ctrl-D", action: downloadOption }] },
    listeners: {},
    iconHTML: downloadSvg,
    oneTouch: true,
    onstart: downloadOption,
    mouseCursor: "crosshair",
  });
})(); //End of code isolation
