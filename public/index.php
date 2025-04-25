<?php
require_once __DIR__ . '/../lib/data_helpers.php';

$festivals = getFestivals();

// --- Helper Functions (Consider moving to data_helpers.php if used elsewhere) ---

function formatImageUrl(string $url): string
{
    // Basic check if URL is valid, otherwise use placeholder
    if (empty($url) || !filter_var($url, FILTER_VALIDATE_URL)) {
        return '/placeholder.svg'; // Path relative to public root
    }
    return htmlEscape($url);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Poker Events</title>
    <link rel="stylesheet" href="/css/index.css">
    <link rel="stylesheet" href="/css/App.css">
    <link rel="icon" href="/favicon.ico" />
</head>
<body>
    <h1>Featured Events</h1>
    <div id="root">
        <?php if (!empty($festivals)): ?>
            <div class="poker-card-container">
                <?php foreach ($festivals as $festival): ?>
                    <div class="poker-card">
                        <a href="event_details.php?clubid=<?= htmlEscape($festival['clubid']) ?>" style="text-decoration: none; color: inherit;">
                            <img src="<?= formatImageUrl($festival['club_imgurl']) ?>" alt="<?= htmlEscape($festival['clubname']) ?> Image">
                            <h3><?= htmlEscape($festival['clubname']) ?></h3>
                            <p><?= htmlEscape($festival['club_event_duration']) ?></p>
                             <!-- Removed City, Buy-in, Guarantee as requested -->
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <p>No events found or error loading data.</p>
            <!-- You might want to check server logs for errors if this shows unexpectedly -->
        <?php endif; ?>
    </div>

    <!-- Add potential JS file link here later if needed -->
    <!-- <script src="/js/app.js"></script> -->
</body>
</html> 