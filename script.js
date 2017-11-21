$(function() {
  var shapeDiv;
  var startX;
  var startY;
  var endX;
  var endY;
  function createShape(shapeInfo) {
    shapeDiv = document.createElement("div");
    shapeInfo.forEach(function(info) {
      if (info.name === "shape") { $(shapeDiv).addClass(info.value) }
      else if (info.name === "startX") {
        startX = info.value || "0"
        $(shapeDiv).attr("data-startX", startX)
      }
      else if (info.name === "startY") {
        startY = info.value || "0"
        $(shapeDiv).attr("data-startY", startY)
      }
      else if (info.name === "endX") {
        endX = info.value || "0"
        $(shapeDiv).attr("data-endX", endX)
      }
      else if (info.name === "endY") {
        endY = info.value || "0"
        $(shapeDiv).attr("data-endY", endY)
      }
      else if (info.name === "duration") { $(shapeDiv).attr("data-duration", info.value) }
    })
    $(shapeDiv).css({
      "top": $(shapeDiv).attr("data-startY") + "px",
      "left": $(shapeDiv).attr("data-startX") + "px",
    })
    return shapeDiv;
  }

  $("form").submit(function(e) {
    e.preventDefault();
    shapeInfo = $(this).serializeArray();
    $(".stage-container").append(createShape(shapeInfo));
  })

  $(".start").click(function(e) {
    e.preventDefault();
    $(".stage").siblings().each(function() {
      var duration = $(this).attr("data-duration") ?
      parseInt($(this).attr("data-duration"), 10) * 1000 : 1000;
      $(this).css({
        "top": $(this).attr("data-startY") + "px",
        "left": $(this).attr("data-startX") + "px"
      });
      $(this).animate({
        "top": $(this).attr("data-endY") + "px",
        "left": $(this).attr("data-endX") + "px"
      }, duration);
    })
  })

  $(".stop").click(function(e) {
    e.preventDefault();
    $(".stage").siblings().stop(true);
  })
})
