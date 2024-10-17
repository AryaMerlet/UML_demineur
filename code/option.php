<?php 
// options_save.php
$options = file_get_contents('option.txt');
$difficulty = json_decode($options, true)['difficulty'] ?? 'Easy';
$lives = json_decode($options, true)['lives'] ?? 1;

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <title> Parametres des mineurs</title>
</head>

<body>
    <div class="option_nav align-center flex">
        <a href="index.php" class="minecraft-btn w-64 h-10 my-auto text-center text-white truncate p-1 pl-20 pr-20 border-2 border-b-4 hover:text-yellow-200">Retour</a>
    </div>
    <div class="option_background">
    </div>
    <div class="">
        <div class="option_container">
            <a href="index.php" class="minecraft-btn w-100 h-15 text-center text-white truncate p-4 pl-40 pr-40 border-2 border-b-4 hover:text-yellow-200 text-2xl" id="difficulty-btn">Difficulté : <?= $difficulty ?></a>
            <a href="index.php" class="minecraft-btn w-256 h-15 text-center text-white truncate p-4 pl-40 pr-40 border-2 border-b-4 hover:text-yellow-200 text-2xl" id="lives-btn">Nombre de vie : <?= $lives ?></a>
        </div>
    </div>
</body>
<script>
    document
  .querySelector("#difficulty-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const difficulties = ["Easy", "Medium", "Hard"];
    let currentDifficulty = this.textContent.split(" : ")[1];
    let nextIndex =
      (difficulties.indexOf(currentDifficulty) + 1) % difficulties.length;
    this.textContent = `Difficulté : ${difficulties[nextIndex]}`;
    let currentLives = document
      .querySelector("#lives-btn")
      .textContent.split(" : ")[1];
    fetch("options_save.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lives: currentLives,
        difficulty: difficulties[nextIndex],
      }),
    });
  });

document
  .querySelector("#lives-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const lives = [ 1, 2, 3, 4, 5, 10];
    let currentLives = parseInt(this.textContent.split(" : ")[1]);
    let nextIndex = (lives.indexOf(currentLives) + 1) % lives.length;
    this.textContent = `Nombre de vie : ${lives[nextIndex]}`;
    let currentDifficulty = document
      .querySelector("#difficulty-btn")
      .textContent.split(" : ")[1];
    fetch("options_save.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lives: lives[nextIndex],
        difficulty: currentDifficulty,
      }),
    });
  });
</script>
</html>