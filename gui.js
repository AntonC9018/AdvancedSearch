var filtersOn = false;
$(document).ready(function() {

  $(".filters.options").hide();

  $(".filters.bt").click(function() {
    $(".filters.options").slideToggle("medium");
    if (!filtersOn) {
      $(".arrow-up").addClass("rotate");
      $(this).css("background-color", "rgb(232, 162, 204)");
      filtersOn = true;
    } else {
      $(".arrow-up").removeClass("rotate");
      filtersOn = false;
    }

  }).mouseout(function() {

    if (!filtersOn) {
      $(this).css("background-color", "rgb(236, 161, 61)");
    }
  //$("<p>").text("yyy").appendTo($(".content"));
  });

  setOptions($(".filters.options"))
})

function setOptions(el) {
  let d;
  $.ajax({
    url: "options.json",
    success: function(result) {
      d = result.data;
    }
  }).done(function() {
    for (let i = 0; i < d.length; i++) {
      el.append(
        $("<div>")
          .html(d[i].title)
          .addClass(d[i].class));
    }
    setFilters();
  })
}
var search = false;
function setFilters() {
  $(".search").click(function() {
    if (!search) {
      $(".container.tools").append(
        $("<div>")
          .html("Search")
          .addClass("tool")
          .addClass(this.class)
          .append(
            $("<form>")
              .append($("<input>")
                .attr("type", "text")
                .on('input', function() {
                  find($(this).val());
                }))))
      search = true;
    }
  })
}
