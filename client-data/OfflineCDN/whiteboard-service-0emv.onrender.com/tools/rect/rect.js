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
  //Indicates the id of the shape the user is currently drawing or an empty string while the user is not drawing
  var ellipse =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"><g><path id="submenu-rect-path" fill="';
  var shapeSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M11.91,7A6.64,6.64,0,0,0,12,6a6,6,0,1,0-6,6,6.64,6.64,0,0,0,1-.09V17H17V7ZM6,11a5,5,0,1,1,5-5,5.47,5.47,0,0,1-.1,1H7v3.9A5.47,5.47,0,0,1,6,11Zm4.58-3A5.07,5.07,0,0,1,8,10.58V8ZM16,16H8V11.65A6,6,0,0,0,11.65,8H16Z"/></g></g></svg>';
  var ellipse2 =
    '" d="M435.204,126.967C387.398,94.1,324.11,76,257,76c-67.206,0-130.824,18.084-179.138,50.922C27.652,161.048,0,206.889,0,256c0,49.111,27.652,94.952,77.862,129.078C126.176,417.916,189.794,436,257,436c67.11,0,130.398-18.1,178.204-50.967C484.727,350.986,512,305.161,512,256S484.727,161.014,435.204,126.967z M418.208,360.312C375.354,389.774,318.103,406,257,406 c-61.254,0-118.884-16.242-162.273-45.733C52.986,331.898,30,294.868,30,256s22.986-75.898,64.727-104.267C138.116,122.242,195.746,106,257,106c61.103,0,118.354,16.226,161.208,45.688C459.345,179.97,482,217.015,482,256S459.345,332.03,418.208,360.312z"/></g></svg>';
  var cubeImg = "";
  var icons = {
    Rectangle: {
      icon: "▭",
      isHTML: false,
      isSVG: false,
    },
    Circle: {
      icon: "◯",
      isHTML: false,
      isSVG: false,
    },
    Triangle: {
      icon: "◺",
      isHTML: false,
      isSVG: false,
    },
    EquiTriangle: {
      icon: "△",
      isHTML: false,
      isSVG: false,
    },
    Parallelogram: {
      icon: "▱",
      isHTML: false,
      isSVG: false,
    },
    Rombus: {
      icon: "◇",
      isHTML: false,
      isSVG: false,
    },
    Trapezoid: {
      icon: "⏢",
      isHTML: false,
      isSVG: false,
    },
    Pentagon: {
      icon: "⬠",
      isHTML: false,
      isSVG: false,
    },
    Hexagon: {
      icon: "⎔",
      isHTML: false,
      isSVG: false,
    },
    Cube: {
      icon: "❒",
      isHTML: false,
      isSVG: false,
    },
    Cone: {
      icon: ` <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 511.915 511.915" xml:space="preserve"><g><path d="M426.624,469.269c0-0.043-0.021-0.064-0.021-0.107c0-0.597-0.235-1.131-0.32-1.707c-0.107-0.576-0.043-1.152-0.235-1.707    l-0.192-0.555c-0.043-0.128-0.085-0.235-0.128-0.363l-0.448-1.301c-0.256-0.683-0.363-1.387-0.704-2.048L266.069,7.061    c-0.085-0.235-0.256-0.384-0.341-0.597c-0.256-0.64-0.661-1.173-1.045-1.749c-0.384-0.576-0.747-1.173-1.237-1.664    c-0.448-0.448-1.003-0.789-1.536-1.152c-0.619-0.427-1.195-0.832-1.877-1.109c-0.192-0.085-0.341-0.256-0.555-0.32    c-0.469-0.171-0.96-0.107-1.451-0.192C257.365,0.149,256.747,0,256.064,0c-0.832,0-1.621,0.149-2.411,0.341    c-0.384,0.085-0.768,0.021-1.152,0.171c-0.171,0.064-0.277,0.192-0.448,0.256c-0.789,0.32-1.472,0.789-2.176,1.28    c-0.448,0.32-0.917,0.597-1.301,0.981c-0.533,0.533-0.939,1.152-1.344,1.813c-0.363,0.533-0.725,1.045-0.96,1.621    c-0.085,0.213-0.277,0.363-0.341,0.597L87.339,461.504c-0.341,0.64-0.448,1.323-0.683,1.984l-0.789,2.24    c-0.235,0.661-0.171,1.323-0.277,2.005c-0.064,0.512-0.299,0.96-0.299,1.515c0,0.107,0.064,0.213,0.064,0.32    c0.021,0.661,0.213,1.28,0.363,1.92c0.171,0.896,0.341,1.771,0.725,2.603c11.669,36.629,152.768,37.824,169.515,37.824    c16.768,0,158.101-1.195,169.557-37.909c0.064-0.128,0.107-0.277,0.171-0.427c0.192-0.427,0.213-0.896,0.363-1.344    c0.256-0.896,0.512-1.771,0.555-2.709c0-0.043,0.021-0.085,0.021-0.128C426.603,469.333,426.624,469.312,426.624,469.269z     M255.957,42.944l139.435,399.701c-45.739-15.381-126.976-16.064-139.413-16.064c-12.437,0-93.696,0.683-139.435,16.064    L255.957,42.944z M255.957,490.56c-91.285,0.021-141.269-14.272-148.437-20.715c8.384-8,58.176-21.952,148.437-21.952    c91.285,0,141.269,14.272,148.437,20.715C396.011,476.608,346.219,490.56,255.957,490.56z"/></g></svg>`,
      isHTML: true,
      isSVG: false,
    },
    Cylinder: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="8px" width="8px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M425.621,38.187C414.763,1.216,272.789,0,256,0S97.237,1.216,86.379,38.187c-0.64,1.387-1.045,2.859-1.045,4.48v426.667    c0,1.707,0.469,3.328,1.152,4.843C98.155,510.805,239.275,512,256,512c16.789,0,158.763-1.216,169.621-38.187    c0.64-1.387,1.045-2.859,1.045-4.48V42.667C426.667,41.045,426.261,39.573,425.621,38.187z M256,21.333    c87.723,0,137.685,13.248,148.075,21.333C393.685,50.752,343.723,64,256,64S118.315,50.752,107.925,42.667    C118.315,34.581,168.277,21.333,256,21.333z M256,490.667c-91.285,0-141.269-14.272-148.437-20.715    C115.947,461.952,165.739,448,256,448c91.285,0,141.269,14.272,148.437,20.715C396.053,476.715,346.24,490.667,256,490.667z     M405.333,446.571C362.688,427.456,269.397,426.667,256,426.667s-106.688,0.789-149.333,19.904V65.429 C149.312,84.544,242.603,85.333,256,85.333s106.688-0.789,149.333-19.904V446.571z"/></g></g></svg>`,
      isHTML: true,
      isSVG: false,
    },
    Sphere: {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M319.125,215.147    c111.381,6.357,171.541,28.523,171.541,40.853s-60.16,34.496-171.541,40.853C319.701,282.197,320,268.288,320,256    S319.701,229.803,319.125,215.147z M488.704,227.093c-36.011-19.883-107.755-29.504-170.624-33.173    c-3.669-62.848-13.291-134.592-33.173-170.624C391.189,36.437,475.563,120.811,488.704,227.093z M298.667,256    c0,14.656-0.341,28.48-0.832,41.835c-13.355,0.491-27.179,0.832-41.835,0.832s-28.48-0.341-41.835-0.832    c-0.491-13.355-0.832-27.179-0.832-41.835s0.341-28.48,0.832-41.835c13.355-0.491,27.179-0.832,41.835-0.832    s28.48,0.341,41.835,0.832C298.325,227.52,298.667,241.344,298.667,256z M256,21.333c12.331,0,34.496,60.16,40.853,171.541    C282.197,192.299,268.288,192,256,192s-26.197,0.299-40.853,0.875C221.504,81.493,243.669,21.333,256,21.333z M227.093,23.296    c-19.883,36.032-29.504,107.776-33.173,170.624c-62.848,3.669-134.592,13.291-170.624,33.173    C36.437,120.811,120.811,36.437,227.093,23.296z M192.875,215.147C192.299,229.803,192,243.712,192,256s0.299,26.197,0.875,40.853    C81.493,290.496,21.333,268.331,21.333,256S81.493,221.504,192.875,215.147z M23.296,284.907    c36.011,19.883,107.755,29.504,170.624,33.173c3.669,62.848,13.291,134.592,33.173,170.624    C120.811,475.563,36.437,391.189,23.296,284.907z M256,490.667c-12.331,0-34.496-60.16-40.853-171.541    C229.803,319.701,243.712,320,256,320s26.197-0.299,40.853-0.875C290.496,430.507,268.331,490.667,256,490.667z M284.907,488.704    c19.883-36.011,29.504-107.755,33.173-170.624c62.848-3.669,134.592-13.291,170.624-33.173    C475.563,391.189,391.189,475.563,284.907,488.704z"/></g></g></svg>`,
      isHTML: true,
      isSVG: false,
    },
    Pyramid: {
      icon: "◮",
      isHTML: false,
      isSVG: false,
    },
    Ellipse: {
      icon:
        `<span><img style = 'margin-top:-7px;' draggable="false" src='data:image/svg+xml;utf8,` +
        ellipse +
        `black` +
        ellipse2 +
        `' ></span>`,
      menuIcon:
        `<span><img style = 'margin-top:-7px;' draggable="false" src='data:image/svg+xml;utf8,` +
        ellipse +
        `gray` +
        ellipse2 +
        `' ></span>`,
      menuIconActive:
        `<span><img style = 'margin-top:-7px;' draggable="false" src='data:image/svg+xml;utf8,` +
        ellipse +
        `green` +
        ellipse2 +
        `' ></span>`,
      isHTML: true,
      isSVG: true,
    },
  };

  var curshape = "Rectangle",
    end = false,
    curId = "",
    lastX = 0,
    lastY = 0,
    // dashed = false,
    lastTime = performance.now(); //The time at which the last point was drawn

  function start(x, y, evt) {
    //Prevent the press from being interpreted by the browser
    evt.preventDefault();
    Tools.suppressPointerMsg = true;
    curId = Tools.generateUID("r"); //"r" for rectangle
    Tools.drawAndSend({
      type: "rect",
      id: curId,
      shape: curshape,
      color: Tools.getColor(),
      size: Tools.getSize(),
      opacity: Tools.getOpacity(),
      // dashed: dashed ? true : false,
      x: x,
      y: y,
      x2: x,
      y2: y,
    });

    lastX = x;
    lastY = y;
  }

  function move(x, y, evt) {
    /*Wait 20ms before adding any point to the currently drawing shape.
		This allows the animation to be smother*/
    if (curId !== "") {
      var curUpdate = {
        //The data of the message that will be sent for every new point
        type: "update",
        id: curId,
        shape: curshape,
        x: lastX,
        y: lastY,
      };
      curUpdate["x2"] = x;
      curUpdate["y2"] = y;
      if (performance.now() - lastTime > 70 || end) {
        Tools.drawAndSend(curUpdate);
        lastTime = performance.now();

        if (wb_comp.list["Measurement"]) {
          wb_comp.list["Measurement"].update({
            type: curshape,
            x: lastX,
            y: lastY,
            x2: x,
            y2: y,
          });
        }
      }
    }
    if (evt) evt.preventDefault();
  }

  function stop(x, y, evt) {
    evt.preventDefault();
    //Add a last point to the shape
    end = true;
    move(x, y);
    end = false;
    Tools.suppressPointerMsg = false;
    curId = "";
  }

  function draw(data) {
    console.log("data", data);
    Tools.drawingEvent = true;
    switch (data.type) {
      case "rect":
        createShape(data);
        break;
      case "update":
        var shape = svg.getElementById(data["id"]);
        if (!shape) {
          console.error(
            "Shape: Hmmm... I received a point of a shape that has not been created (%s).",
            data["id"]
          );
          return false;
        } else {
          if (Tools.useLayers) {
            if (shape.getAttribute("class") != "layer" + Tools.layer) {
              shape.setAttribute("class", "layer-" + Tools.layer);
              Tools.group.appendChild(shape);
            }
          }
        }
        if (data.shape == "Circle") {
          updateCircle(shape, data);
        } else if (data.shape == "Triangle") {
          updateTriangle(shape, data);
        } else if (data.shape == "EquiTriangle") {
          updateEquiTriangle(shape, data);
        } else if (data.shape == "Parallelogram") {
          updateParallelogram(shape, data);
        } else if (data.shape == "Rombus") {
          updateRombus(shape, data);
        } else if (data.shape == "Trapezoid") {
          updateTrapezoid(shape, data);
        } else if (data.shape == "Pentagon") {
          updatePentagon(shape, data);
        } else if (data.shape == "Hexagon") {
          updateHexagon(shape, data);
        } else if (data.shape == "Cube") {
          update3D(data);
        } else if (data.shape == "Cone") {
          update3D(data);
        } else if (data.shape == "Cylinder") {
          update3D(data);
        } else if (data.shape == "Sphere") {
          update3D(data);
        } else if (data.shape == "Pyramid") {
          update3D(data);
        } else if (data.shape == "Ellipse") {
          updateEllipse(shape, data);
        } else {
          updateRect(shape, data);
        }
        break;
      default:
        console.error(
          "Straight shape: Draw instruction with unknown type. ",
          data
        );
        break;
    }
  }

  var svg = Tools.svg;
  function createShape(data) {
    //Creates a new shape on the canvas, or update a shape that already exists with new information
    var shape = svg.getElementById(data.id);
    console.log("In SHAPE", data);
    if (data.shape == "Circle") {
      if (!shape) shape = Tools.createSVGElement("circle");
      updateCircle(shape, data);
    } else if (data.shape == "Triangle") {
      if (!shape) shape = Tools.createSVGElement("polygon");
      updateTriangle(shape, data);
    } else if (data.shape == "EquiTriangle") {
      if (!shape) shape = Tools.createSVGElement("polygon");
      updateEquiTriangle(shape, data);
    } else if (data.shape == "Parallelogram") {
      if (!shape) shape = Tools.createSVGElement("polygon");
      updateParallelogram(shape, data);
    } else if (data.shape == "Rombus") {
      if (!shape) shape = Tools.createSVGElement("polygon");
      updateRombus(shape, data);
    } else if (data.shape == "Trapezoid") {
      if (!shape) shape = Tools.createSVGElement("polygon");
      updateTrapezoid(shape, data);
    } else if (data.shape == "Pentagon") {
      if (!shape) shape = Tools.createSVGElement("polygon");
      updatePentagon(shape, data);
    } else if (data.shape == "Hexagon") {
      if (!shape) shape = Tools.createSVGElement("polygon");
      updateHexagon(shape, data);
    } else if (data.shape == "Ellipse") {
      if (!shape) shape = Tools.createSVGElement("ellipse");
      updateEllipse(shape, data);
    } else if (data.shape == "Cube") {
      if (!shape) shape = Tools.createSVGElement("cube");
      update3D(data);
    } else if (data.shape == "Cone") {
      if (!shape) shape = Tools.createSVGElement("cone");
      update3D(data);
    } else if (data.shape == "Cylinder") {
      if (!shape) shape = Tools.createSVGElement("cylinder");
      update3D(data);
    } else if (data.shape == "Sphere") {
      if (!shape) shape = Tools.createSVGElement("sphere");
      update3D(data);
    } else if (data.shape == "Pyramid") {
      if (!shape) shape = Tools.createSVGElement("pyramid");
      update3D(data);
    } else {
      if (!shape) shape = Tools.createSVGElement("rect");
      updateRect(shape, data);
    }
    shape.id = data.id;
    //If some data is not provided, choose default value. The shape may be updated later
    if (Tools.useLayers) shape.setAttribute("class", "layer-" + Tools.layer);
    shape.setAttribute("stroke", data.color || "black");
    shape.setAttribute("stroke-width", data.size || 10);
    // if (data.dashed == true) {
    //   shape.setAttribute("stroke-dasharray", "10 10" || "10 10");
    // }
    shape.setAttribute(
      "opacity",
      Math.max(0.1, Math.min(1, data.opacity)) || 1
    );
    Tools.group.appendChild(shape);
    return shape;
  }

  function updateRect(shape, data) {
    console.log(shape, "shape");
    shape.x.baseVal.value = Math.min(data["x2"], data["x"]);
    shape.y.baseVal.value = Math.min(data["y2"], data["y"]);
    shape.width.baseVal.value = Math.max(1, Math.abs(data["x2"] - data["x"]));
    shape.height.baseVal.value = Math.max(1, Math.abs(data["y2"] - data["y"]));
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) shape.setAttribute("transform", data.transform);
  }

  function updateCircle(shape, data) {
    console.log("shapeCircle", shape);
    shape.cx.baseVal.value = Math.round((data["x2"] + data["x"]) / 2);
    shape.cy.baseVal.value = Math.round((data["y2"] + data["y"]) / 2);
    shape.r.baseVal.value = Math.max(
      1,
      Math.round(
        Math.sqrt(
          Math.pow(data["x2"] - data["x"], 2) +
            Math.pow(data["y2"] - data["y"], 2)
        ) / 2
      )
    );
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) shape.setAttribute("transform", data.transform);
  }

  function updateTriangle(shape, data) {
    console.log("shapeTriangle", shape);
    var x1 = Math.min(data["x2"], data["x"]);
    var y1 = Math.max(data["y2"], data["y"]);
    var x2 = Math.max(data["x2"], data["x"]);
    var y2 = Math.min(data["y2"], data["y"]);

    var width = Math.abs(x2 - x1);
    var height = Math.abs(y2 - y1);

    var points;
    if (width > height) {
      // Make the base the longer side
      if (x1 < x2) {
        points = `${x1},${y1} ${x2},${y1} ${x1},${y2}`;
      } else {
        points = `${x1},${y1} ${x2},${y1} ${x2},${y2}`;
      }
    } else {
      // Make the height the longer side
      if (y1 < y2) {
        points = `${x1},${y1} ${x1},${y2} ${x2},${y1}`;
      } else {
        points = `${x1},${y1} ${x1},${y2} ${x2},${y2}`;
      }
    }

    shape.setAttribute("points", points);
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) {
      shape.setAttribute("transform", data.transform);
    }
  }

  function updateEquiTriangle(shape, data) {
    console.log("shapeEquilateralTriangle", shape);
    var centerX = (data.x + data.x2) / 2;
    var centerY = (data.y + data.y2) / 2;
    var sideLength = Math.abs(data.x2 - data.x);

    var height = (Math.sqrt(3) / 2) * sideLength;

    var x1 = centerX;
    var y1 = centerY - height / 3;
    var x2 = centerX - sideLength / 2;
    var y2 = centerY + (2 * height) / 3;
    var x3 = centerX + sideLength / 2;
    var y3 = y2;

    var points = `${x1},${y1} ${x2},${y2} ${x3},${y3}`;

    shape.setAttribute("points", points);
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) {
      shape.setAttribute("transform", data.transform);
    }
  }

  function updateParallelogram(shape, data) {
    // Extract the required properties from the data object
    console.log("Shape---Parallelogram", shape);
    var centerX = Math.round((data.x2 + data.x) / 2);
    var centerY = Math.round((data.y2 + data.y) / 2);
    var width = Math.abs(data.x2 - data.x);
    var height = Math.abs(data.y2 - data.y);

    // Calculate the coordinates of the parallelogram vertices
    var x1 = centerX - width / 2;
    var x2 = centerX + width / 2;
    var y1 = centerY - height / 2;
    var y2 = centerY + height / 2;

    var points =
      x1 +
      "," +
      y1 +
      " " +
      x2 +
      "," +
      y1 +
      " " +
      (x2 - width / 4) +
      "," +
      y2 +
      " " +
      (x1 - width / 4) +
      "," +
      y2;

    // Update the attributes of the polygon shape
    shape.setAttribute("points", points);
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) {
      shape.setAttribute("transform", data.transform);
    }
  }

  function updateRombus(shape, data) {
    // Extract the required properties from the data object
    var centerX = Math.round((data.x2 + data.x) / 2);
    var centerY = Math.round((data.y2 + data.y) / 2);
    var width = Math.abs(Math.round(data.x2 - data.x));
    var height = Math.abs(Math.round(data.y2 - data.y));

    // Calculate the coordinates of the rhombus vertices
    var points = [
      centerX + "," + (centerY - height / 2),
      centerX + width / 2 + "," + centerY,
      centerX + "," + (centerY + height / 2),
      centerX - width / 2 + "," + centerY,
    ];

    // Update the attributes of the polygon shape
    shape.setAttribute("points", points.join(" "));
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) {
      shape.setAttribute("transform", data.transform);
    }
  }

  function updateTrapezoid(shape, data) {
    console.log("shapeTrapezoid", shape);
    var x1 = Math.min(data["x2"], data["x"]);
    var y1 = Math.max(data["y2"], data["y"]);
    var x2 = Math.max(data["x2"], data["x"]);
    var y2 = Math.min(data["y2"], data["y"]);

    var width = Math.abs(x2 - x1);
    var height = Math.abs(y2 - y1);

    var topWidth = width * 0.6; // Adjust the top width ratio as needed

    var points = `${x1},${y1} ${x2},${y1} ${
      x2 - (width - topWidth) / 2
    },${y2} ${x1 + (width - topWidth) / 2},${y2}`;

    shape.setAttribute("points", points);
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) {
      shape.setAttribute("transform", data.transform);
    }
  }

  function updatePentagon(shape, data) {
    // Extract the required properties from the data object
    var centerX = Math.round((data.x2 + data.x) / 2);
    var centerY = Math.round((data.y2 + data.y) / 2);
    var sideLength = Math.abs(Math.round((data.x2 - data.x) / 2));

    // Calculate the coordinates of the pentagon vertices
    var angle = (2 * Math.PI) / 5;
    var points = [];
    for (var i = 0; i < 5; i++) {
      var x = centerX + sideLength * Math.cos(angle * i);
      var y = centerY + sideLength * Math.sin(angle * i);
      points.push(x + "," + y);
    }

    // Update the attributes of the polygon shape
    shape.setAttribute("points", points.join(" "));
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) {
      shape.setAttribute("transform", data.transform);
    }
  }

  function updateHexagon(shape, data) {
    // Extract the required properties from the data object
    var centerX = Math.round((data.x2 + data.x) / 2);
    var centerY = Math.round((data.y2 + data.y) / 2);
    var sideLength = Math.abs(Math.round((data.x2 - data.x) / 2));

    // Calculate the coordinates of the hexavertices
    var angle = Math.PI / 3;
    var points = [];
    for (var i = 0; i < 6; i++) {
      var x = centerX + sideLength * Math.cos(angle * i);
      var y = centerY + sideLength * Math.sin(angle * i);
      points.push(x + "," + y);
    }

    // Update the attributes of the polygon shape
    shape.setAttribute("points", points.join(" "));
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) {
      shape.setAttribute("transform", data.transform);
    }
  }

  function updateEllipse(shape, data) {
    shape.cx.baseVal.value = Math.round((data["x2"] + data["x"]) / 2);
    shape.cy.baseVal.value = Math.round((data["y2"] + data["y"]) / 2);
    shape.rx.baseVal.value = Math.max(
      1,
      Math.abs(Math.round((data["x2"] - data["x"]) / 2))
    );
    shape.ry.baseVal.value = Math.max(
      1,
      Math.abs(Math.round((data["y2"] - data["y"]) / 2))
    );
    shape.setAttribute("fill", "none");
    if (data.data) {
      shape.setAttribute("data-lock", data.data);
    }
    if (data.transform) shape.setAttribute("transform", data.transform);
  }

  function update3D(data) {
    var imgCount = 1;
    var image = new Image();

    // Set image source based on the shape
    if (data.shape === "Cone") {
      image.src =
        "https://clipart-library.com/newhp/41112278-ba4c-46dc-9dfc-8d56be33405f_medium_thumb.jpg";
    } else if (data.shape === "Cube") {
      image.src =
        "https://images.nagwa.com/figures/explainers/158156163529/6.svg";
    } else if (data.shape === "Cylinder") {
      image.src =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTU-HBIWG7uchwerjQb3vmiLlPx5XHKpO09iJSK6f2E8FEpqxL9dRxYj5Ybx85O4S57Ug&usqp=CAU";
    } else if (data.shape === "Sphere") {
      image.src = "https://clipart-library.com/img/852313.gif";
    } else if (data.shape === "Pyramid") {
      image.src =
        "https://www.sciencekids.co.nz/images/experiments/squarepyramid230.jpg";
    }

    image.onload = function () {
      var uid = Tools.generateUID("doc");

      var msg = {
        id: uid,
        type: "doc",
        src: image.src,
        w: this.width || 300,
        h: this.height || 300,
        x:
          (100 + document.documentElement.scrollLeft) / Tools.scale +
          10 * imgCount,
        y:
          (100 + document.documentElement.scrollTop) / Tools.scale +
          10 * imgCount,
      };

      drawImage(msg);
    };
  }

  function drawImage(msg) {
    var aspect = msg.w / msg.h;
    var img = Tools.createSVGElement("image");
    img.id = msg.id;
    img.setAttribute("class", "layer-" + Tools.layer);
    img.setAttributeNS(xlinkNS, "href", msg.src);
    img.x.baseVal.value = msg["x"];
    img.y.baseVal.value = msg["y"];
    img.setAttribute("width", 400 * aspect);
    img.setAttribute("height", 400);
    if (msg.transform) img.setAttribute("transform", msg.transform);
    Tools.group.appendChild(img);
  }

  function toggle(elem) {
    console.log("toggle", elem);
    if (Tools.menus["Rectangle"].menuOpen()) {
      Tools.menus["Rectangle"].show(false);
    } else {
      Tools.menus["Rectangle"].show(true);
    }
    if (!menuInitialized) initMenu(elem);
  }

  var menuInitialized = false;
  var menuShape = "Circle";
  var button;

  function initMenu(elem) {
    button = elem;
    var btns = document.getElementsByClassName("submenu-rect");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", menuButtonClicked);
    }
    // var elem = document.getElementById("rect-dashed");
    // elem.addEventListener("click", dashedClicked);
    updateMenu("Rectangle");
    menuInitialized = true;
  }

  var menuButtonClicked = function () {
    menuShape = this.id.substr(13);
    console.log(menuShape, "menuShape");
    curshape = menuShape;

    console.log("curshape", curshape);
    updateMenu(menuShape);
    changeButtonIcon();
  };

  var changeButtonIcon = function () {
    if (icons[curshape].isHTML) {
      button.getElementsByClassName("tool-icon")[0].innerHTML =
        icons[curshape].icon;
    } else {
      button.getElementsByClassName("tool-icon")[0].textContent =
        icons[curshape].icon;
    }
  };

  var updateMenu = function (shape) {
    var btns = document.getElementsByClassName("submenu-rect");
    for (var i = 0; i < btns.length; i++) {
      if (icons[btns[i].id.substr(13)].isSVG) {
        btns[i].getElementsByClassName("tool-icon")[0].innerHTML =
          icons[btns[i].id.substr(13)].menuIcon;
      }
      btns[i].style.backgroundColor = "#fff";
      btns[i].style.color = "gray";
      btns[i].style.borderRadius = "8px";
    }
    /*if(shape=="Ellipse"){
			var extender = document.getElementById("submenu-rect-extend")
			extender.style.display = 'block';
			$(extender).animate({width:250,height:200});
		}*/
    var btn = document.getElementById("submenu-rect-" + shape);
    if (icons[btn.id.substr(13)].isSVG) {
      btn.getElementsByClassName("tool-icon")[0].innerHTML =
        icons[btn.id.substr(13)].menuIconActive;
    }
    btn.style.backgroundColor = "#eeeeff";
    btn.style.color = "green";
    btn.style.borderRadius = "8px";
  };

  // function dashedClicked() {
  //   var elem = document.getElementById("rect-dashed");
  //   if (dashed) {
  //     dashed = false;
  //     elem.setAttribute("class", "far fa-square");
  //   } else {
  //     elem.setAttribute("class", "far fa-check-square");
  //     dashed = true;
  //   }
  // }

  function menuListener(elem, onButton, onMenu, e) {
    if (!onMenu && !onButton) {
      e.stopPropagation();
      return true;
    }
    return false;
  }

  Tools.add({
    //The new tool
    // "name": "Rectangle",
    //  "icon": "▢",
    iconHTML: shapeSVG,
    name: "Rectangle",
    title: "Shapes",
    listeners: {
      press: start,
      move: move,
      release: stop,
    },
    draw: draw,
    toggle: toggle,
    shortcuts: {
      changeTool: "3",
    },
    menu: {
      title: "Shapes",
      content2d:
        `<div class="tool-extra submenu-rect" id="submenu-rect-Rectangle">
              <span title = "Rectangle" class="tool-icon" id="shape2d-rectangle">▭</span>
						</div>

						<div class="tool-extra submenu-rect" id="submenu-rect-Circle">
              <span title = "Circle" class="tool-icon" id="shape2d-circle">◯</span>
						</div>
            
						<div class="tool-extra submenu-rect" id="submenu-rect-Triangle">
              <span title = "Triangle" class="tool-icon" id="shape2d-triangle">◺</span>
						</div>

						<div class="tool-extra submenu-rect" id="submenu-rect-EquiTriangle">
              <span title = "EquiTriangle" class="tool-icon" id="shape2d-equi">△</span>
						</div>

						<div class="tool-extra submenu-rect" id="submenu-rect-Parallelogram">
              <span title = "Parallelogram" class="tool-icon" id="shape2d-parallelogram">▱</span>
						</div>
            
						<div class="tool-extra submenu-rect" id="submenu-rect-Trapezoid">
              <span title = "Trapezoid" class="tool-icon" id="shape2d-trapezoid">⏢</span>
						</div>

            <div class="tool-extra submenu-rect" id="submenu-rect-Rombus">
              <span title = "Rombus" class="tool-icon" id="shape2d-rombus">◇</span>
						</div>

						<div class="tool-extra submenu-rect" id="submenu-rect-Pentagon">
              <span title = "Pentagon" class="tool-icon" id="shape2d-pentagon">⬠</span>
						</div>
            
						<div class="tool-extra submenu-rect" id="submenu-rect-Hexagon">
            <span title = "Hexagon" class="tool-icon" id="shape2d-hexagon">⎔</span>
						</div>

            <div class="tool-extra submenu-rect" id="submenu-rect-Ellipse">
							<span title = "Ellipse" class="tool-icon" id="shape2d-ellipse">` +
        icons["Ellipse"].icon +
        `</span>
						</div>
            `,
      content3d: `  <div class="tool-extra submenu-rect" id="submenu-rect-Cube">
            <span title = "cube" class="tool-icon" id="shape3d-cube">❒</span>
           </div>

          <div class="tool-extra submenu-rect" id="submenu-rect-Cone">
            <span title = "cone" class="tool-icon" id="shape3d-cone">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 511.915 511.915" xml:space="preserve">             
              <g>
                <path d="M426.624,469.269c0-0.043-0.021-0.064-0.021-0.107c0-0.597-0.235-1.131-0.32-1.707c-0.107-0.576-0.043-1.152-0.235-1.707    l-0.192-0.555c-0.043-0.128-0.085-0.235-0.128-0.363l-0.448-1.301c-0.256-0.683-0.363-1.387-0.704-2.048L266.069,7.061    c-0.085-0.235-0.256-0.384-0.341-0.597c-0.256-0.64-0.661-1.173-1.045-1.749c-0.384-0.576-0.747-1.173-1.237-1.664    c-0.448-0.448-1.003-0.789-1.536-1.152c-0.619-0.427-1.195-0.832-1.877-1.109c-0.192-0.085-0.341-0.256-0.555-0.32    c-0.469-0.171-0.96-0.107-1.451-0.192C257.365,0.149,256.747,0,256.064,0c-0.832,0-1.621,0.149-2.411,0.341    c-0.384,0.085-0.768,0.021-1.152,0.171c-0.171,0.064-0.277,0.192-0.448,0.256c-0.789,0.32-1.472,0.789-2.176,1.28    c-0.448,0.32-0.917,0.597-1.301,0.981c-0.533,0.533-0.939,1.152-1.344,1.813c-0.363,0.533-0.725,1.045-0.96,1.621    c-0.085,0.213-0.277,0.363-0.341,0.597L87.339,461.504c-0.341,0.64-0.448,1.323-0.683,1.984l-0.789,2.24    c-0.235,0.661-0.171,1.323-0.277,2.005c-0.064,0.512-0.299,0.96-0.299,1.515c0,0.107,0.064,0.213,0.064,0.32    c0.021,0.661,0.213,1.28,0.363,1.92c0.171,0.896,0.341,1.771,0.725,2.603c11.669,36.629,152.768,37.824,169.515,37.824    c16.768,0,158.101-1.195,169.557-37.909c0.064-0.128,0.107-0.277,0.171-0.427c0.192-0.427,0.213-0.896,0.363-1.344    c0.256-0.896,0.512-1.771,0.555-2.709c0-0.043,0.021-0.085,0.021-0.128C426.603,469.333,426.624,469.312,426.624,469.269z     M255.957,42.944l139.435,399.701c-45.739-15.381-126.976-16.064-139.413-16.064c-12.437,0-93.696,0.683-139.435,16.064    L255.957,42.944z M255.957,490.56c-91.285,0.021-141.269-14.272-148.437-20.715c8.384-8,58.176-21.952,148.437-21.952    c91.285,0,141.269,14.272,148.437,20.715C396.011,476.608,346.219,490.56,255.957,490.56z"/>
              </g>
            </svg>
            </span>
          </div>

          <div class="tool-extra submenu-rect" id="submenu-rect-Cylinder">
            <span title = "cylinder" class="tool-icon" id="shape3d-cylinder">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
              <g>
                <g>
                  <path d="M425.621,38.187C414.763,1.216,272.789,0,256,0S97.237,1.216,86.379,38.187c-0.64,1.387-1.045,2.859-1.045,4.48v426.667    c0,1.707,0.469,3.328,1.152,4.843C98.155,510.805,239.275,512,256,512c16.789,0,158.763-1.216,169.621-38.187    c0.64-1.387,1.045-2.859,1.045-4.48V42.667C426.667,41.045,426.261,39.573,425.621,38.187z M256,21.333    c87.723,0,137.685,13.248,148.075,21.333C393.685,50.752,343.723,64,256,64S118.315,50.752,107.925,42.667    C118.315,34.581,168.277,21.333,256,21.333z M256,490.667c-91.285,0-141.269-14.272-148.437-20.715    C115.947,461.952,165.739,448,256,448c91.285,0,141.269,14.272,148.437,20.715C396.053,476.715,346.24,490.667,256,490.667z     M405.333,446.571C362.688,427.456,269.397,426.667,256,426.667s-106.688,0.789-149.333,19.904V65.429    C149.312,84.544,242.603,85.333,256,85.333s106.688-0.789,149.333-19.904V446.571z"/>
                </g>
              </g>
            </svg>
            </span>
          </div>

          <div class="tool-extra submenu-rect" id="submenu-rect-Sphere">
            <span title = "sphere" class="tool-icon" id="shape3d-sphere">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
              <g>
	              <g>
		              <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M319.125,215.147    c111.381,6.357,171.541,28.523,171.541,40.853s-60.16,34.496-171.541,40.853C319.701,282.197,320,268.288,320,256    S319.701,229.803,319.125,215.147z M488.704,227.093c-36.011-19.883-107.755-29.504-170.624-33.173    c-3.669-62.848-13.291-134.592-33.173-170.624C391.189,36.437,475.563,120.811,488.704,227.093z M298.667,256    c0,14.656-0.341,28.48-0.832,41.835c-13.355,0.491-27.179,0.832-41.835,0.832s-28.48-0.341-41.835-0.832    c-0.491-13.355-0.832-27.179-0.832-41.835s0.341-28.48,0.832-41.835c13.355-0.491,27.179-0.832,41.835-0.832    s28.48,0.341,41.835,0.832C298.325,227.52,298.667,241.344,298.667,256z M256,21.333c12.331,0,34.496,60.16,40.853,171.541    C282.197,192.299,268.288,192,256,192s-26.197,0.299-40.853,0.875C221.504,81.493,243.669,21.333,256,21.333z M227.093,23.296    c-19.883,36.032-29.504,107.776-33.173,170.624c-62.848,3.669-134.592,13.291-170.624,33.173    C36.437,120.811,120.811,36.437,227.093,23.296z M192.875,215.147C192.299,229.803,192,243.712,192,256s0.299,26.197,0.875,40.853    C81.493,290.496,21.333,268.331,21.333,256S81.493,221.504,192.875,215.147z M23.296,284.907    c36.011,19.883,107.755,29.504,170.624,33.173c3.669,62.848,13.291,134.592,33.173,170.624    C120.811,475.563,36.437,391.189,23.296,284.907z M256,490.667c-12.331,0-34.496-60.16-40.853-171.541    C229.803,319.701,243.712,320,256,320s26.197-0.299,40.853-0.875C290.496,430.507,268.331,490.667,256,490.667z M284.907,488.704    c19.883-36.011,29.504-107.755,33.173-170.624c62.848-3.669,134.592-13.291,170.624-33.173    C475.563,391.189,391.189,475.563,284.907,488.704z"/>
	              </g>
              </g>
            </svg>
            </span>
          </div>
          <div class="tool-extra submenu-rect" id="submenu-rect-Pyramid">
           <span title = "pyramid" class="tool-icon" id="shape3d-pyramid">◮</span>
          </div>`,
      listener: menuListener,
    },
    mouseCursor: "crosshair",
    stylesheet: "tools/rect/rect.css",
  });
})(); //End of code isolation
