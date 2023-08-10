(function mathematicalTools() {
  //Code isolation

  // This isn't an HTML5 canvas, it's an old svg hack, (the code is _that_ old!)
  var uploadSVG ='<svg class="tool-icon-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_8039_29056)"><path d="M31.7266 18.6294V2.61241C31.7258 1.99258 31.4792 1.39836 31.0409 0.960075C30.6026 0.521787 30.0084 0.275208 29.3886 0.274414H24.5886C23.9687 0.275208 23.3745 0.521787 22.9362 0.960075C22.4979 1.39836 22.2514 1.99258 22.2506 2.61241V22.4594H13.2236C12.6613 22.4594 12.122 22.6826 11.7241 23.0799C11.3263 23.4772 11.1024 24.0161 11.1016 24.5784V29.6074C11.1024 30.1689 11.3258 30.7072 11.7228 31.1042C12.1198 31.5012 12.6581 31.7246 13.2196 31.7254H29.6096C30.1711 31.7249 30.7095 31.5016 31.1066 31.1045C31.5037 30.7074 31.727 30.169 31.7276 29.6074L31.7266 18.6294ZM23.7506 2.61241C23.7508 2.39024 23.8392 2.17725 23.9963 2.02015C24.1534 1.86305 24.3664 1.77468 24.5886 1.77441H29.3886C29.6107 1.77468 29.8237 1.86305 29.9808 2.02015C30.1379 2.17725 30.2263 2.39024 30.2266 2.61241V4.85641H29.1876C28.9887 4.85641 28.7979 4.93543 28.6572 5.07608C28.5166 5.21674 28.4376 5.4075 28.4376 5.60641C28.4376 5.80533 28.5166 5.99609 28.6572 6.13674C28.7979 6.2774 28.9887 6.35641 29.1876 6.35641H30.2266V9.20041H28.0266C27.8277 9.20041 27.6369 9.27943 27.4962 9.42008C27.3556 9.56074 27.2766 9.7515 27.2766 9.95041C27.2766 10.1493 27.3556 10.3401 27.4962 10.4807C27.6369 10.6214 27.8277 10.7004 28.0266 10.7004H30.2266V13.5404H29.1876C28.9887 13.5404 28.7979 13.6194 28.6572 13.7601C28.5166 13.9007 28.4376 14.0915 28.4376 14.2904C28.4376 14.4893 28.5166 14.6801 28.6572 14.8207C28.7979 14.9614 28.9887 15.0404 29.1876 15.0404H30.2266V17.8804H28.0266C27.8277 17.8804 27.6369 17.9594 27.4962 18.1001C27.3556 18.2407 27.2766 18.4315 27.2766 18.6304C27.2766 18.8293 27.3556 19.0201 27.4962 19.1607C27.6369 19.3014 27.8277 19.3804 28.0266 19.3804H30.2266V22.4624H23.7506V2.61241ZM30.2276 29.6074C30.2276 29.7713 30.1625 29.9285 30.0466 30.0444C29.9307 30.1603 29.7735 30.2254 29.6096 30.2254H27.9276V29.1864C27.9276 28.9875 27.8485 28.7967 27.7079 28.6561C27.5672 28.5154 27.3765 28.4364 27.1776 28.4364C26.9787 28.4364 26.7879 28.5154 26.6472 28.6561C26.5066 28.7967 26.4276 28.9875 26.4276 29.1864V30.2254H24.0866V28.0254C24.0866 27.8265 24.0075 27.6357 23.8669 27.4951C23.7262 27.3544 23.5355 27.2754 23.3366 27.2754C23.1376 27.2754 22.9469 27.3544 22.8062 27.4951C22.6656 27.6357 22.5866 27.8265 22.5866 28.0254V30.2254H20.2466V29.1864C20.2466 28.9875 20.1675 28.7967 20.0269 28.6561C19.8862 28.5154 19.6955 28.4364 19.4966 28.4364C19.2977 28.4364 19.1069 28.5154 18.9662 28.6561C18.8256 28.7967 18.7466 28.9875 18.7466 29.1864V30.2254H16.4066V28.0254C16.4066 27.8265 16.3275 27.6357 16.1869 27.4951C16.0462 27.3544 15.8555 27.2754 15.6566 27.2754C15.4576 27.2754 15.2669 27.3544 15.1262 27.4951C14.9856 27.6357 14.9066 27.8265 14.9066 28.0254V30.2254H13.2236C13.0597 30.2254 12.9025 30.1603 12.7866 30.0444C12.6707 29.9285 12.6056 29.7713 12.6056 29.6074V24.5784C12.6056 24.4144 12.6706 24.2571 12.7865 24.1411C12.9024 24.025 13.0596 23.9597 13.2236 23.9594H30.2236V29.6074H30.2276Z" fill="black"/><path d="M0.357437 26.1287C0.370437 26.1547 0.377437 26.1817 0.392437 26.2057L3.63844 31.2287C3.75645 31.3857 3.9097 31.5127 4.08584 31.5995C4.26198 31.6864 4.45606 31.7306 4.65244 31.7287C4.85773 31.7291 5.06008 31.6798 5.24221 31.5851C5.42435 31.4903 5.58087 31.353 5.69844 31.1847L8.91444 26.2057C8.92771 26.1808 8.9394 26.1551 8.94944 26.1287C8.96144 26.1057 8.97244 26.0827 8.98244 26.0587C9.01512 25.9758 9.03273 25.8878 9.03444 25.7987V4.65368C9.01706 3.50336 8.5479 2.40604 7.72828 1.59872C6.90867 0.791397 5.80439 0.338867 4.65394 0.338867C3.50349 0.338867 2.39921 0.791397 1.57959 1.59872C0.75998 2.40604 0.290818 3.50336 0.273438 4.65368V25.7997C0.275149 25.8888 0.292759 25.9768 0.325437 26.0597C0.334437 26.0827 0.345437 26.1057 0.357437 26.1287ZM4.65744 30.0397L2.39844 26.5487H6.90644L4.65744 30.0397ZM1.77244 4.65368C1.7865 3.89902 2.09616 3.18001 2.63483 2.65129C3.1735 2.12257 3.89814 1.82635 4.65294 1.82635C5.40773 1.82635 6.13238 2.12257 6.67105 2.65129C7.20971 3.18001 7.51938 3.89902 7.53344 4.65368V4.93068H1.77244V4.65368ZM1.77244 6.43068H7.53344V25.0487H1.77244V6.43068Z" fill="black"/></g><defs><clipPath id="clip0_8039_29056"><rect width="32" height="32" fill="white"/></clipPath></defs></svg><label class="label-tool" style="font-size:10px;line-height: 2px;font-weight:400; margin-top: 14px;"><p>Mathematical</p> <p>Tools</p></label>';
    // var xlinkNS = "http://www.w3.org/1999/xlink";

  var toggle = 0;

  const widgetsImage = [
    { id: "ruler", image: "scale.png" ,title:"Ruler"},
    { id: "setSquare", image: "scale2.png" ,title:"Set-Square" },
    { id: "protractor", image: "scale3.png" ,title:"Protactor"},
    { id: "stopwatch", image: "scale4.png", title:"Stop-watch" },
    { id: "clock", image: "clock.png" ,title:"Clock"},
    { id: "roundCompass", image: "scale5.png" , title:"Round-Compass"},
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
    widgetPattern.setAttribute("title", widget.title)
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
    else if (widget.id === "protractor") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        protractorWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        protractorWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    }
    else if (widget.id === "ruler") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        rulerWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        rulerWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    }
    else if (widget.id === "setSquare") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        setSquareWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        setSquareWidget(e.touches[0]);
        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
    } else if (widget.id === "roundCompass") {
      widgetPattern.addEventListener("click", (e) => {
        e.preventDefault();
        roundCompassWidget(e);

        document.getElementById("mathematicalToolsModal").style.display =
          "none";
      });
      widgetPattern.addEventListener("touchstart", (e) => {
        e.preventDefault();
        roundCompassWidget(e.touches[0]);
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
    // oneTouch: true,
    mouseCursor: "auto",
  });
})(); //End of code isolation

//Close the modal of Color Picker
var closeModalBtn = document.getElementById("closeToolModalBtn");

closeModalBtn.addEventListener("click", function () {
  mathematicalToolsModal.style.display = "none";
});
