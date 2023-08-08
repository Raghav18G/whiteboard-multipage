// Clock Widget
let clockInterval;

const ClockWidget = (e) => {
  clearInterval(clockInterval);
  const foreignObjectClock = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );
  const clockWidget = document.createElement("div");
  var uid = Tools.generateUID("doc");

  const clockHTML = `
      <svg
        id="clock"
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="200"
        viewBox="0 0 600 600"
      >
        <g id="face">
          <circle class="circle" cx="300" cy="300" r="253.9" />
          <path
            class="hour-marks"
            d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6"
          />
          <circle class="mid-circle" cx="300" cy="300" r="16.2" />
        </g>
        <g id="hour">
          <path class="hour-arm" d="M300.5 298V142" />
          <circle class="sizing-box" cx="300" cy="300" r="253.9" />
        </g>
        <g id="minute">
          <path class="minute-arm" d="M300.5 298V67" />
          <circle class="sizing-box" cx="300" cy="300" r="253.9" />
        </g>
        <g id="second">
          <path class="second-arm" d="M300.5 350V55" />
          <circle class="sizing-box" cx="300" cy="300" r="253.9" />
        </g>
      </svg>`;

  clockWidget.innerHTML = clockHTML;

  clockWidget.style.maxWidth = "100%";
  clockWidget.style.position = "absolute";
  foreignObjectClock.style.x = 200;
  foreignObjectClock.style.y = 200;
  foreignObjectClock.style.width = "1px";
  foreignObjectClock.style.height = "1px";
  foreignObjectClock.setAttribute("id", uid);
  foreignObjectClock.setAttribute("overflow", "visible");

  foreignObjectClock.appendChild(clockWidget);
  Tools.group.appendChild(foreignObjectClock);

  const HOURHAND = document.querySelector("#hour");
  const MINUTEHAND = document.querySelector("#minute");
  const SECONDHAND = document.querySelector("#second");

  console.log("HOUR HAND", HOURHAND, "MINU", MINUTEHAND);

  // Declare and Initialize the inbuilt date function
  const date = new Date();

  //
  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  // Log to see the output in the console
  console.log("Hour: " + hr + " Minute: " + min + " Second: " + sec);

  let hrPosition = (hr * 360) / 12 + (min * (360 / 60)) / 12;
  let minPosition = (min * 360) / 60 + (sec * (360 / 60)) / 60;
  let secPosition = (sec * 360) / 60;

  // Create a function that actually run the clock
  const runClock = () => {
    // Set each position when the function is called
    hrPosition = hrPosition + 3 / 360;
    minPosition = minPosition + 6 / 60;
    secPosition = secPosition + 6;

    // Set the transformation for each arm
    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
  };

  // Use the inbuilt setInterval function to invoke the method we created earlier
  clockInterval = setInterval(runClock, 1000);
  //  if (msg.transform) clockWidget.setAttribute("transform", msg.transform);

  if (Tools.useLayers)
    clockWidget.setAttribute("class", "layer-" + Tools.layer);
};

