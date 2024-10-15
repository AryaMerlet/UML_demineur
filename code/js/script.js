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
  ];

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

  if (event.button === 2) {
    // Right-click
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
  } else if (event.button === 0) {
    // Left-click
    for (var i = 0; i < liste_cases_nombre.length; i++) {
      if (caseClicked.classList.contains(liste_cases_nombre[i])) {
      }
      if (i === liste_cases_nombre.length - 1) {
        revealneighbours(r, c);
      }
    }
    if (caseClicked.classList.contains("case-mine")) {
      lives--;
      actualiserHearts();
      if (lives === 0) {
        alert("Game Over");
      }
      caseClicked.classList.replace("case-solid", "case-break-bomb");
      var audio = new Audio("medias/sounds/tnt-explosion.mp3");
      audio.play();
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
    var flaggedCells = document.querySelectorAll("[class*='block-drapeau-']").length;
    var correctFlags = 0;

    // Count only flags that are on mines and not revealed
    document.querySelectorAll(".case-mine").forEach(function (mine) {
        if (mine.classList.contains("block-drapeau-1") ||
            mine.classList.contains("block-drapeau-2") ||
            mine.classList.contains("block-drapeau-3") ||
            mine.classList.contains("block-drapeau-4")) {
            correctFlags++;
        }
    });

    var bombCounter = document.getElementById("bomb-counter");
    bombCounter.textContent = totalMines - revealedMines - flaggedCells;
    if (totalMines - revealedMines - correctFlags === 0) {
        alert("Victory!");
    }
}
function revealneighbours(r, c) {
    var directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
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
                var isNumbered = liste_cases_nombre.some((cls) => neighbour.classList.contains(cls));
                
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
    if (target && target.tagName === "BUTTON") {
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

    if ((randRow !== r || randCol !== c) && !plateau[randRow][randCol].aMine) {
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
