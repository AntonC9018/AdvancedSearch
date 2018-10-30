var filtersOn = false;
$(document).ready(function() {

  $(".filters.options").hide();

  $(".filters.bt").click(function() {
    $(".filters.options").slideToggle("medium");
    if (!filtersOn) {
      // cute little arow thingy
      $(".arrow-up").addClass("rotate");

      $(this).css("background-color", "rgb(232, 162, 204)");
      filtersOn = true;
    } else {
      // love it
      $(".arrow-up").removeClass("rotate");
      filtersOn = false;
    }

  }).mouseout(function() {
    if (!filtersOn) {
      $(this).css("background-color", "rgb(236, 161, 61)");
    }
  });

  setOptions($(".filters.options"))
})
// add options to the "filter" list
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
          .addClass(d[i].class)
          .addClass("filter"));
    }
    setFilters();
  })
}
var timers = {}
var search = false;
function setFilters() {
  $(".search").click(function() {
    if (!search) {
      let clName = this.className.split(' ')[0];
      console.log(clName)
      $(".container.tools").append(
        $("<div>")
          .html("Search")
          .addClass("tool")
          .addClass(clName)
          .append(
            $("<form>")
              .append($("<input>") // insert word here
                .attr("type", "text")
            ))
          .append($("<button>") // tap to tab to next match
            .html("next")
            .click(function() {
              jump(clName);
            })));
      search = true;
      let box = $("." + clName + " input");
      timers[clName] = setInterval(function() {
        find(box.val(), clName);
      }, 1000 / 40);
    } else {
      clearInterval(timers[clName]);
      find('', clName);
      search = false;
    }
  })
}