const stopWatchWidget = (e) => {
  const stopWatchforeignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );

  const stopwatchWidgetElement = document.createElement("div");
  stopwatchWidgetElement.id = "stopwatchWidget";
  var uid = Tools.generateUID("doc");

  const stopwatchWidgetHTML = `
  <div id="display">00:00:00</div>
  <div id="controls">
    <button id="startButton">Start</button>
    <button id="stopButton">Stop</button>
    <button id="resetButton">Reset</button>
  </div>`;

  stopwatchWidgetElement.innerHTML = stopwatchWidgetHTML;

  stopWatchforeignObject.style.x = 200;
  stopWatchforeignObject.style.y = 200;
  stopWatchforeignObject.style.width = "1px";
  stopWatchforeignObject.style.height = "1px";
  stopWatchforeignObject.setAttribute("id", uid);
  stopWatchforeignObject.setAttribute("overflow", "visible");

  stopWatchforeignObject.appendChild(stopwatchWidgetElement);

  Tools.group.appendChild(stopWatchforeignObject);

  let startTime = null;
  let elapsedTime = 0;
  let timerId = null;
  let isRunning = false;

  let displayElement = document.getElementById("display");

  let startButton = document.getElementById("startButton");
  let stopButton = document.getElementById("stopButton");
  let resetButton = document.getElementById("resetButton");

  function start() {
    if (!isRunning) {
      startTime = Date.now() - elapsedTime;
      timerId = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
      }, 10);
      isRunning = true;
    }
  }

  function stop() {
    if (isRunning) {
      clearInterval(timerId);
      isRunning = false;
    }
  }

  function reset() {
    elapsedTime = 0;
    updateDisplay();
  }

  function updateDisplay() {
    const minutes = Math.floor(elapsedTime / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((elapsedTime % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((elapsedTime % 1000) / 10)
      .toString()
      .padStart(2, "0");

    const timeString = `${minutes}:${seconds}:${milliseconds}`;
    displayElement.textContent = timeString;
  }

  startButton.addEventListener("click", () => start());
  stopButton.addEventListener("click", () => stop());
  resetButton.addEventListener("click", () => reset());
};

const diceWidget = (e) => {
  const diceforeignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );

  const dicewidgetElement = document.createElement("div");
  dicewidgetElement.id = "diceWidget";
  var uid = Tools.generateUID("doc");

  const dicewidgetHTML = ` 
  <svg id="dice" viewBox="0 0 100 100">
  <rect class="dice" x="10" y="10" width="80" height="80" rx="10" />
  <g id="dots-container">
    <circle class="dot" cx="30" cy="30" r="6" />
    <circle class="dot" cx="50" cy="30" r="6" />
    <circle class="dot" cx="70" cy="30" r="6" />
    <circle class="dot" cx="30" cy="50" r="6" />
    <circle class="dot" cx="50" cy="50" r="6" />
    <circle class="dot" cx="70" cy="50" r="6" />
    <circle class="dot" cx="30" cy="70" r="6" />
    <circle class="dot" cx="50" cy="70" r="6" />
    <circle class="dot" cx="70" cy="70" r="6" />
  </g>
</svg>

<button id="rollButton">Roll Dice</button>
 `;

  dicewidgetElement.innerHTML = dicewidgetHTML;

  diceforeignObject.style.x = 200;
  diceforeignObject.style.y = 200;
  diceforeignObject.style.width = "1px";
  diceforeignObject.style.height = "1px";
  diceforeignObject.setAttribute("id", uid);
  diceforeignObject.setAttribute("overflow", "visible");

  diceforeignObject.appendChild(dicewidgetElement);

  Tools.group.appendChild(diceforeignObject);

  const dice = document.getElementById("dice");
  const dotsContainer = document.getElementById("dots-container");
  const rollButton = document.getElementById("rollButton");

  rollButton.addEventListener("click", rollDice);

  function rollDice() {
    const dots = document.getElementsByClassName("dot");
    dotsContainer.style.display = "block";

    // Hide all dots initially
    for (let i = 0; i < dots.length; i++) {
      dots[i].style.display = "none";
    }

    // Show random number of dots (1 to 6)
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < randomNumber; i++) {
      dots[i].style.display = "block";
    }
  }
};

