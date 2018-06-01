$(() => {
  $("#btn-open").on("click", () => {
    $("#sidebar").toggleClass("display-none");
    $("#btn-open").toggleClass("display-none");
    $("#map-container").toggleClass("col");
  });
  $("#btn-close").on("click", () => {
    $("#sidebar").toggleClass("display-none");
    $("#btn-open").toggleClass("display-none");
    $("#map-container").toggleClass("col");
  });
});
