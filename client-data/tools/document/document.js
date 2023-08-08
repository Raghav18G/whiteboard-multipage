(function documents() {
  //For drawer
  const drawer = document.querySelector("#drawer");
  const closeButton = document.querySelector("#closeButton");
  const libraryImages = document.querySelectorAll("#libraryImage");

  closeButton.addEventListener("click", () => {
    drawer.classList.remove("open");
  });

  //Tabs Logic
  const tabs = document.querySelectorAll(".tab");
  const tabContent = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedCategory = tab.dataset.category;
      tabContent.forEach((content) => {
        if (content.id === selectedCategory) {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });
    });
  });

  libraryImages.forEach((lbImage) => {
    lbImage.addEventListener("click", () => {
      console.log("CLICKED LIBRARY IMAGE");
      let uid = Tools.generateUID("doc");

      // Create a new XMLHttpRequest or fetch to load the image
      var xhr = new XMLHttpRequest();
      xhr.open("GET", lbImage.src, true);
      xhr.responseType = "blob";
      xhr.send();

      xhr.onload = function () {
        if (xhr.status === 200) {
          // Create a new FileReader instance
          var reader = new FileReader();
          reader.onloadend = function () {
            // The result attribute contains the data URL
            var dataURL = reader.result;

            var msgLibrary = {
              id: uid,
              type: "doc",
              src: dataURL,
              w: this.width || 300,
              h: this.height || 300,
              x:
                (100 + document.documentElement.scrollLeft) / Tools.scale +
                10 * imgCount,
              y:
                (100 + document.documentElement.scrollTop) / Tools.scale +
                10 * imgCount,
            };
            draw(msgLibrary);
            Tools.send(msgLibrary, "Document");
            imgCount++;
          };

          // Read the file as a Data URL
          reader.readAsDataURL(xhr.response);
        }
      };
    });
  });

  //Code isolation
  var uploadSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon points="16 9 16 16 1 16 1 9 0 9 0 17 17 17 17 9 16 9"/><polygon points="8.5 0 15.15 6.65 14.44 7.35 9 1.91 9 13 8 13 8 1.91 2.56 7.35 1.85 6.65 8.5 0"/></g></g></svg>';
  var xlinkNS = "http://www.w3.org/1999/xlink";
  var imgCount = 1;
  var fileInput;

  function chooseFromDevice() {
    document.getElementById("documentModal").style.display = "none";
    document
      .getElementById("SelectFromDevice")
      .removeEventListener("click", () => {
        console.log("Event Listener Removed");
      });
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();
    fileInput.addEventListener("change", function () {
      var reader = new FileReader();
      reader.readAsDataURL(fileInput.files[0]);
      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          var uid = Tools.generateUID("doc"); // doc for document
          // console.log(image.src.toString().length);

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
            fileType: fileInput.files[0].type,
          };

          draw(msg);

          Tools.send(msg, "Document");
          imgCount++;
        };
      };
    });
  }

  function chooseFromLibrary(e) {
    e = e || window.event;
    const container = document.getElementsByClassName(".tab-panel");
    let startX;
    let startY;

    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    container.addEventListener("touchmove", (e) => {
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;

      container.scrollLeft -= deltaX;
      container.scrollTop -= deltaY;
    });

    drawer.classList.add("open");
    document.getElementById("documentModal").style.display = "none";

    document.getElementById("tab1").click();

    //Removng Event Listener
    document
      .getElementById("SelectFromLibrary")
      .removeEventListener("click", () => {
        console.log("Removed Event Listener");
      });
  }

  function onstart() {
    document.getElementById("documentModal").style.display = "block";
    document
      .getElementById("documentModalModalClose")
      .addEventListener("click", () => {
        document.getElementById("documentModal").style.display = "none";
      });
    document
      .getElementById("SelectFromDevice")
      .addEventListener("click", chooseFromDevice);
    document
      .getElementById("SelectFromLibrary")
      .addEventListener("click", chooseFromLibrary);
  }

  function draw(msg) {
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

  Tools.add({
    name: "Document",
    // "icon": "🖼️",
    iconHTML: uploadSVG,
    shortcuts: {
      changeTool: "7",
    },
    draw: draw,
    onstart: onstart,
    oneTouch: true,
  });
})(); //End of code isolation
