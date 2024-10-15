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

// Sauvegarder les données dans un fichier
$options = [];
if ($difficulty !== null) {
    $options['difficulty'] = $difficulty;
}
if ($lives !== null) {
    $options['lives'] = $lives;
}

file_put_contents('option.txt', json_encode($options));

// Retourner les données reçues
http_response_code(200); // OK
echo json_encode(['success' => true, 'options' => $options]);