// ON LOAD
$(document).ready(function() {

  // TEST
  // const emoji_mood = "happy";
  // const emoji_color = "pink";

  let emoji_mood;
  let emoji_color;

  const emoji = $("#emoji");
  const emoji_face = $(".emoji_face");
  const emoji_face_color = $(".emoji_color");
  const emoji_eyes = $("#emoji_eyes");
  const emoji_mouth = $("#emoji_mouth");
  $(".loading_bg_eyes").css("display", "none");
  $(".loading_bg_mouth").css("display", "none");

  const mainTL = new TimelineMax({
    paused: true
  });
  mainTL.defaultOverwrite = "false";

  const tl_emoji_mouth = new TimelineMax({
    paused: true,
    onComplete: resume
  });
  tl_emoji_mouth.defaultOverwrite = "false";

  const tl_emoji_eyes = new TimelineMax({
    paused: true,
    onComplete: resume
  });
  tl_emoji_eyes.defaultOverwrite = "false";

  function main_anim(emoji_mood, emoji_color) {
    // VARS
    emoji_eyes.addClass("emoji_eyes_" + emoji_mood);
    emoji_eyes.css("background-color", emoji_color);
    emoji_mouth.addClass("emoji_mouth_" + emoji_mood);
    emoji_mouth.css("background-color", emoji_color);
    // TL
    mainTL.to(emoji, 1.5, {
      ease: Bounce.easeOut,
      yPercent: 360,
      onComplete: gearwheel_toggle
    });
    mainTL.to(emoji, 2.2, {
      ease: Power0.easeNone,
      xPercent: 212,
      onComplete: gearwheel_toggle
    });
    // insert eyes
    mainTL.add(function() {
      console.log('[EYES]');
      mainTL.pause();
      emoji_face.addClass("emoji_eyes_" + emoji_mood);
      tl_emoji_eyes.play();
    });
    mainTL.to(emoji, 4.1, {
      ease: Power0.easeNone,
      xPercent: 600,
      onComplete: gearwheel_toggle
    });
    // insert mouth
    mainTL.add(function() {
      console.log('[MOUTH]');
      mainTL.pause()
      emoji_face_color.css("background-color", emoji_color);
      emoji_face.removeClass("emoji_eyes_" + emoji_mood);
      emoji_face.addClass("emoji_" + emoji_mood);
      tl_emoji_mouth.play();
    });
    mainTL.to(emoji, 3.7, {
      ease: Power0.easeNone,
      xPercent: 955,
      onComplete: gearwheel_toggle
    });
    // mainTL.set(emoji, {y: emoji_y x: "955%"}); //test
    mainTL.set(emoji, {
      transformOrigin: "50% 125%",
    });
    mainTL.to(emoji, 0.25, {
      ease: Power0.easeIn,
      rotation: "+=90",
      delay: 2,
      onComplete: gearwheel_toggle
    });
    mainTL.to(emoji, 0.75, {
      ease: Bounce.easeOut,
      xPercent: 965,
      yPercent: 426
    });
    mainTL.to(emoji, 0.75, {
      ease: Power0.easeNone,
      xPercent: 1085
    }, "+= -0.5");
    mainTL.add(function() {
      console.log('[GEARWHEEL][PAUSE]'),
        gearwheel.pause();
      reset(emoji_mood);
    });

    // STEP 02 EYES
    tl_emoji_eyes.add(function() {
      console.log('[SCREEN][EYES][ON]');
      $("#screen_eyes_mood").append("<div id=\"append_eyes\"><u>EYES</u><br>" + emoji_mood + "<br>" + emoji_color + "</div>");
      $(".loading_bg_eyes").css("display", "block");
    });
    tl_emoji_eyes.to("#loading_bar_eyes", .5, {
      ease: RoughEase.ease.config({
        template: Power0.easeNone,
        strength: 1,
        points: 5,
        taper: "none",
        randomize: true,
        clamp: true
      }),
      width: "100%"
    });
    tl_emoji_eyes.to(emoji_eyes, .75, {
      ease: Bounce.easeOut,
      yPercent: 300,
      delay: 1
    }, "+= -1");
    tl_emoji_eyes.to(emoji_eyes, .5, {
      ease: Power0.easeIn,
      yPercent: 330,
      scale: 0
    });

    // STEP 3 MOUTH
    tl_emoji_mouth.add(function() {
      console.log('[SCREEN][MOUTH][ON]');
      $("#screen_mouth_mood").append("<div id=\"append_mouth\"><u>MOUTH</u><br>" + emoji_mood + "<br>" + emoji_color + "</div>");
      $(".loading_bg_mouth").css("display", "block");
    });
    tl_emoji_mouth.to($("#loading_bar_mouth"), 1.5, {
      ease: RoughEase.ease.config({
        template: Power0.easeNone,
        strength: 1,
        points: 5,
        taper: "none",
        randomize: true,
        clamp: true
      }),
      width: "100%"
    });
    tl_emoji_mouth.to(emoji_mouth, 1, {
      ease: Bounce.easeOut,
      yPercent: 300
    });
    tl_emoji_mouth.to(emoji_mouth, .5, {
      ease: Power0.easeIn,
      yPercent: 330,
      scale: 0
    });
  }

  // MACHINE animation
  const factory = new TimelineMax({
    repeat: -1,
    repeatDelay: 0,
    paused: true
  });
  factory.set(".conveyor", {
    transformOrigin: "50% 0vw"
  });
  factory.to(".conveyor", 0.25, {
    ease: Bounce.easeOut,
    scale: .99
  });

  // GEARWHEEL animation
  const gearwheel = new TimelineMax({
    repeat: -1,
    paused: true
  });
  gearwheel.to(".conveyor_gear", 3, {
    ease: Power0.easeNone,
    rotation: "+=360"
  });

  /*
  //////////////////////////////////////////////////////////////////////////////
  / UI
  //////////////////////////////////////////////////////////////////////////////
  */

  function reset(emoji_mood) {
    mainTL.kill();
    mainTL.restart();
    mainTL.pause();
    factory.kill();
    factory.restart();
    factory.pause();
    gearwheel.kill();
    gearwheel.restart();
    gearwheel.pause();
    tl_emoji_eyes.kill();
    tl_emoji_eyes.restart();
    tl_emoji_eyes.pause();
    tl_emoji_mouth.kill();
    tl_emoji_mouth.restart();
    tl_emoji_mouth.pause();
    emoji_face_color.css("background-color", "white");
    emoji_face.removeClass("emoji_eyes_" + emoji_mood);
    emoji_face.removeClass("emoji_" + emoji_mood);
    $("#append_eyes").remove();
    $("#append_mouth").remove();
    $(".loading_bg_eyes").css("display", "none");
    $(".loading_bg_mouth").css("display", "none");
    $('#form_button').attr("disabled", false);
    emoji_mood = "";
    emoji_color = "";
    location.reload();
  }

  function gearwheel_toggle() {
    if (gearwheel.paused()) {
      gearwheel.play();
    } else {
      gearwheel.pause();
    }
  }

  function resume() {
    if (gearwheel.paused()) {
      gearwheel.play();
    } else {
      gearwheel.pause();
    }
    mainTL.play();
  }

  // spacebar > pause
  $(document).keypress(function() {
    if (event.which == 32) {
      if (mainTL.paused()) {
        mainTL.play();
      } else {
        mainTL.pause();
      }
    }
  });

  $("#form_select_face").change(function() {
    console.log("[SELECT][MOOD]" + $("#form_select_face").val());
    emoji_mood = $("#form_select_face").val();
  });
  $("#form_select_color").change(function() {
    console.log("[SELECT][COLOR]" + $("#form_select_color").val());
    emoji_color = $("#form_select_color").val();
  });

  // FACTORY LAUNCHER
  $('#form_button').click(function() {
    emoji_mood = $("#form_select_face").val();
    emoji_color = $("#form_select_color").val();
    console.log("[FORM][clicked] " + emoji_mood + "/" + emoji_color);
    main_anim(emoji_mood, emoji_color);
    mainTL.play();
    $(this).attr("disabled", true);
  });

});