const CompassWidget = (e) => {
  e.preventDefault();
  const foreignObjectCompass = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject"
  );
  let compassWidget = document.createElement("div");
  const uid = Tools.generateUID("doc");

  const compassHTML = `<div class="main">
  <svg id="compassWidget" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
  <line id="arrow" x1="45" y1="150" x2="200" y2="150" stroke="red" stroke-width="2" stroke-height="6" />
  <g id="angle-markings" font-size="14">
     <text x="330" y="200" text-anchor="middle">0°</text>
     <!-- Dynamic generation of angle markings and their differences of 10 degrees -->
  </g>
  </svg>
</div>
`;

  compassWidget.innerHTML = compassHTML;
  compassWidget.style.maxWidth = "100%";
  compassWidget.style.position = "absolute";
  foreignObjectCompass.style.x = 200;
  foreignObjectCompass.style.y = 200;
  foreignObjectCompass.style.width = "1px";
  foreignObjectCompass.style.height = "1px";
  foreignObjectCompass.setAttribute("id", uid);
  foreignObjectCompass.setAttribute("overflow", "visible");

  foreignObjectCompass.appendChild(compassWidget);
  Tools.group.appendChild(foreignObjectCompass);
  var svgNS = "http://www.w3.org/2000/svg";
  var svg = document.getElementById("compassWidget");

  var pointer = document.createElementNS(svgNS, "polygon");
  pointer.setAttributeNS(null, "points", "150,0 155,12 145,12");
  pointer.setAttributeNS(null, "fill", "red");
  svg.appendChild(pointer);

  var c = document.createElementNS(svgNS, "circle");
  c.setAttributeNS(null, "cx", 150);
  c.setAttributeNS(null, "cy", 150);
  c.setAttributeNS(null, "r", 20);
  c.setAttributeNS(null, "fill", "black");
  c.setAttributeNS(null, "fill-opacity", 0.1);
  svg.appendChild(c);

  drawCenterLine(150, 100, 150, 200);
  drawCenterLine(100, 150, 200, 150);
  drawCardinalDirection(143, 72, "N");
  drawCardinalDirection(228, 158, "E");
  drawCardinalDirection(143, 242, "S");
  drawCardinalDirection(58, 158, "W");

  for (var i = 0; i < 360; i += 2) {
    // draw degree lines
    var s = "grey";
    if (i == 0 || i % 30 == 0) {
      w = 3;
      s = "white";
      y2 = 50;
    } else {
      w = 1;
      y2 = 45;
    }

    var l1 = document.createElementNS(svgNS, "line");
    l1.setAttributeNS(null, "x1", 150);
    l1.setAttributeNS(null, "y1", 30);
    l1.setAttributeNS(null, "x2", 150);
    l1.setAttributeNS(null, "y2", y2);
    l1.setAttributeNS(null, "stroke", s);
    l1.setAttributeNS(null, "stroke-width", w);
    l1.setAttributeNS(null, "transform", "rotate(" + i + ", 150, 150)");
    svg.appendChild(l1);

    // draw degree value every 30 degrees
    if (i % 30 == 0) {
      var t1 = document.createElementNS(svgNS, "text");
      if (i > 100) {
        t1.setAttributeNS(null, "x", 140);
      } else if (i > 0) {
        t1.setAttributeNS(null, "x", 144);
      } else {
        t1.setAttributeNS(null, "x", 147);
      }
      t1.setAttributeNS(null, "y", 24);
      t1.setAttributeNS(null, "font-size", "11px");
      t1.setAttributeNS(null, "font-family", "Helvetica");
      t1.setAttributeNS(null, "fill", "grey");
      t1.setAttributeNS(null, "style", "letter-spacing:1.0");
      t1.setAttributeNS(null, "transform", "rotate(" + i + ", 150, 150)");
      var textNode = document.createTextNode(i);
      t1.appendChild(textNode);
      svg.appendChild(t1);
    }
  }

  function drawCenterLine(x1, y1, x2, y2) {
    var centreLineHorizontal = document.createElementNS(svgNS, "line");
    centreLineHorizontal.setAttributeNS(null, "x1", x1);
    centreLineHorizontal.setAttributeNS(null, "y1", y1);
    centreLineHorizontal.setAttributeNS(null, "x2", x2);
    centreLineHorizontal.setAttributeNS(null, "y2", y2);
    centreLineHorizontal.setAttributeNS(null, "stroke", "grey");
    centreLineHorizontal.setAttributeNS(null, "stroke-width", 1);
    centreLineHorizontal.setAttributeNS(null, "stroke-opacity", 0.5);
    svg.appendChild(centreLineHorizontal);
  }

  function drawCardinalDirection(x, y, displayText) {
    var direction = document.createElementNS(svgNS, "text");
    direction.setAttributeNS(null, "x", x);
    direction.setAttributeNS(null, "y", y);
    direction.setAttributeNS(null, "font-size", "20px");
    direction.setAttributeNS(null, "font-family", "Helvetica");
    direction.setAttributeNS(null, "fill", "black");
    var textNode = document.createTextNode(displayText);
    direction.appendChild(textNode);
    svg.appendChild(direction);
  }

  // Start the auto-rotation

  const compass = document.getElementById("compassWidget");
  const arrow = document.getElementById("arrow");

  let rotationAngle = 0;
  let rotateSpeed = 1; // Adjust this value to control the rotation speed

  // function rotateArrow() {
  //   rotationAngle += rotateSpeed;
  //   arrow.setAttribute('transform', `rotate(${rotationAngle} 200 200)`);
  //   requestAnimationFrame(rotateArrow);
  // }

  // Start the auto-rotation
  const center = { x: 150, y: 150 };

  //const center = { x: 200, y: 200 };
  arrow.setAttribute("x1", center.x);
  arrow.setAttribute("y1", center.y);
  arrow.setAttribute("x2", center.x);
  arrow.setAttribute("y2", center.y - 100);

  // Start the auto-rotation
  function updateRotation(event) {
    const mouseX = event.clientX - compass.getBoundingClientRect().left;
    const mouseY = event.clientY - compass.getBoundingClientRect().top;
    const deltaX = mouseX - center.x;
    const deltaY = mouseY - center.y;
    rotationAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    arrow.setAttribute(
      "transform",
      `rotate(${rotationAngle} ${center.x} ${center.y})`
    );
  }

  compass.addEventListener("mousemove", updateRotation);

  rotateArrow();

}

