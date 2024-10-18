var row,
  col,
  mines,
  lives,
  is_init = false,
  liste_cases_nombre = [
    "nb-mine-1",
    "nb-mine-2",
    "nb-mine-3",
    "nb-mine-4",
    "nb-mine-5",
    "nb-mine-6",
    "nb-mine-7",
    "nb-mine-8",
  ],
  desactiver_click_droit = false;

document.addEventListener("DOMContentLoaded", function () {
  row = document.getElementById("row").textContent.trim();
  col = document.getElementById("col").textContent.trim();
  mines = document.getElementById("mines").textContent.trim();
  lives = document.querySelectorAll("#hearts img").length;
});

function CaseBreak(r, c, event) {
  if (is_init == false) {
    Initialiser(r, c);
  }
  var caseClicked = document.getElementById(r + ";" + c);

  var regexDrapeau = /block-drapeau-\d/;

  if (event.button === 2) {
    // Right-click
    if (caseClicked.classList.contains("case-solid")) {
      for (var i = 1; i <= 4; i++) {
        if (caseClicked.classList.contains("block-" + i)) {
          caseClicked.classList.replace("block-" + i, "block-drapeau-" + i);
          console.log("Flagged: " + r + ";" + c);

          break;
        } else if (caseClicked.classList.contains("block-drapeau-" + i)) {
          caseClicked.classList.replace("block-drapeau-" + i, "block-" + i);
          break;
        }
      }
      RefreshBombCount();
    }
  }

  // Vérification si la case a un drapeau
  if (regexDrapeau.test(caseClicked.className)) {
    return; // Sortir de la fonction si un drapeau est présent
  } 
  
  else if (event.button === 0) {
    // Left-click
    for (var i = 0; i < liste_cases_nombre.length; i++) {
      if (caseClicked.classList.contains(liste_cases_nombre[i])) {
      }
      if (i === liste_cases_nombre.length - 1) {
        if (
          !caseClicked.classList.contains("nb-mine-1") &&
          !caseClicked.classList.contains("nb-mine-2") &&
          !caseClicked.classList.contains("nb-mine-3") &&
          !caseClicked.classList.contains("nb-mine-4") &&
          !caseClicked.classList.contains("nb-mine-5") &&
          !caseClicked.classList.contains("nb-mine-6") &&
          !caseClicked.classList.contains("nb-mine-7") &&
          !caseClicked.classList.contains("nb-mine-8") &&
          !caseClicked.classList.contains("case-mine")
        ) {
          revealneighbours(r, c);
        }
      }
    }
    if (caseClicked.classList.contains("case-mine")) {
      lives--;
      actualiserHearts();
      if (lives === 0) {
        defaite();
      }
      caseClicked.classList.replace("case-solid", "case-break-bomb");
      var audio = new Audio("medias/sounds/tnt-explosion.mp3");
      audio.play();
      playExplosionAnimation(r, c);
    } else {
      random_audio = Math.random(1, 4);
      random_audio = Math.floor(Math.random() * 4) + 1;
      if (random_audio == 1) {
        var audio = new Audio("medias/sounds/Stone_dig.ogg");
        audio.play();
      } else if (random_audio == 2) {
        var audio = new Audio("medias/sounds/Stone_dig2.ogg");
        audio.play();
      } else if (random_audio == 3) {
        var audio = new Audio("medias/sounds/Stone_dig3.ogg");
        audio.play();
      } else if (random_audio == 4) {
        var audio = new Audio("medias/sounds/Stone_dig4.ogg");
        audio.play();
      }
      caseClicked.classList.replace("case-solid", "case-break");
    }
    caseClicked.removeAttribute("onclick");

    console.log(r + ";" + c);
  }
  RefreshBombCount();
}
function RefreshBombCount() {
  var totalMines = document.querySelectorAll(".case-mine").length;
  var revealedMines = document.querySelectorAll(".case-break-bomb").length;
  var flaggedCells = document.querySelectorAll(
    "[class*='block-drapeau-']"
  ).length;
  var correctFlags = 0;

  // Count only flags that are on mines and not revealed
  document.querySelectorAll(".case-mine").forEach(function (mine) {
    if (
      mine.classList.contains("block-drapeau-1") ||
      mine.classList.contains("block-drapeau-2") ||
      mine.classList.contains("block-drapeau-3") ||
      mine.classList.contains("block-drapeau-4")
    ) {
      correctFlags++;
    }
  });

  var bombCounter = document.getElementById("bomb-counter");
  bombCounter.textContent = totalMines - revealedMines - flaggedCells;
  if (totalMines - revealedMines - correctFlags === 0) {
    victoire();
  }
}
function revealneighbours(r, c) {
  var directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  for (var i = 0; i < directions.length; i++) {
    var newRow = r + directions[i][0];
    var newCol = c + directions[i][1];
    var neighbour = document.getElementById(newRow + ";" + newCol);

    if (
      newRow >= 0 &&
      newRow < row &&
      newCol >= 0 &&
      newCol < col &&
      neighbour
    ) {
      // Vérifier que la case n'est pas déjà révélée et n'est pas une mine
      if (
        !neighbour.classList.contains("case-mine") &&
        !neighbour.classList.contains("case-break")
      ) {
        // Révéler la case
        neighbour.classList.replace("case-solid", "case-break");
        neighbour.removeAttribute("onclick");

        // Vérifier s'il s'agit d'une case vide (sans nombre de mines autour)
        var isNumbered = liste_cases_nombre.some((cls) =>
          neighbour.classList.contains(cls)
        );

        // Si la case n'est pas numérotée (pas de mines autour), révéler les voisins
        if (!isNumbered) {
          revealneighbours(newRow, newCol);
        }
      }
    }
  }
}

