$(document).ready(function () {
  // INITIALIZE AOS
  AOS.init();

  //header scroll bg change
  // Hide header on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $("#mainNavigation").outerHeight();

  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  $('#mainNavigation .nav__wrapper').hover((function(){
    $('#mainNavigation .nav__logo a img').attr('src', 'https://www.3ds.com/assets/3ds-navigation/3DS_corporate-logo_blue.svg');
  }),
  function(){
        $('#mainNavigation .nav__logo a img').attr('src', 'https://www.3ds.com/assets/3ds-navigation/3DS_corporate-logo_white.svg');
  });

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If scrolled down and past the navbar, add class .nav-up.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $("#mainNavigation .nav__wrapper")
        .removeClass("nav-down")
        .addClass("nav-up");
      $('#mainNavigation .nav__logo a img').attr('src', 'https://www.3ds.com/assets/3ds-navigation/3DS_corporate-logo_blur.svg');

    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $("#mainNavigation .nav__wrapper")
          .removeClass("nav-up")
          .addClass("nav-down");
          $('#mainNavigation .nav__logo a img').attr('src', 'https://www.3ds.com/assets/3ds-navigation/3DS_corporate-logo_blue.svg');
        
      }
      if (st < 10) {
        $("#mainNavigation .nav__wrapper")
          .removeClass("nav-up")
          .removeClass("nav-down");
        $('#mainNavigation .nav__logo a img').attr('src', 'https://www.3ds.com/assets/3ds-navigation/3DS_corporate-logo_white.svg');

      }
    }

    lastScrollTop = st;
  }

  // PARALLAX HEIGHT FOR HERO SECTION
  function parallax_height() {
    var scroll_top = $(this).scrollTop();
    var sample_section_top = $(".section-wrapper").offset().top;
    var header_height = $(".hero__wrapper").outerHeight();
    //  $(".section-wrapper").css({ "margin-top": header_height });
    $(".section__hero").css({ height: header_height - scroll_top });
  }
  parallax_height();
  $(window).scroll(function () {
    parallax_height();
  });
  $(window).resize(function () {
    parallax_height();
  });

  // GSAP ANIMATION FOR TIMELINE ITEMS
  gsap.registerPlugin(ScrollTrigger);

  const timeLineLists = gsap.utils.toArray(
    '.x-timeline[data-scroll="true"] .x-timeline-item_marker-inner'
  );

  timeLineLists.forEach((timeLineList, i) => {
    ScrollTrigger.create({
      trigger: timeLineList,
      id: i + 1,
      start: "top center",
      end: () => `+=${timeLineList.clientHeight + 30}`,
      toggleActions: "play none none none",
      onEnter() {
        timeLineList.classList.add("x-timeline-item_marker-inner-active");
      },
      onEnterBack() {
        timeLineList.classList.remove("x-timeline-item_marker-inner-active");
      },
      // toggleClass: 'x-timeline-item_marker-inner-active',
      //markers: true
    });
  });

  function skew_home() {
    let skews = document.querySelectorAll(".emotion");
    let scrollTop = window.scrollY;
    skews.forEach((skew) => {
      let clip_circle = gsap.timeline({
        scrollTrigger: {
          trigger: skew,
          start: "120 center",
          scrub: 0.5,
          ease: "ease",
        },
      });

      clip_circle.fromTo(
        skew,
        {
          clipPath: "circle(0.01% at 50% 50%)",
        },
        {
          clipPath: "circle(" + scrollTop + "% at 50% 50%)",
        }
      );
    });
  } //skew
  skew_home();

  /* Toggle Video Modal
  -----------------------------------------*/
  function toggle_video_modal() {
    // Click on video thumbnail or link
    $(".video-handler_button").on("click", function (e) {
      // prevent default behavior for a-tags, button tags, etc.
      e.preventDefault();

      // Grab the video ID from the element clicked
      var id = $(this).attr("data-video-id");

      // Autoplay when the modal appears
      // Note: this is intetnionally disabled on most mobile devices
      // If critical on mobile, then some alternate method is needed
      var autoplay = "?autoplay=1";

      // Don't show the 'Related Videos' view when the video ends
      var related_no = "&rel=0";

      // String the ID and param variables together
      var src = "//www.youtube.com/embed/" + id + autoplay + related_no;

      // Pass the YouTube video ID into the iframe template...
      // Set the source on the iframe to match the video ID
      $("#youtube").attr("src", src);

      // Add class to the body to visually reveal the modal
      $(".video-modal").addClass("launched");
    });

    // Close and Reset the Video Modal
    function close_video_modal() {
      event.preventDefault();

      // re-hide the video modal
      $(".video-modal").removeClass("launched");

      // reset the source attribute for the iframe template, kills the video
      $("#youtube").attr("src", "");
    }
    // if the 'close' button/element, or the overlay are clicked
    $("body").on(
      "click",
      ".close-video-modal, .video-modal-overlay",
      function (event) {
        // call the close and reset function
        close_video_modal();
      }
    );
    // if the ESC key is tapped
    $("body").keyup(function (e) {
      // ESC key maps to keycode `27`
      if (e.keyCode == 27) {
        // call the close and reset function
        close_video_modal();
      }
    });
  }
  toggle_video_modal();
});
