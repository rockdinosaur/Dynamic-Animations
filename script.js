$(function() {
  var shapeDiv;
  function createShape(shapeInfo) {
    shapeDiv = document.createElement("div");
    shapeInfo.forEach(function(info) {
      if (info.name === "shape") { $(shapeDiv).addClass(info.value) }
      else if (info.name === "startX") { $(shapeDiv).attr("data-startX", info.value) }
      else if (info.name === "startY") { $(shapeDiv).attr("data-startY", info.value) }
      else if (info.name === "endX") { $(shapeDiv).attr("data-endX", info.value) }
      else if (info.name === "endY") { $(shapeDiv).attr("data-endY", info.value) }
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
