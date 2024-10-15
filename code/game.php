<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="js/script.js"></script>
    <title>Partie en cours - Démineur</title>
</head>

<body class="bg-blur h-screen flex flex-col justify-between items-center">

    <!-- Titre -->
    <h1 class="text-6xl font-bold text-white mt-8">DES MINEURS</h1>

    <!-- Tableau du jeu Démineur -->
    <div class="flex justify-center items-center my-8">
        <table class="table-auto border-collapse bg-gray-700">
            <?php
            $difficulty = "medium";

            if ($difficulty == "easy") {
                $row = 9;
                $col = 9;
                $mines = 10;
            }

            if ($difficulty == "medium") {
                $row = 16;
                $col = 16;
                $mines = 40;
            }

            if ($difficulty == "hard") {
                $row = 16;
                $col = 30;
                $mines = 99;
            }

            echo '<div id="row" class="hidden">
            ' . $row . '
            </div>
            <div id="col" class="hidden">
            ' . $col . '
            </div>
            <div id="mines" class="hidden">
            ' . $mines . '
            </div>';

            for ($r = 0; $r < $row; $r++) {
                echo "<tr>";
                for ($c = 0; $c < $col; $c++) {
                    $randomNumber = mt_rand(1, 100);
                    if ($randomNumber <= 60) {
                        $skin = "block-1";
                    } else if ($randomNumber > 60 && $randomNumber <= 73.333) {
                        $skin = "block-2";
                    } else if ($randomNumber > 73.333 && $randomNumber <= 86.666) {
                        $skin = "block-3";
                    } else if ($randomNumber > 86.666 && $randomNumber <= 100) {
                        $skin = "block-4";
                    }
                    echo '<td class="  w-7 h-4 text-center text-white">';
                    echo '<button id="' . $r . ';' . $c . '" class="' . $skin . ' case-solid  w-full h-full" onclick="CaseBreak(' . $r . ',' . $c . ')"></button>';
                    echo "</td>";
                }
                echo "</tr>";
            }
            ?>
        </table>
    </div>

    <!-- Bouton Quitter -->
    <div class="mb-8">
        <a href="index.php" class="minecraft-btn mx-auto w-64 text-center text-white truncate p-1 pl-20 pr-20 border-2 border-b-4 hover:text-yellow-200">
            Quitter
        </a>
    </div>

</body>

</html>