<?php
// Set content type to XML as the source provides XML
header('Content-Type: application/xml; charset=utf-8');

// Base URLs for the external PokerList API
$baseUrlList = 'https://pokerlist.com/pl/pokerclubs.php';
$baseUrlDetail = 'https://pokerlist.com/pl/pokerclub.php';

// Client identifier (assuming it might be required/useful)
$clientId = 'pokerlist-web';

// Determine cache directory based on environment (Vercel or local)
$isVercel = getenv('VERCEL') !== false && getenv('VERCEL') !== '';
$cacheDir = $isVercel ? '/tmp' : __DIR__;
$cacheTime = 300; // 5 minutes cache duration

$url = null;
$cacheFile = null;

// --- Determine Request Type and Build URL ---

// Check for Detail request (by ID)
if (isset($_POST['id']) && !empty($_POST['id'])) {
    $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
    $url = $baseUrlDetail . '?cid=' . urlencode($clientId . '-detail') . '&id=' . urlencode($id);
    $cacheFile = $cacheDir . '/casino_detail_' . preg_replace('/[^a-zA-Z0-9_-]/', '', $id) . '.xml';
}
// Check for List request (by Country)
elseif (isset($_POST['country']) && !empty($_POST['country'])) {
    $countryCode = filter_input(INPUT_POST, 'country', FILTER_SANITIZE_STRING);
    $url = $baseUrlList . '?cid=' . urlencode($clientId . '-list') . '&country=' . urlencode($countryCode);
    $cacheFile = $cacheDir . '/casinos_' . preg_replace('/[^a-zA-Z0-9_-]/', '', $countryCode) . '.xml';
}
// Invalid request
else {
    http_response_code(400);
    echo '<?xml version="1.0" encoding="UTF-8"?><error>Missing required parameter (id or country)</error>';
    exit;
}

// --- Caching Logic ---

// Check if a valid cache file exists and is fresh
if ($cacheFile && file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
    // Serve from cache
    echo file_get_contents($cacheFile);
    exit;
}

// --- Fetch from External Source ---

if (!$url) {
    // This case should theoretically not be reached due to checks above
    http_response_code(500);
     echo '<?xml version="1.0" encoding="UTF-8"?><error>Internal error: URL not set</error>';
    exit;
}

$options = [
    'http' => [
        'method' => 'GET', // PokerList endpoints use GET
        'header' => "User-Agent: PokerListWebAppProxy/1.0\r\n" .
                    "Accept: application/xml,text/xml,*/*;q=0.8\r\n",
        'timeout' => 10, // Set a timeout (e.g., 10 seconds)
        'ignore_errors' => true // Allows fetching content even on 4xx/5xx errors to check response body
    ]
];
$context = stream_context_create($options);
$response = @file_get_contents($url, false, $context);
$http_status = $http_response_header[0] ?? 'HTTP/1.1 503 Service Unavailable'; // Default error if headers not populated

// --- Handle Response ---

// Check if the fetch was successful (HTTP 2xx status)
if ($response !== FALSE && strpos($http_status, ' 2') !== false) {
    // Save the valid response to cache
    if ($cacheFile) {
        @file_put_contents($cacheFile, $response);
    }
    // Output the response
    echo $response;
} else {
    // Fetch failed or returned non-2xx status
    http_response_code(502); // Bad Gateway seems appropriate
    
    // Log the error for debugging (optional, requires write permissions)
    // error_log("Failed to fetch from $url - Status: $http_status - Response: $response");

    // Attempt to serve stale cache if available
    if ($cacheFile && file_exists($cacheFile)) {
        echo file_get_contents($cacheFile); // Serve stale data
    } else {
        // No stale cache, return an error XML
        echo '<?xml version="1.0" encoding="UTF-8"?><error>Unable to fetch data from source. Status: ' . htmlentities($http_status) . '</error>';
    }
    exit;
}

?> 