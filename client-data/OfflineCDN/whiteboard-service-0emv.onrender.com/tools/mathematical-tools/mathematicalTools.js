(function mathematicalTools() {
  //Code isolation

  // This isn't an HTML5 canvas, it's an old svg hack, (the code is _that_ old!)
  var uploadSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-projector" viewBox="0 0 16 16"><path d="M14 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM2.5 6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4Zm0 2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4Z"/><path d="M0 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1H5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1 2 2 0 0 1-2-2V6Zm2-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2Z"/></svg>';
  // var xlinkNS = "http://www.w3.org/1999/xlink";

  var toggle = 0;

  const widgetsImage = [
    { id: "scale", image: "scale.png" ,title:"Ruler"},
    { id: "Lprojector", image: "scale2.png" ,title:"Triangular Ruler" },
    { id: "D", image: "scale3.png" ,title:"Protactor"},
    { id: "stopwatch", image: "scale4.png", title:"Stop-watch" },
    { id: "clock", image: "clock.png" ,title:"Clock"},
    { id: "projector", image: "scale5.png" , title:"Projector"},
    { id: "compass", image: "scale6.png" ,title:"Compass"},
    { id: "calculator", image: "scale7.png", title:"Calculator" },
    { id: "magnifier", image: "scale8.png",title:"Magnifier" },
    { id: "dice", image: "scale9.png" ,title:"Dice" },
  ];

  let modalContent = document.getElementById("tab1--mathematiclTool");

  widgetsImage.map((widget) => {
    let widgetPattern = document.createElement("img");
    widgetPattern.setAttribute("src", `./assets/${widget.image}`);
    widgetPattern.className = "widgetContainer";
    if (widget.id === "clock") {
      widgetPattern.addEventListener("click", (e) => {
        ClockWidget(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        ClockWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "compass") {
      widgetPattern.addEventListener("click", (e) => {
        CompassWidget(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        CompassWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "magnifier") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        MagnifyingGlass(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        MagnifyingGlass(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "stopwatch") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        stopWatchWidget(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        stopWatchWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "dice") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        diceWidget(e);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        diceWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "calculator") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        calculatorWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        calculatorWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    }
    modalContent?.appendChild(widgetPattern);
  });

  function onstart(evt) {
    console.log(" tool clicked");
    mathematicalToolsModal.style.display = "block";
    if (evt) evt.preventDefault();
    if (toggle) {
      toggle = 0;
      mathematicalToolsModal.style.display = "none";
    } else {
      toggle = 1;
    }
  }

  Tools.add({
    name: "Mathematical Tools",
    // "icon": "🖼️",
    iconHTML: uploadSVG,
    shortcuts: {
      actions: [{ key: "12", action: onstart }],
    },
    listeners: {},
    //draw: draw,
    onstart: onstart,
    oneTouch: true,
    mouseCursor: "crosshair",
  });
})(); //End of code isolation

//Close the modal of Color Picker
var closeModalBtn = document.getElementById("closeToolModalBtn");

closeModalBtn.addEventListener("click", function () {
  mathematicalToolsModal.style.display = "none";
});