function actualiserHearts() {
  var hearts = document.querySelectorAll("#hearts img");
  for (var i = 0; i < hearts.length; i++) {
    if (i < lives) {
      hearts[i].src = "medias/textures/heart_full.png";
      hearts[i].style.display = "inline";
    } else {
      hearts[i].src = "medias/textures/heart_container.png";
      hearts[i].style.display = "inline";
    }
  }
}
document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
    var target = e.target;
    if (target && target.tagName === "BUTTON" && !desactiver_click_droit) {
      var coords = target.id.split(";");
      var r = parseInt(coords[0]);
      var c = parseInt(coords[1]);
      CaseBreak(r, c, e);
    }
  },
  false
);

function Initialiser(r, c) {
  var plateau = [];
  for (var i = 0; i < row; i++) {
    plateau[i] = [];
    for (var j = 0; j < col; j++) {
      plateau[i][j] = { aMine: false };
    }
  }

  var minesPlacees = 0;
  while (minesPlacees < mines) {
    var randRow = Math.floor(Math.random() * row);
    var randCol = Math.floor(Math.random() * col);

    if (
      (randRow !== r || randCol !== c) &&
      (randRow !== r - 1 || randCol !== c - 1) &&
      (randRow !== r - 1 || randCol !== c) &&
      (randRow !== r - 1 || randCol !== c + 1) &&
      (randRow !== r || randCol !== c - 1) &&
      (randRow !== r || randCol !== c + 1) &&
      (randRow !== r + 1 || randCol !== c - 1) &&
      (randRow !== r + 1 || randCol !== c) &&
      (randRow !== r + 1 || randCol !== c + 1) &&
      !plateau[randRow][randCol].aMine
    ) {
      plateau[randRow][randCol].aMine = true;
      var cellule = document.getElementById(randRow + ";" + randCol);
      cellule.classList.add("case-mine");
      minesPlacees++;
    }
  }

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      if (!plateau[i][j].aMine) {
        var minesAdjacentes = 0;
        for (var x = -1; x <= 1; x++) {
          for (var y = -1; y <= 1; y++) {
            var newRow = i + x;
            var newCol = j + y;
            if (
              newRow >= 0 &&
              newRow < row &&
              newCol >= 0 &&
              newCol < col &&
              plateau[newRow][newCol].aMine
            ) {
              minesAdjacentes++;
            }
          }
        }
        var cellule = document.getElementById(i + ";" + j);
        if (minesAdjacentes > 0) {
          cellule.classList.add("nb-mine-" + minesAdjacentes);
        }
      }
    }
  }
  is_init = true;
}
function playExplosionAnimation(r, c) {
  var caseClicked = document.getElementById(r + ";" + c);
  var frame = 1;
  var totalFrames = 14;
  var interval = 22; // Time between frames in milliseconds

  var explosionImage = document.createElement("img");
  explosionImage.style.position = "absolute";
  explosionImage.style.top =
    caseClicked.getBoundingClientRect().top -
    caseClicked.offsetHeight / 2 +
    "px";
  explosionImage.style.left =
    caseClicked.getBoundingClientRect().left -
    caseClicked.offsetWidth / 2 +
    "px";
  explosionImage.style.width = caseClicked.offsetWidth * 2 + "px";
  explosionImage.style.height = caseClicked.offsetHeight * 2 + "px";
  document.body.appendChild(explosionImage);

  var animationInterval = setInterval(function () {
    if (frame > totalFrames) {
      clearInterval(animationInterval);
      document.body.removeChild(explosionImage); // Clear the animation
    } else {
      explosionImage.src = `medias/textures/explosions/explosion_${frame}.png`;
      frame++;
    }
  }, interval);
}

