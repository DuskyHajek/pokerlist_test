<?php
require_once __DIR__ . '/../lib/data_helpers.php';

// --- Get Data & Find Specific Festival ---
$allFestivals = getFestivals();
$currentFestival = null;
$error = '';

if (isset($_GET['clubid'])) {
    $requestedClubId = (string)$_GET['clubid'];
    if (isset($allFestivals[$requestedClubId])) {
        $currentFestival = $allFestivals[$requestedClubId];
    } else {
        $error = "Festival not found.";
        // Optional: Set a 404 header
        // header("HTTP/1.0 404 Not Found"); 
    }
} else {
    $error = "No Festival ID provided.";
}

// --- Helper Functions ---

function formatImageUrl(string $url, string $default = '/placeholder.svg'): string
{
    if (empty($url) || !filter_var($url, FILTER_VALIDATE_URL)) {
        return $default; 
    }
    return htmlEscape($url);
}

function formatTournamentDate(string $dateString): string
{
    if (empty($dateString)) return 'N/A';
    try {
        $date = new \DateTime($dateString);
        return $date->format('D, M j, Y g:i A T'); // e.g., Fri, Apr 25, 2025 2:00 PM CEST
    } catch (\Exception $e) {
        error_log("Error formatting date: {$dateString} - " . $e->getMessage());
        return htmlEscape($dateString); // Return original string on error
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $currentFestival ? htmlEscape($currentFestival['clubname']) : 'Event Details' ?></title>
    <link rel="stylesheet" href="/css/index.css">
    <link rel="stylesheet" href="/css/App.css">
    <link rel="icon" href="/favicon.ico" />
</head>
<body>
    
    <div id="root">
        <?php if ($currentFestival): ?>
            <div class="festival-details-container">
                <div class="festival-header">
                    <div class="festival-logo">
                        <img src="<?= formatImageUrl($currentFestival['club_logourl']) ?>" alt="<?= htmlEscape($currentFestival['clubname']) ?> Logo">
                    </div>
                    <div class="festival-info">
                        <h1><?= htmlEscape($currentFestival['clubname']) ?></h1>
                        <p><strong>Casino:</strong> <?= htmlEscape($currentFestival['club_description']) ?></p>
                        <p><strong>City:</strong> <?= htmlEscape($currentFestival['club_city']) ?></p>
                        <p><strong>Duration:</strong> <?= htmlEscape($currentFestival['club_event_duration']) ?></p>
                    </div>
                </div>

                <div class="tournaments-list">
                    <h2>Tournaments</h2>
                    <?php if (!empty($currentFestival['tournaments'])): ?>
                        <?php foreach ($currentFestival['tournaments'] as $tournament): ?>
                            <div class="tournament-item">
                                <h3><?= htmlEscape($tournament['title']) ?></h3>
                                <div class="tournament-details">
                                    <p><strong>Start:</strong> <?= formatTournamentDate($tournament['startdate']) ?></p>
                                    <?php if (!empty($tournament['buyin'])): ?>
                                        <p><strong>Buy-in:</strong> <?= htmlEscape($tournament['buyin']) ?> <?= htmlEscape($tournament['currency']) ?></p>
                                    <?php endif; ?>
                                    <?php if (!empty($tournament['guaranteed'])): ?>
                                        <p><strong>Guarantee:</strong> <?= htmlEscape($tournament['guaranteed']) ?> <?= htmlEscape($tournament['currency']) ?></p>
                                    <?php endif; ?>
                                     <!-- Add other details if needed -->
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <p>No specific tournaments listed for this festival.</p>
                    <?php endif; ?>
                </div>
                 <p><a href="/">Back to Events List</a></p> 
            </div>
        <?php else: ?>
             <div class="festival-details-container">
                 <h1>Error</h1>
                 <p><?= htmlEscape($error) ?></p>
                 <p><a href="/">Back to Events List</a></p> 
             </div>
        <?php endif; ?>
    </div>
    
    <!-- Add potential JS file link here later if needed -->
    <!-- <script src="/js/app.js"></script> -->
</body>
</html> 