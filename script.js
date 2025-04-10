var seq = [];
var game_on = false;
var len = 0;
var count = 0;
var level = 0;
var wrong = new Audio("sound/wrong.mp3");
var sound = ["blue", "red", "green", "yellow"];
var best = 0;
var audio = true;

function clicked(btn, duration, class_name) {
  $("#b" + btn).addClass(class_name);
  random_audio(audio);
  setTimeout(function () {
    $("#b" + btn).removeClass(class_name);
  }, duration);
}

function new_game() {
  let finalScore = level;
  seq = [];
  level = 0;
  count = 0;
  len = 0;
  $("h1")[0].innerText = "Game Over! Your score was " + finalScore;
  wrong.play();
  game_on = false;
  $("#tryAgain").show();
}

function random_audio(flag) {
  if (flag) {
    new Audio("sound/" + sound[Math.floor(Math.random() * 4)] + ".mp3").play();
  }
}

function next() {
  setTimeout(function () {
    var temp = Math.floor(Math.random() * 9 + 1);
    seq.push(temp);
    level++;
    len = level;
    if (best < level) {
      $("h1")[1].innerText = "Best Score: " + best;
      best = level;
    }
    clicked(temp, 300, "new_pressed");
    $("h1")[0].innerText = "Level " + level;
  }, 500);
}

function handleBoxClick(id) {
  clicked(id[1], 150, "pressed");
  if (id[1] == seq[count]) {
    if (count == seq.length - 1) {
      count = 0;
      next();
    } else {
      count++;
    }
  } else {
    new_game();
  }
}

$(".box").on("click touchstart", function (e) {
  e.preventDefault();
  handleBoxClick(this.id);
});

$(document).on("keydown touchstart", function (e) {
  e.preventDefault();
  if (!game_on) {
    next();
    game_on = true;
    $("h1")[0].innerText = "Level " + level;
  }
});

$("#tryAgain").on("click touchstart", function (e) {
  e.preventDefault();
  if (!game_on) {
    next();
    game_on = true;
    $("h1")[0].innerText = "Level " + level;
    $(this).hide();
  }
});