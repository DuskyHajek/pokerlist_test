<?php
header('Content-Type: application/json');

// External data source
$url = 'https://www.pokerlist.com/pl/tournaments_export.php?cid=pokerlist-web&sci=yes';

// Determine cache file path based on environment
$isVercel = getenv('VERCEL') !== false && getenv('VERCEL') !== '';
$cacheFile = $isVercel ? '/tmp/events_cache.json' : __DIR__ . '/events_cache.json';

$cacheTime = 300; // 5 minutes in seconds

// Check if cache exists and is fresh
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
    // Serve from cache
    echo file_get_contents($cacheFile);
    exit;
}

// Fetch from external source
$options = [
    'http' => [
        'method' => 'GET',
        'header' => [
            'User-Agent: PHP'
        ]
    ]
];
$context = stream_context_create($options);
$response = @file_get_contents($url, false, $context);

if ($response === FALSE) {
    // On error, serve stale cache if available
    if (file_exists($cacheFile)) {
        echo file_get_contents($cacheFile);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Unable to fetch data']);
    }
    exit;
}

// Save to cache
file_put_contents($cacheFile, $response);
echo $response; 