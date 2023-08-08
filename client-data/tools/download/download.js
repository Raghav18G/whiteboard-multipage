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
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512"><g><g> <path d="M 470 319 C 461 319 461 328 461 339 V 471 H 50 V 339 C 50 329 50 319 41 319 C 32 319 32 329 32 339 V 481 C 32 491 37 491 47 491 H 464 C 474 491 479 491 479 481 V 339 C 479 327 479 319 470 319 Z"/> <path d="M 247 317 C 255 321 257 321 265 317 L 380 214 C 384 210 383 203 381 200 C 378 198 370 196 366 200 L 266 295 V 19 C 266 13 260 9 256 9 C 252 9 246 13 246 19 V 295 L 146 200 C 142 196 135 197 132 199 C 130 202 128 210 132 214 L 247 317 Z"/></g></g></svg>';

  function downloadOption() {
    console.log("DOWNLOADING");
    document.getElementById("downloadModal").style.display = "block";
    document
      .getElementById("downloadModalClose")
      .addEventListener("click", () => {
        document.getElementById("downloadModal").style.display = "none";
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
