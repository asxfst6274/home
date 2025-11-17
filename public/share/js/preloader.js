function handlePreloader() {
  if ($(".preloader").length) {
    $(".preloader").delay(1000).fadeOut(500);
  }
}

$(window).on("load", handlePreloader);