function victoire() {
  document.querySelectorAll("button").forEach(function (button) {
    button.disabled = true;
  });
  desactiver_click_droit = true;
  var victoryBox = document.createElement("div");
  victoryBox.style.position = "fixed";
  victoryBox.style.top = "5%";
  victoryBox.style.right = "-100%";
  victoryBox.style.transform = "translateY(-50%)";
  victoryBox.style.transition = "right 1s ease-in-out";
  victoryBox.style.backgroundImage =
    "url('medias/textures/victoire/title_box.png')";
  victoryBox.style.backgroundSize = "cover";
  victoryBox.style.padding = "20px";
  victoryBox.style.display = "flex";
  victoryBox.style.alignItems = "center";
  victoryBox.style.justifyContent = "center";
  victoryBox.style.zIndex = "1000";
  victoryBox.style.overflow = "hidden"; // Ensure it doesn't affect page width

  var trophyImage = document.createElement("img");
  trophyImage.src = "medias/textures/victoire/trophy.png";
  trophyImage.style.width = "50px";
  trophyImage.style.height = "50px";
  trophyImage.style.marginRight = "10px";

  var victoryText = document.createElement("span");
  victoryText.textContent = "Bravo! Vous avez gagné!";
  victoryText.style.fontSize = "20px";
  victoryText.style.color = "white";

  victoryBox.appendChild(trophyImage);
  victoryBox.appendChild(victoryText);
  document.body.appendChild(victoryBox);

  setTimeout(function () {
    victoryBox.style.right = "0%";
  }, 100);

  // setTimeout(function () {
  //   victoryBox.style.right = "-100%";
  //   setTimeout(function () {
  //     document.body.removeChild(victoryBox);
  //   }, 1000);
  // }, 5000);
  function creerPaillette() {
    const paillettesContainer = document.querySelector(".bg-blur");
    const paillette = document.createElement("img");

    paillette.classList.add("paillette");
    paillette.src = "medias/textures/victoire/diamond.png"; // Replace with the path to your image
    paillette.style.left = Math.random() * window.innerWidth + "px";
    paillette.style.animationDuration = Math.random() * 3 + 3 + "s"; // Between 3 and 6 seconds
    paillettesContainer.appendChild(paillette);
  }

  // Generate the paillettes
  const nombreDePaillettes = 100;
  for (let i = 0; i < nombreDePaillettes; i++) {
    creerPaillette();
  }
}

function defaite() {
  // Disable all buttons
  document.querySelectorAll("button").forEach(function (button) {
      button.disabled = true;
  });
  desactiver_click_droit = true;

  // Create the defeat overlay
  var defeatOverlay = document.createElement("div");
  defeatOverlay.style.position = "fixed";
  defeatOverlay.style.top = "0";
  defeatOverlay.style.left = "0";
  defeatOverlay.style.width = "100%";
  defeatOverlay.style.height = "100%";
  defeatOverlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
  defeatOverlay.style.display = "flex";
  defeatOverlay.style.flexDirection = "column";
  defeatOverlay.style.justifyContent = "center";
  defeatOverlay.style.alignItems = "center";
  defeatOverlay.style.zIndex = "1000";

  // defeat message
  var defeatMessage = document.createElement("h2");
  defeatMessage.textContent = "Vous avez perdu !";
  defeatMessage.style.color = "white";
  defeatMessage.style.fontSize = "36px";
  defeatMessage.style.marginBottom = "20px";
  defeatMessage.style.fontFamily = "minecraft";

  // replay button
  var replayButton = document.createElement("button");
  replayButton.textContent = "Rejouer";
  replayButton.className = "minecraft-btn mx-auto w-64 text-center text-white truncate mb-2 p-1 pl-20 pr-20 border-2 border-b-4 hover:text-yellow-200";
  replayButton.onclick = function() {
      location.reload();
  };

  // quit button
  var quitButton = document.createElement("button");
  quitButton.textContent = "Quitter";
  quitButton.className = "minecraft-btn mx-auto w-64 text-center text-white truncate p-1 pl-20 pr-20 border-2 border-b-4 hover:text-yellow-200";
  quitButton.onclick = function() {
      window.location.href = "index.php";
  };

  // Append elements to the overlay
  defeatOverlay.appendChild(defeatMessage);
  defeatOverlay.appendChild(replayButton);
  defeatOverlay.appendChild(quitButton);

  // Add the overlay to the body
  document.body.appendChild(defeatOverlay);
}
