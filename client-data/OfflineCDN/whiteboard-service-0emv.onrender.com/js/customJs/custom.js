$(document).ready(() => {
  $("body").on("click", ".size_selector_container", () => {
    $(".size_selector_container .verticalAlign").toggleClass("sizeSelector");
  });
  $("body").on("click", ".opacityPicker", () => {
    $(".opacityPicker .opacitySelector").toggleClass("hideOpacity");
  });

  $("body .popover").removeClass("fade show");
  // $("body").on("click", "#toolID-Rectangle", () => {
  //   $("#popover-Rectangle").toggleClass('toggleRectagleTool');
  //   $("#popover-Line").removeClass('toggleLineTool');

  // });
  // $("body").on("click", "#toolID-Line", () => {
  //   $("#popover-Line").toggleClass('toggleLineTool');
  //   $("#popover-Rectangle").removeClass('toggleRectagleTool');
  // });
});

