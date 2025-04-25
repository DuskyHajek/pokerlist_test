<?php

declare(strict_types=1);

/**
 * Reads, parses, and processes tournament data from the JSON file.
 *
 * @return array An associative array of festivals, keyed by clubid, or an empty array on error.
 */
function getFestivals(): array
{
    $jsonFilePath = __DIR__ . '/../public/tournaments_export.json'; // Assumes lib is one level above public
    $festivals = [];

    try {
        if (!file_exists($jsonFilePath)) {
            error_log("Data file not found: " . $jsonFilePath);
            return [];
        }

        $jsonData = file_get_contents($jsonFilePath);
        if ($jsonData === false) {
            error_log("Failed to read data file: " . $jsonFilePath);
            return [];
        }

        $tournaments = json_decode($jsonData, true);
        if ($tournaments === null && json_last_error() !== JSON_ERROR_NONE) {
            error_log("Failed to decode JSON: " . json_last_error_msg());
            return [];
        }

        if (!is_array($tournaments)) {
             error_log("Decoded JSON is not an array.");
             return [];
        }

        // Group tournaments by festival (clubid)
        foreach ($tournaments as $tournament) {
            if (!isset($tournament['clubid'])) {
                error_log("Tournament missing clubid: " . print_r($tournament, true));
                continue; // Skip tournaments without a clubid
            }
            $clubId = (string)$tournament['clubid']; // Ensure clubid is a string key

            // If festival doesn't exist yet, create it
            if (!isset($festivals[$clubId])) {
                 // Basic validation for required festival fields
                if (!isset($tournament['clubname']) || !isset($tournament['club_imgurl']) || 
                    !isset($tournament['club_logourl']) || !isset($tournament['club_description']) || 
                    !isset($tournament['club_city']) || !isset($tournament['club_event_duration'])) {
                    error_log("Festival data incomplete for clubid: " . $clubId);
                    continue; // Skip if essential festival info is missing
                }

                // Extract city name (handle potential variations)
                $cityParts = explode(' - ', $tournament['club_city'], 2);
                $cityName = trim($cityParts[0] ?? $tournament['club_city']); // Default to full string if ' - ' not found

                $festivals[$clubId] = [
                    'clubid' => $clubId,
                    'clubname' => $tournament['clubname'] ?? 'Unnamed Festival',
                    'club_imgurl' => $tournament['club_imgurl'] ?? '', // Provide default empty string
                    'club_logourl' => $tournament['club_logourl'] ?? '',
                    'club_description' => $tournament['club_description'] ?? '',
                    'club_city' => $cityName,
                    'club_event_duration' => $tournament['club_event_duration'] ?? '',
                    'tournaments' => []
                ];
            }

            // Add tournament to the festival (add only needed fields here)
            $festivals[$clubId]['tournaments'][] = [
                'title' => $tournament['title'] ?? 'Unnamed Tournament',
                'startdate' => $tournament['startdate'] ?? '',
                'buyin' => $tournament['buyin'] ?? '',
                'guaranteed' => $tournament['guaranteed'] ?? '',
                'currency' => $tournament['currency'] ?? '',
                // Add other tournament-specific fields if needed for the details page
            ];
        }

    } catch (\Exception $e) {
        error_log("Error processing festival data: " . $e->getMessage());
        return []; // Return empty on any exception
    }

    return $festivals;
}

/**
 * Helper function to safely output HTML content.
 *
 * @param string|null $value The value to encode.
 * @return string The HTML-safe string.
 */
function htmlEscape(?string $value): string
{
    return htmlspecialchars((string)$value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

?> 