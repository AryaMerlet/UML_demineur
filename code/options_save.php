<?php
// options_save.php

// Récupérer le contenu brut de la requête POST
$postData = file_get_contents('php://input');

// Décoder les données JSON
$data = json_decode($postData, true);

// Vérifier si les données ont été correctement décodées
if ($data === null) {
    http_response_code(400); // Mauvaise requête
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Récupérer la difficulté et les vies depuis les données
$difficulty = $data['difficulty'] ?? null;
$lives = $data['lives'] ?? null;

if ($difficulty === null && $lives === null) {
    http_response_code(400); // Mauvaise requête
    echo json_encode(['error' => 'Missing difficulty and lives']);
    exit;
}

// Sauvegarder les données dans des cookies
if ($difficulty !== null) {
    setcookie('difficulty', $difficulty, time() + (86400 * 30), "/"); // Cookie valable 30 jours
}
if ($lives !== null) {
    setcookie('lives', $lives, time() + (86400 * 30), "/"); // Cookie valable 30 jours
}

// Retourner les données reçues
http_response_code(200); // OK
echo json_encode(['success' => true, 'options' => ['difficulty' => $difficulty, 'lives' => $lives]]);
?>