const MagnifyingGlass = () => {
  function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    /*create magnifier glass:*/
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
    glass.setAttribute('id', 'magnifying-glass')
    /*insert magnifier glass:*/
    img.parentElement.insertBefore(glass, img);

    const maginifyingBtn = document.createElement('button')
    maginifyingBtn.setAttribute('id', 'btn-magnifying')
    maginifyingBtn.classList.add('maginifying-btn')
    maginifyingBtn.innerHTML = '<img src="./assets/CloseCircle.svg">';
    glass.appendChild(maginifyingBtn);
    //clear the Magnigfying class

    maginifyingBtn.addEventListener('click', () => {
      const MagnifyingGlass = document.getElementsByClassName('img-magnifier-glass')
      console.log(MagnifyingGlass, "maggg");
      MagnifyingGlass.length >= 1 ? document.getElementById('board')?.removeChild(MagnifyingGlass[0]) : ""
    })


    function addMouoseMove() {
      console.log("mouse down")
      html2canvas(img, {
        x: window.scrollX,
        y: window.scrollY,
        width: window.innerWidth,
        height: window.innerHeight,
      }).then(function (res) {
        var canvasURL = res.toDataURL("image/jpg");
        glass.style.backgroundImage = "url('" + canvasURL + "')";
      })

      /*set background properties for the magnifier glass:*/
      glass.style.backgroundRepeat = "no-repeat";
      glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;
      /*execute a function when someone moves the magnifier glass over the image:*/
      glass.addEventListener("mousemove", moveMagnifier);
      img.addEventListener("mousemove", moveMagnifier);
      /*and also for touch screens:*/
      glass.addEventListener("touchmove", moveMagnifier);
      img.addEventListener("touchmove", moveMagnifier);
      function moveMagnifier(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /*set the position of the magnifier glass:*/
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /*display what the magnifier glass "sees":*/
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
        glass.style.backgroundSize = `${(img.width.baseVal.value - 1000) / 16}rem ${(img.height.baseVal.value - 1200) / 16}rem`
      }
      function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }

      function stopDragging() {
        glass.removeEventListener("mousemove", moveMagnifier);
        img.removeEventListener("mousemove", moveMagnifier);
      }
      glass.addEventListener("mouseup", stopDragging);

    }

    glass.addEventListener('mousedown', addMouoseMove)
  }

  magnify("canvas", 2);
};
