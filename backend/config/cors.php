<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    // Allow both http and https, including subdomains, for your site
    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3001',
        'https://triplesrtravelers.com',
        'http://triplesrtravelers.com',
        'https://www.triplesrtravelers.com',
        'http://www.triplesrtravelers.com',
    ],
    'allowed_origins_patterns' => [
        '/^https?:\/\/(?:.*\.)?triplesrtravelers\.com$/',
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
