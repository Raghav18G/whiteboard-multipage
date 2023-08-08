var flag = 1;

async function addNewPage() {
  document.getElementById("addNewPageModal").style.display = "block";
  document.getElementById("pagesModalClose").addEventListener("click", () => {
    document.getElementById("addNewPageModal").style.display = "none";
  });
  const structure = await window.localStorage.getItem("structure").split(",");
  const boardName = await window.localStorage.getItem("selectedBoard");

  console.log("structure", structure, "Board Name: ", boardName);
  let pageTiles = document.querySelectorAll(".page-tile");
  console.log("Page Tiles", pageTiles);

  const files = [];
  structure.map((path) => {
    if (path.includes(boardName)) {
      const fileNumber = parseInt(path.split("/")[1].replace(".json", ""));
      files.push(fileNumber);
    }
  });

  console.log("FILES", files);

  console.log("LENGTH MISMATCH");
  console.log("ADDING the PAges");
  if (flag == 1) {
    files.map((pageNumber) => {
      //Fetching Page Number
      const multipageNumber = pageNumber;
      const pageContainer = document.getElementById("pageContainer");
      const newPage = document.createElement("a");
      // const pageNumber = pageContainer.children.length + 1;
      newPage.classList.add("page-tile");

      //Navigation Logic
      const baseURL = window.location.origin + window.location.pathname;
      const newParams = `?board=${boardName}&file=${multipageNumber}`;
      const newURL = baseURL + newParams;
      newPage.textContent = "Page " + multipageNumber;
      newPage.href = `${newURL}`;
      pageContainer.appendChild(newPage);
      flag++;
    });
  }

  document.getElementById("addPageBtn").addEventListener("click", function () {
    //Main Logic of Page Addition
    const structure = window.localStorage.getItem("structure").split(",");
    const currentFile = window.localStorage.getItem("currentFile");
    let selectedBoard = window.localStorage.getItem("selectedBoard");
    if (!selectedBoard) {
      selectedBoard = window.location.search.split("?board=")[1].split("&")[0];
    }
    const files = [];
    structure.map((path) => {
      if (path.includes(selectedBoard)) {
        const fileNumber = parseInt(path.split("/")[1].replace(".json", ""));
        files.push(fileNumber);
      }
    });
    let nextFile = 1;
    files.map((file) => {
      if (file > nextFile) {
        nextFile = file;
      }
    });
    window.location.assign(
      `http://localhost:8080/board.html?board=${selectedBoard}&file=${
        nextFile + 1
      }`
    );
  });
}
