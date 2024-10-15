<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Partie en cours - Démineur</title>
</head>
<body class="bg-blur h-screen flex flex-col justify-between items-center">

    <!-- Titre -->
    <h1 class="text-6xl font-bold text-white mt-8">DES MINEURS</h1>

    <!-- Tableau du jeu Démineur -->
    <div class="flex justify-center items-center my-8">
        <table class="table-auto border-collapse bg-gray-700">
            <?php
            $difficulty = "hard";

            if ($difficulty == "easy"){
                $row = 9;
                $col = 9;
                $mines = 10;
            }

            if ($difficulty == "medium"){
                $row = 16;
                $col = 16;
                $mines = 40;
            }

            if ($difficulty == "hard"){
                $row = 16;
                $col = 30;
                $mines = 99;
            }

            for ($i = 0; $i < $row; $i++) {
                echo "<tr>";
                for ($u = 0; $u < $col; $u++) {
                    echo '<td class="border border-gray-500 w-7 h-4 text-center text-white">';
                    echo '<button class="w-full h-full bg-gray-600 hover:bg-gray-500"></button>';
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
