-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2026 at 05:06 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tsr_travelers`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `visitor_token` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` enum('open','closed') NOT NULL DEFAULT 'open',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `visitor_token`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, '393c7eca-de5c-45b3-a7a1-b580fd85f4eb', NULL, 'open', '2025-12-26 02:55:40', '2025-12-26 02:55:40'),
(2, '061a07d7-8087-42aa-8f00-d30ef074d8e2', NULL, 'open', '2025-12-26 03:09:42', '2025-12-26 03:09:42'),
(3, 'f137cf17-f8af-484f-96f2-290825ba11ec', NULL, 'open', '2025-12-28 10:11:02', '2025-12-28 10:11:02');

-- --------------------------------------------------------

--
-- Table structure for table `custom_quotes`
--

CREATE TABLE `custom_quotes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `travel_date` date DEFAULT NULL,
  `guests` int(11) NOT NULL DEFAULT 1,
  `message` text DEFAULT NULL,
  `itinerary_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `name`, `country`, `city`, `description`, `images`, `created_at`, `updated_at`) VALUES
(1, 'Colombo', 'Sri Lanka', 'Colombo', NULL, NULL, '2025-12-18 06:10:27', '2025-12-18 06:10:27'),
(2, 'Kandy', 'Sri Lanka', 'Kandy', NULL, NULL, '2025-12-18 06:10:27', '2025-12-18 06:10:27'),
(3, 'Galle', 'Sri Lanka', 'Galle', NULL, NULL, '2025-12-18 06:10:27', '2025-12-18 06:10:27'),
(4, 'Anuradhapura', 'Sri Lanka', 'Anuradhapura', NULL, '[]', '2025-12-22 04:51:52', '2025-12-22 04:51:52'),
(5, 'Polonnaruwa', 'Sri Lanka', 'Polonnaruwa', NULL, '[]', '2025-12-22 04:52:11', '2025-12-22 04:52:11'),
(6, 'Sigiriya Rock Fortress', 'Sri Lanka', 'Sigiriya', NULL, '[]', '2025-12-22 04:52:39', '2025-12-22 04:52:39'),
(7, 'Dambulla Cave Temple', 'Sri Lanka', 'Dambulla', NULL, '[]', '2025-12-22 04:53:11', '2025-12-22 04:53:11'),
(8, 'Galle Fort', 'Sri Lanka', 'Gall', NULL, '[]', '2025-12-22 04:53:40', '2025-12-22 04:53:40'),
(9, 'Jaffna', 'Sri Lanka', 'Jaffna', NULL, '[]', '2025-12-22 04:53:59', '2025-12-22 04:53:59'),
(10, 'Nuwara Eliya', 'Sri Lanka', 'Nuwara Eliya', NULL, '[]', '2025-12-22 04:54:23', '2025-12-22 04:54:23'),
(11, 'Ella', 'Sri Lanka', 'Ella', NULL, '[]', '2025-12-22 04:54:38', '2025-12-22 04:54:38'),
(12, 'Haputale', 'Sri Lanka', 'Haputale', NULL, '[]', '2025-12-22 04:54:54', '2025-12-22 04:54:54'),
(13, 'Badulla', 'Sri Lanka', 'Badulla', 'Badulla is the capital city of Uva Province in southeastern Sri Lanka. Nestled in the central highlands, it serves as a key regional hub for administration, education, and tourism. The city is notable for its scenic valleys, tea plantations, and colonial-era architecture that reflect Sri Lanka’s hill-country heritage.', '[]', '2025-12-22 04:55:33', '2025-12-22 04:55:33'),
(14, 'Adam’s Peak', 'Sri Lanka', 'Hatton', 'Adam’s Peak, also known as Sri Pada (“Sacred Footprint”), is a revered mountain in central Sri Lanka. Rising to about 2,243 meters (7,359 feet), it is venerated by multiple faiths for the footprint-shaped impression near its summit, considered sacred by Buddhists, Hindus, Muslims, and Christians.', '[]', '2025-12-22 04:56:30', '2025-12-22 04:56:30'),
(15, 'Horton Plains', 'Horton Plains', 'Nuwara Eliya', 'Horton Plains is a protected plateau and national park in Sri Lanka’s central highlands, known for its unique montane ecosystem and sweeping views. It is a UNESCO World Heritage Site within the Central Highlands of Sri Lanka, drawing visitors for its biodiversity, dramatic escarpments, and cool climate.', '[]', '2025-12-22 04:57:39', '2025-12-22 04:57:39'),
(16, 'Yala National Park', 'Sri Lanka', 'Katharagama', 'Yala National Park is a protected wildlife sanctuary in southeastern Sri Lanka, renowned for its high density of leopards and diverse ecosystems. Spanning dry forests, grasslands, and lagoons, it is one of the island’s premier destinations for wildlife viewing and ecotourism.', '[]', '2025-12-22 04:58:25', '2025-12-22 04:58:25'),
(17, 'Udawalawe National Park', 'Sri Lanka', 'Udawalawa', 'Udawalawe National Park is a protected wildlife reserve in southern Sri Lanka, renowned for its large population of Asian elephants and open savannah landscapes. Established to safeguard the watershed of the Udawalawe Reservoir, it is one of the country’s most popular safari destinations and a key site for elephant observation.', '[]', '2025-12-22 04:59:02', '2025-12-22 04:59:02'),
(18, 'Wilpattu National Park', 'Sri Lanka', 'Puttalam', 'Wilpattu National Park is the largest and one of the oldest national parks in Sri Lanka, located on the island’s northwest coast near Anuradhapura and Puttalam. Renowned for its distinctive “villus” — natural lakes that collect rainwater — the park sustains diverse habitats ranging from dense scrub jungle to open grasslands.', '[]', '2025-12-22 05:00:53', '2025-12-22 05:00:53'),
(19, 'Minneriya National Park', 'Sri Lanka', 'Minneriya', 'Minneriya National Park, in Sri Lanka’s North Central Province, is a protected wildlife reserve famed for “The Gathering,” the world’s largest seasonal congregation of wild Asian elephants. Established in 1997 around the ancient Minneriya Tank, it offers visitors a rare chance to witness hundreds of elephants in one place, set against a backdrop of forest, grassland, and wetland ecosystems.', '[]', '2025-12-22 05:02:12', '2025-12-22 05:02:12'),
(20, 'Sinharaja Forest Reserve', 'Sri Lanka', 'Deniyaya,Rakwana', 'Sinharaja Forest Reserve is a tropical rainforest in southwestern Sri Lanka and one of the island’s last viable remnants of primary rainforest. It was designated a UNESCO World Heritage Site and UNESCO Biosphere Reserve for its exceptional biodiversity and ecological importance.', '[]', '2025-12-22 05:03:42', '2025-12-22 05:03:42'),
(21, 'Mirissa', 'Sri Lanka', 'Mirissa', 'Mirissa is a small coastal town and popular beach destination located in southern Sri Lanka, within the Matara District of the Southern Province (Sri Lanka). Known for its crescent-shaped beach, laid-back atmosphere, and whale-watching opportunities, Mirissa has become a key stop for travelers exploring Sri Lanka’s south coast.', '[]', '2025-12-22 05:11:52', '2025-12-22 05:11:52'),
(22, 'Unawatuna', 'Sri Lanka', 'Unawatuna', 'Unawatuna is a coastal town and popular beach destination in southern Sri Lanka, located near Galle. Known for its crescent-shaped beach and sheltered bay, it attracts both local and international travelers for swimming, snorkeling, and laid-back seaside tourism. The town combines scenic natural beauty with a vibrant hospitality scene.', '[]', '2025-12-22 05:12:18', '2025-12-22 05:12:18'),
(23, 'Bentota', 'Sri Lanka', 'Bentota', 'Bentota is a coastal resort town on the southwestern shore of Sri Lanka, renowned for its wide sandy beaches and water sports. It attracts both domestic and international visitors seeking relaxation, aquatic adventure, and luxury accommodation along the Indian Ocean.', '[]', '2025-12-22 05:12:44', '2025-12-22 05:12:44'),
(24, 'Hikkaduwa', 'Sri Lanka', 'Hikkaduwa', 'Hikkaduwa is a coastal city and resort town on Sri Lanka’s southwestern shore, about 100 km south of Colombo. It is renowned for its coral sanctuary, surf-friendly beaches, and vibrant marine life, making it one of the country’s earliest and most popular tourist destinations.', '[]', '2025-12-22 05:13:12', '2025-12-22 05:13:12'),
(25, 'Arugam Bay', 'Sri Lanka', 'Arugam Bay', 'Arugam Bay is a small coastal town and renowned surfing destination on Sri Lanka’s southeast coast, located in the Ampara District of the Eastern Province. It attracts international travelers for its consistent waves, relaxed atmosphere, and proximity to natural and cultural landmarks.', '[]', '2025-12-22 05:13:35', '2025-12-22 05:13:35'),
(26, 'Nilaveli', 'Sri Lanka', 'Nilaveli', 'Nilaveli is a coastal resort town on the northeastern shore of Sri Lanka, located about 16 kilometers north of Trincomalee. Known for its pristine white-sand beach and turquoise waters, Nilaveli is a prominent destination for seaside recreation, diving, and eco-tourism on Sri Lanka’s east coast.', '[]', '2025-12-22 05:14:00', '2025-12-22 05:14:00'),
(27, 'Pasikudah', 'Sri Lanka', 'Pasikudah', 'Pasikudah is a small coastal town on the eastern shore of Sri Lanka, famed for its shallow, crystal-clear bay and long stretch of white sand. It lies in the Batticaloa District and is one of the island’s most popular beaches for wading, swimming, and resort tourism.', '[]', '2025-12-22 05:14:27', '2025-12-22 05:14:27'),
(28, 'Kalpitiya', 'Sri Lanka', 'Kalpitiya', 'Kalpitiya is a coastal town on the Puttalam Peninsula in northwestern Sri Lanka, known for its rich marine life and scenic beaches. It has become a leading destination for dolphin and whale watching, eco-tourism, and kite surfing due to its calm lagoons and open ocean access.', '[]', '2025-12-22 05:14:55', '2025-12-22 05:14:55'),
(29, 'Knuckles Mountain Range', 'Sri Lanka', 'Kandy', 'The Knuckles Mountain Range is a rugged highland region in central Sri Lanka, recognized for its biodiversity, scenic landscapes, and popularity as a trekking destination. Named for its resemblance to a clenched fist, the range is part of the Central Highlands, a UNESCO World Heritage Site noted for endemic flora and fauna.', '[]', '2025-12-22 05:15:43', '2025-12-22 05:15:43'),
(30, 'Riverston', 'Sri Lanka', 'Kandy', 'Riverston is a scenic eco-tourism area located in the Matale District of Sri Lanka’s Central Province. Known for its panoramic views, misty mountains, and diverse biodiversity, it forms part of the Knuckles Mountain Range, a UNESCO World Heritage Site recognized for its unique cloud forests and endemic species.', '[]', '2025-12-22 05:16:54', '2025-12-22 05:16:54'),
(31, 'Kitulgala', 'Sri Lanka', 'Kitulgala', 'Kitulgala is a small town in the wet zone of western Sri Lanka, renowned as one of the country’s premier destinations for white-water rafting and eco-adventure tourism. Set along the lush banks of the Kelani River, it offers a mix of rainforest scenery, river sports, and cinematic history.', '[]', '2025-12-22 05:17:25', '2025-12-22 05:17:25'),
(32, 'Ella Rock', 'Sri Lanka', 'Ella', 'Ella Rock is a popular hiking viewpoint overlooking the town of Ella in Sri Lanka’s central highlands. Known for its panoramic views of tea plantations, mist-covered valleys, and surrounding peaks, it is one of the country’s most photographed trekking destinations and a key attraction for visitors to the hill country region.', '[]', '2025-12-22 05:18:21', '2025-12-22 05:18:21'),
(33, 'Pidurangala Rock', 'Sri Lanka', 'Sigiriya', 'Pidurangala Rock is a prominent granite outcrop in Sri Lanka’s Central Province, about 1.5 km north of Sigiriya. It is famed as the best vantage point to view the UNESCO-listed Sigiriya Rock Fortress and offers a moderately challenging 30- to 45-minute climb ending in panoramic sunrise or sunset views across the island’s “Cultural Triangle.”', '[]', '2025-12-22 05:19:02', '2025-12-22 05:19:02'),
(34, 'Negombo', 'Sri Lanka', 'Negombo', 'Negombo is a coastal city in western Sri Lanka, situated about 38 kilometers north of Colombo and near Bandaranaike International Airport. Known for its sandy beaches, fishing industry, and colonial heritage, it serves as both a tourist destination and a gateway for travelers arriving in Sri Lanka.', '[]', '2025-12-22 05:19:34', '2025-12-22 05:19:34'),
(35, 'Matara', 'Sri Lanka', 'Matara', 'Matara is a major city on the southern coast of Sri Lanka, serving as the commercial and administrative capital of the Matara District in the Southern Province (Sri Lanka). The city lies where the Nilwala River meets the Indian Ocean and is known for its historical fortifications, colonial architecture, and beaches. Matara functions as a key economic, educational, and transport hub for southern Sri Lanka.', '[]', '2025-12-22 05:20:13', '2025-12-22 05:20:13'),
(36, 'Trincomalee', 'Sri Lanka', 'Trincomalee', 'Trincomalee is a historic harbor city located on the northeast coast of Sri Lanka, overlooking one of the world’s largest natural deep-water ports. Known for its scenic beaches and cultural diversity, it has long been a strategic maritime and religious center of the island.', '[]', '2025-12-22 05:20:36', '2025-12-22 05:20:36'),
(37, 'Batticaloa', 'Sri Lanka', 'Batticaloa', 'Batticaloa is a coastal city in eastern Sri Lanka known for its scenic lagoon system and cultural diversity. Often called the “lagoon city,” it serves as the capital of the Batticaloa District and is an important center for trade, education, and tourism in the Eastern Province.', '[]', '2025-12-22 05:21:06', '2025-12-22 05:21:06');

-- --------------------------------------------------------

--
-- Table structure for table `destination_itinerary`
--

CREATE TABLE `destination_itinerary` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `destination_id` bigint(20) UNSIGNED NOT NULL,
  `itinerary_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `destination_itinerary`
--

INSERT INTO `destination_itinerary` (`id`, `destination_id`, `itinerary_id`, `created_at`, `updated_at`) VALUES
(8, 11, 10, NULL, NULL),
(9, 8, 10, NULL, NULL),
(10, 6, 10, NULL, NULL),
(11, 2, 10, NULL, NULL),
(12, 7, 10, NULL, NULL),
(13, 32, 10, NULL, NULL),
(14, 34, 10, NULL, NULL),
(15, 21, 10, NULL, NULL),
(16, 10, 10, NULL, NULL),
(17, 16, 10, NULL, NULL),
(18, 24, 10, NULL, NULL),
(19, 2, 11, NULL, NULL),
(20, 7, 11, NULL, NULL),
(21, 6, 11, NULL, NULL),
(22, 5, 11, NULL, NULL),
(23, 4, 11, NULL, NULL),
(24, 10, 11, NULL, NULL),
(25, 12, 11, NULL, NULL),
(26, 11, 11, NULL, NULL),
(27, 16, 11, NULL, NULL),
(28, 32, 11, NULL, NULL),
(29, 21, 11, NULL, NULL),
(30, 24, 11, NULL, NULL),
(31, 8, 11, NULL, NULL),
(32, 3, 11, NULL, NULL),
(33, 6, 12, NULL, NULL),
(34, 5, 12, NULL, NULL),
(35, 2, 12, NULL, NULL),
(36, 10, 12, NULL, NULL),
(37, 15, 12, NULL, NULL),
(38, 16, 12, NULL, NULL),
(39, 8, 12, NULL, NULL),
(40, 3, 12, NULL, NULL),
(41, 21, 12, NULL, NULL),
(42, 24, 12, NULL, NULL),
(43, 5, 13, NULL, NULL),
(44, 6, 13, NULL, NULL),
(45, 7, 13, NULL, NULL),
(46, 2, 13, NULL, NULL),
(47, 11, 13, NULL, NULL),
(48, 21, 13, NULL, NULL),
(49, 8, 13, NULL, NULL),
(50, 3, 13, NULL, NULL),
(51, 24, 13, NULL, NULL),
(52, 1, 13, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `location`, `rating`, `description`, `images`, `created_at`, `updated_at`) VALUES
(4, 'Amba Yaalu', 'Kandalama', '5.0', NULL, '[\"\\/storage\\/hotels\\/DpfcR6masOdAYFPCeocE1B83BItznJmgYuYLuz2f.jpg\"]', '2026-01-06 22:57:03', '2026-01-06 22:57:03');

-- --------------------------------------------------------

--
-- Table structure for table `hotel_itinerary`
--

CREATE TABLE `hotel_itinerary` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hotel_id` bigint(20) UNSIGNED NOT NULL,
  `itinerary_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `itineraries`
--

CREATE TABLE `itineraries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `day_count` int(11) DEFAULT NULL,
  `night_count` int(11) NOT NULL DEFAULT 0,
  `day_plans` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`day_plans`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `itineraries`
--

INSERT INTO `itineraries` (`id`, `title`, `description`, `images`, `created_at`, `updated_at`, `day_count`, `night_count`, `day_plans`) VALUES
(9, 'Sri Lanka Essentials: Negombo to Hikka (6 Days)', 'This 6-day Sri Lanka tour offers a perfect mix of culture, nature, and relaxing experiences. Your journey begins at the Colombo Airport, where you will travel to Sigiriya. On the first day, you will explore the ancient city of Polonnaruwa and visit beautiful silk and batik centers.', '[\"\\/storage\\/itineraries\\/J2f0jUQnNNVAEDnUVg7K4OalqzuzTDWYVV6ePTZu.png\"]', '2025-12-18 11:46:42', '2025-12-18 11:46:42', 6, 5, '[{\"day\":\"1\",\"activities\":\"sf\",\"images\":[]},{\"day\":\"2\",\"activities\":\"sdf\",\"images\":[]},{\"day\":\"3\",\"activities\":\"sdf\",\"images\":[]},{\"day\":\"4\",\"activities\":\"sdf\",\"images\":[]},{\"day\":\"5\",\"activities\":\"sdf\",\"images\":[]},{\"day\":\"6\",\"activities\":\"sdf\",\"images\":[]}]'),
(10, 'Grand Sri Lanka Explorer – 14 Days / 13 Nights', 'This 14-day Grand Sri Lanka Explorer itinerary is a carefully designed journey that showcases the very best of Sri Lanka, combining cultural heritage, breathtaking landscapes, wildlife adventures, and relaxing beach experiences. From the moment you arrive at Bandaranaike International Airport, you are warmly welcomed and guided through an unforgettable island experience.\r\n\r\nThe tour begins with relaxation on the golden beaches of Negombo, before heading inland to the cultural heart of the island. In Sigiriya, you will climb the world-famous Sigiriya Rock Fortress, enjoy village life experiences, explore traditional handicrafts, and embark on an exciting wildlife safari at nearby national parks known for their large elephant populations.\r\n\r\nThe journey continues to Kandy, a city rich in culture and history, where you experience botanical gardens, scenic viewpoints, and vibrant traditional dance performances. Moving into the hill country, Nuwara Eliya offers cool climates, lush tea plantations, waterfalls, and peaceful lake walks, giving you a refreshing change of scenery.\r\n\r\nAdventure and scenic beauty await in Ella, with hikes to Mini Adam’s Peak, Ella Rock, and visits to the iconic Nine Arch Bridge. The experience then shifts to thrilling wildlife encounters at Yala National Park, home to leopards, elephants, and diverse wildlife.\r\n\r\nThe final days are spent along Sri Lanka’s stunning southern coast in Mirissa and Galle, featuring whale watching, historic fort exploration, river safaris, and serene beach relaxation. This itinerary is ideal for travelers seeking a complete Sri Lankan experience—culture, nature, adventure, and relaxation in one unforgettable journey.', '[\"\\/storage\\/itineraries\\/WPMptz3wpTfha6nfXLoPx8X0u6tQc9wwuM5jVb4X.png\"]', '2025-12-26 01:36:10', '2025-12-26 01:36:10', 14, 13, '[{\"day\":\"1\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 01 \\u2013 Arrival & Beach Relaxation (Negombo)\\r\\n\\r\\nArrival at Bandaranaike International Airport (Katunayake)\\r\\n\\r\\nTriple SR Travel guide meets & welcomes you at the arrival gate with traditional orchid garlands\\r\\n\\r\\nTransfer directly to a nearby Negombo beach hotel\\r\\n\\r\\nRelax after your journey and enjoy the coastal atmosphere\\r\\n\\r\\nOvernight stay in Negombo\",\"images\":[]},{\"day\":\"2\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 02 \\u2013 Sigiriya Heritage & Wildlife Safari\\r\\n\\r\\nTravel to Sigiriya\\r\\n\\r\\nHotel check-in\\r\\n\\r\\nVisit Sigiriya Rock Fortress and climb the iconic Lion Rock\\r\\n\\r\\nEnjoy a Tropical Village Tour\\r\\n\\r\\nVisit Silk & Batik Centers in Sigiriya\\r\\n\\r\\nJeep safari at Minneriya National Park or Kaudulla National Park\\r\\n\\r\\nVisit an Ayurvedic Wellness Center\\r\\n\\r\\nExplore the Gem Museum\\r\\n\\r\\nOvernight stay in Sigiriya\",\"images\":[]},{\"day\":\"3\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 03 \\u2013 Journey to Kandy\\r\\n\\r\\nTravel to Kandy\\r\\n\\r\\nVisit a Sri Lankan Spice & Herbal Garden in Matale\\r\\n\\r\\nHotel check-in at Kandy\\r\\n\\r\\nLeisure evening\\r\\n\\r\\nOvernight stay in Kandy\",\"images\":[]},{\"day\":\"4\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 04 \\u2013 Culture & Nature in Kandy\\r\\n\\r\\nVisit Royal Botanical Gardens Peradeniya\\r\\n\\r\\nLunch in Kandy city\\r\\n\\r\\nVisit Kandy View Point\\r\\n\\r\\nWitness a Traditional Cultural Dance Show\\r\\n\\r\\nOvernight stay in Kandy\",\"images\":[]},{\"day\":\"5\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 05 \\u2013 Tea Country Experience (Nuwara Eliya)\\r\\n\\r\\nTravel to Nuwara Eliya\\r\\n\\r\\nVisit and experience a Tea Plantation & Tea Factory\\r\\n\\r\\nEnjoy scenic waterfalls along the route\\r\\n\\r\\nHotel check-in\\r\\n\\r\\nOvernight stay in Nuwara Eliya\",\"images\":[]},{\"day\":\"6\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 06 \\u2013 Leisure Day in Little England\\r\\n\\r\\nMorning walk around Gregory Lake\\r\\n\\r\\nVisit Lover\\u2019s Leap Waterfall\\r\\n\\r\\nRelax and enjoy the cool climate\\r\\n\\r\\nOvernight stay in Nuwara Eliya\",\"images\":[]},{\"day\":\"7\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 07 \\u2013 Scenic Drive to Ella\\r\\n\\r\\nTravel to Ella\\r\\n\\r\\nHotel check-in\\r\\n\\r\\nClimb Mini Adam\\u2019s Peak\\r\\n\\r\\nEnjoy breathtaking landscapes during the journey\\r\\n\\r\\nOvernight stay in Ella\",\"images\":[]},{\"day\":\"8\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 08 \\u2013 Adventure in Ella\\r\\n\\r\\nVisit the iconic Nine Arch Bridge\\r\\n\\r\\nClimb Ella Rock (Adventure option)\\r\\n\\r\\nRest and relax at the hotel\\r\\n\\r\\nOvernight stay in Ella\",\"images\":[]},{\"day\":\"9\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 09 \\u2013 Wildlife Safari in Yala\\r\\n\\r\\nTravel to Yala National Park\\r\\n\\r\\nVisit Ravana Waterfall\\r\\n\\r\\nEnjoy scenic landscapes en route\\r\\n\\r\\nJeep safari at Yala (2:00 PM)\\r\\n\\r\\nIf not possible, safari will be arranged next morning at 5:00 AM\\r\\n\\r\\nOvernight stay near Yala\",\"images\":[]},{\"day\":\"10\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 10 \\u2013 Beach Escape to Mirissa\\r\\n\\r\\nTravel to Mirissa\\r\\n\\r\\nHotel check-in\\r\\n\\r\\nRelax by the beach and enjoy the sun & sea\\r\\n\\r\\nEvening beachside dinner with fresh seafood\\r\\n\\r\\nOvernight stay in Mirissa\",\"images\":[]},{\"day\":\"11\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 11 \\u2013 Whale Watching & Beach Leisure\\r\\n\\r\\nWhale & Dolphin Watching excursion in the Indian Ocean\\r\\n\\r\\nFree time at the beach\\r\\n\\r\\nEnjoy a relaxing night with fresh seafood\\r\\n\\r\\nOvernight stay in Mirissa\",\"images\":[]},{\"day\":\"12\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 12 \\u2013 Colonial Heritage & Beach (Galle \\/ Hikkaduwa)\\r\\n\\r\\nTravel to Galle \\/ Hikkaduwa\\r\\n\\r\\nVisit the historic Galle Fort\\r\\n\\r\\nVisit the Turtle Hatchery\\r\\n\\r\\nHotel check-in\\r\\n\\r\\nEvening relaxation on the beach\\r\\n\\r\\nOvernight stay in Hikkaduwa\",\"images\":[]},{\"day\":\"13\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 13 \\u2013 River Safari & Relaxation\\r\\n\\r\\nLeisure time at the hotel\\r\\n\\r\\nEnjoy a River Safari at Madu River\\r\\n\\r\\nBeach relaxation\\r\\n\\r\\nOvernight stay in Hikkaduwa\",\"images\":[]},{\"day\":\"14\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 14 \\u2013 Departure\\r\\n\\r\\nTransfer to Bandaranaike International Airport, Colombo\\r\\n\\r\\nDeparture with unforgettable Sri Lankan memories \\ud83c\\uddf1\\ud83c\\uddf0\\u2728\",\"images\":[]}]'),
(11, 'Ultimate Sri Lanka Cultural, Nature & Beach Journey – 16 Days / 15 Nights', 'This 16-day Ultimate Sri Lanka journey is a complete island experience designed for travelers who want to explore Sri Lanka’s rich culture, ancient heritage, scenic hill country, wildlife, and world-famous beaches in one unforgettable tour. Beginning with your arrival at Bandaranaike International Airport, the journey takes you into the heart of the island, starting with the cultural capital, Kandy, where sacred temples, lively markets, and traditional cultural performances bring Sri Lankan heritage to life.\r\n\r\nThe tour continues into the Cultural Triangle, covering iconic ancient cities such as Dambulla, Sigiriya, Polonnaruwa, and Anuradhapura. Highlights include climbing the legendary Sigiriya Rock Fortress, exploring UNESCO-listed cave temples, experiencing village life, and discovering the spiritual roots of Buddhism at Mihintale. Wildlife encounters such as elephant experiences and scenic countryside drives add excitement and authenticity to the journey.\r\n\r\nMoving into the cool hill country, travelers will enjoy the lush tea estates and misty landscapes of Nuwara Eliya, followed by breathtaking viewpoints in Haputale and adventure-filled days in Ella, including Mini Adam’s Peak and the iconic Nine Arch Bridge.\r\n\r\nThe adventure continues with an unforgettable wildlife safari at Yala National Park, home to leopards, elephants, and diverse wildlife. The final days are spent unwinding along Sri Lanka’s stunning southern coast in Mirissa and Hikkaduwa, featuring whale watching, river safaris, coral viewing, fresh seafood, and golden beaches. The journey ends in Negombo, offering a perfect balance of exploration and relaxation before departure.\r\n\r\nThis itinerary is ideal for travelers seeking a deep, diverse, and authentic Sri Lankan experience—from ancient cities to tropical shores.', '[\"\\/storage\\/itineraries\\/wtxmJ2jRKGgwhx3SlltggRgPhG2WRTX5GjWtFymu.png\"]', '2025-12-26 01:56:49', '2025-12-26 01:56:49', 16, 15, '[{\"day\":\"1\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 01 \\u2013 Arrival & Kandy City Experience\\r\\n\\r\\nArrival at Bandaranaike International Airport (Katunayake)\\r\\n\\r\\nTravel to Kandy\\r\\n\\r\\nIf time permits, visit Pinnawala Elephant Orphanage\\r\\n\\r\\nDiscover Kandy city and local market\\r\\n\\r\\nRest and overnight stay in Kandy\",\"images\":[]},{\"day\":\"2\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 02 \\u2013 Sacred Kandy & Cultural Heritage\\r\\n\\r\\nVisit Temple of the Tooth Relic (Sri Dalada Maligawa)\\r\\n\\r\\nVisit Royal Botanical Gardens Peradeniya\\r\\n\\r\\nVisit Pinnawala Elephant Orphanage\\r\\n\\r\\nWitness the world-famous Kandy Esala Perahera (seasonal cultural event)\\r\\n\\r\\nOvernight stay in Kandy\",\"images\":[]},{\"day\":\"3\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 03 \\u2013 Dambulla & Sigiriya\\r\\n\\r\\nTravel to Dambulla\\r\\n\\r\\nHotel check-in\\r\\n\\r\\nVisit Sigiriya Rock Fortress and climb Lion Rock\\r\\n\\r\\nEnjoy a Tropical Village Tour\\r\\n\\r\\nVisit Silk & Batik Centers (Entrance Free)\\r\\n\\r\\nOvernight stay in Dambulla\",\"images\":[]},{\"day\":\"4\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 04 \\u2013 Ancient Cities & Wellness\\r\\nVisit Polonnaruwa Ancient City\\r\\n\\r\\nElephant back ride at Habarana or Sigiriya\\r\\n\\r\\nVisit an Ayurvedic Wellness Center (Entrance Free)\\r\\n\\r\\nVisit the Gem Museum (Entrance Free)\\r\\n\\r\\nVisit Dambulla Cave Temple\\r\\n\\r\\nOvernight stay in Dambulla (same hotel)\",\"images\":[]},{\"day\":\"5\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 05 \\u2013 Anuradhapura & Mihintale\\r\\n\\r\\nVisit Anuradhapura Ancient City\\r\\n\\r\\nLunch at Army Camp \\u2013 Mihintale\\r\\n\\r\\nVisit Mihintale Temple\\r\\n\\r\\nReturn to hotel in Dambulla\",\"images\":[]},{\"day\":\"6\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 06 \\u2013 Hill Country to Nuwara Eliya\\r\\n\\r\\nTravel to Nuwara Eliya via Kandy\\r\\n\\r\\nVisit Spice & Herbal Garden in Matale\\r\\n\\r\\nExperience a Tea Plantation & Factory\\r\\n\\r\\nEnjoy scenic waterfalls\\r\\n\\r\\nEvening walk at Gregory Lake\\r\\n\\r\\nOvernight stay in Nuwara Eliya\",\"images\":[]},{\"day\":\"7\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 07 \\u2013 Haputale & Ella\\r\\n\\r\\nTravel to Haputale\\r\\n\\r\\nEnjoy breathtaking landscapes\\r\\n\\r\\nContinue to Ella\\r\\n\\r\\nClimb Mini Adam\\u2019s Peak\\r\\n\\r\\nVisit Nine Arch Bridge\\r\\n\\r\\nOvernight stay in Ella\",\"images\":[]},{\"day\":\"8\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 08 \\u2013 Ella to Yala\\r\\n\\r\\nTravel to Yala National Park\\r\\n\\r\\nEnjoy scenic landscapes en route\\r\\n\\r\\nVisit Ravana Waterfall\\r\\n\\r\\nOvernight stay near Yala\",\"images\":[]},{\"day\":\"9\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 09 \\u2013 Wildlife Safari & Kataragama\\r\\n\\r\\nEarly morning safari at Yala National Park (05:00 hrs)\\r\\n\\r\\nVisit Kataragama Temple\\r\\n\\r\\nVisit Kirivehera Temple\\r\\n\\r\\nOvernight stay near Yala\",\"images\":[]},{\"day\":\"10\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 10 \\u2013 Southern Coast Escape (Mirissa)\\r\\n\\r\\nTravel to Mirissa\\r\\n\\r\\nEnjoy sun, sand, and sea at Mirissa Beach\\r\\n\\r\\nEvening beachside dinner with fresh seafood\\r\\n\\r\\nOvernight stay in Mirissa\",\"images\":[]},{\"day\":\"11\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 11 \\u2013 Whale Watching & Night Life\\r\\n\\r\\nWhale & Dolphin Watching excursion\\r\\n\\r\\nRelax at the beach\\r\\n\\r\\nNight beach visit with disco experience\\r\\n\\r\\nOvernight stay in Mirissa\",\"images\":[]},{\"day\":\"12\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 12 \\u2013 Galle & Hikkaduwa\\r\\n\\r\\nTravel to Hikkaduwa\\r\\n\\r\\nExperience Traditional Stilt Fishing\\r\\n\\r\\nVisit Galle Fort and Galle city\\r\\n\\r\\nEvening beach walk\\r\\n\\r\\nOvernight stay in Hikkaduwa\",\"images\":[]},{\"day\":\"13\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 13 \\u2013 River Safari & Conservation\\r\\n\\r\\nEnjoy Madu River Safari\\r\\n\\r\\nVisit the Turtle Hatchery\\r\\n\\r\\nRelax at the beach\\r\\n\\r\\nOvernight stay in Hikkaduwa\",\"images\":[]},{\"day\":\"14\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 14 \\u2013 Coral & Beach Leisure\\r\\nCoral watching experience\\r\\n\\r\\nEnjoy sun, sand, and sea at Hikkaduwa Beach\\r\\n\\r\\nOvernight stay in Hikkaduwa\",\"images\":[]},{\"day\":\"15\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 15 \\u2013 Colombo & Negombo Coastal Life\\r\\n\\r\\nTravel to **Negombo via Colombo\\r\\n\\r\\nVisit local fish market & fish drying area\\r\\n\\r\\nVisit Negombo Fishing Harbour\\r\\n\\r\\nOvernight stay in Negombo\",\"images\":[]},{\"day\":\"16\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 16 \\u2013 Departure\\r\\n\\r\\nTransfer to Bandaranaike International Airport (Katunayake)\\r\\n\\r\\nDeparture with unforgettable Sri Lankan memories \\ud83c\\uddf1\\ud83c\\uddf0\\u2728\",\"images\":[]}]'),
(12, 'Sri Lanka Highlights Tour – 10 Days / 9 Nights', 'This 10-day Sri Lanka Highlights Tour is thoughtfully designed to offer a perfect balance of culture, nature, wildlife, adventure, and beach relaxation, making it ideal for travelers who want to experience the island’s most iconic attractions in a comfortable time frame.\r\n\r\nYour journey begins with a warm welcome at Bandaranaike International Airport, followed by a scenic drive into the cultural heart of Sri Lanka. One of the early highlights is a visit to the famous Pinnawala Elephant Orphanage, where you can observe and interact with elephants, including feeding baby elephants. The adventure continues in the Cultural Triangle with the unforgettable climb of Sigiriya Rock Fortress, complemented by a hot air balloon experience and an exploration of the ancient city of Polonnaruwa, home to remarkable ruins and the historic Parakrama Samudra reservoir.\r\n\r\nThe tour then moves to Kandy, where you experience Sri Lankan spices, visit the Royal Botanical Gardens, explore gem craftsmanship, and enjoy a vibrant Kandyan cultural dance performance. Entering the cool hill country of Nuwara Eliya, you will discover lush tea plantations, cascading waterfalls, vegetable farms, and the dramatic landscapes of Horton Plains National Park.\r\n\r\nWildlife enthusiasts will enjoy an exciting safari at Yala National Park, before heading south to the golden beaches of Hikkaduwa. The final days are filled with unforgettable coastal experiences, including whale watching in Mirissa, traditional stilt fishing, a visit to the historic Galle Fort, a serene river safari, and time to relax by the Indian Ocean.\r\n\r\nThis itinerary offers a complete and authentic Sri Lankan experience, combining the island’s rich heritage, stunning landscapes, thrilling wildlife, and relaxing beach life into one memorable journey.', '[\"\\/storage\\/itineraries\\/NxNcGK8x4ZlDI7rGRe6AEybvz3W7Vbjn7Sg81WIK.png\"]', '2025-12-26 02:11:40', '2025-12-26 02:11:40', 10, 9, '[{\"day\":\"1\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 01 \\u2013 Arrival & Transfer\\r\\n\\r\\nSchedule: Airport Pick-Up\\r\\n\\r\\nMeet & greet at Bandaranaike International Airport\\r\\n\\r\\nTransfer to Green Palace Inn\\r\\n\\r\\nRest after arrival\\r\\n\\r\\nOvernight stay at Green Palace Inn\",\"images\":[]},{\"day\":\"2\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 02 \\u2013 Pinnawala & Sigiriya\\r\\n\\r\\nSchedule: Pinnawala \\u2013 Sigiriya\\r\\n\\r\\nTravel to Pinnawala Elephant Orphanage\\r\\n\\r\\nVisit the elephant orphanage\\r\\n\\r\\nFeed milk to baby elephants\\r\\n\\r\\nEnjoy an elephant ride\\r\\n\\r\\nTravel to Sigiriya\\r\\n\\r\\nClimb and visit Sigiriya Rock Fortress\\r\\n\\r\\nExperience a Sri Lankan Ayurvedic spa treatment\\r\\n\\r\\nOvernight stay at a hotel in Dambulla area\",\"images\":[]},{\"day\":\"3\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 03 \\u2013 Polonnaruwa & Hot Air Balloon\\r\\n\\r\\nSchedule: Polonnaruwa\\r\\n\\r\\nHot air balloon experience over the Sigiriya area (weather permitting)\\r\\n\\r\\nVisit Polonnaruwa Ancient City\\r\\n\\r\\nVisit the Parakrama Samudra (Sea of Parakrama)\\r\\n\\r\\nOvernight stay at a hotel in Dambulla area\",\"images\":[]},{\"day\":\"4\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 04 \\u2013 Kandy Cultural Experience\\r\\n\\r\\nSchedule: Kandy\\r\\n\\r\\nTravel to Kandy\\r\\n\\r\\nVisit a Spice Garden in Matale\\r\\n\\r\\nVisit Royal Botanical Gardens Peradeniya\\r\\n\\r\\nVisit the Gem Museum\\r\\n\\r\\nExperience a Kandyan Cultural Dance Show\\r\\n\\r\\nVisit Batik Factory and enjoy a Kandy Lake drive\\r\\n\\r\\nOvernight stay at a hotel in Kandy\",\"images\":[]},{\"day\":\"5\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 05 \\u2013 Nuwara Eliya (Hill Country)\\r\\n\\r\\nSchedule: Nuwara Eliya\\r\\n\\r\\nTravel to Nuwara Eliya\\r\\n\\r\\nExperience scenic waterfalls\\r\\n\\r\\nVisit Tea Plantations\\r\\n\\r\\nVisit a Tea Factory\\r\\n\\r\\nVisit local vegetable plantations\\r\\n\\r\\nOvernight stay at a hotel in Nuwara Eliya\",\"images\":[]},{\"day\":\"6\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 06 \\u2013 Horton Plains & Yala\\r\\n\\r\\nSchedule: Nuwara Eliya \\u2013 Yala\\r\\n\\r\\nEarly morning visit to Horton Plains National Park\\r\\n\\r\\nTravel to Yala National Park\\r\\n\\r\\nOvernight stay at a hotel near Yala\",\"images\":[]},{\"day\":\"7\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 07 \\u2013 Yala Safari & Beach Transfer\\r\\n\\r\\nSchedule: Yala \\u2013 Hikkaduwa\\r\\n\\r\\nSafari at Yala National Park\\r\\n\\r\\nTravel to Hikkaduwa\\r\\n\\r\\nEnjoy sunset and relaxation at Hikkaduwa Beach\\r\\n\\r\\nOvernight stay at a hotel in Hikkaduwa\",\"images\":[]},{\"day\":\"8\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 08 \\u2013 Southern Coast Experiences\\r\\n\\r\\nSchedule: Mirissa \\u2013 Galle \\u2013 Hikkaduwa\\r\\n\\r\\nWhale watching at Mirissa\\r\\n\\r\\nExperience traditional stilt fishing at Ahangama\\r\\n\\r\\nVisit Galle Fort\\r\\n\\r\\nVisit the Moonstone Mine\\r\\n\\r\\nRelax at Hikkaduwa Beach\\r\\n\\r\\nOvernight stay at a hotel in Hikkaduwa\",\"images\":[]},{\"day\":\"9\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 09 \\u2013 Nature & Conservation\\r\\n\\r\\nSchedule: Hikkaduwa\\r\\n\\r\\nMadu River Boat Safari\\r\\n\\r\\nVisit the Turtle Hatchery\\r\\n\\r\\nRelax and enjoy the beach\\r\\n\\r\\nOvernight stay at a hotel in Hikkaduwa\",\"images\":[]},{\"day\":\"10\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 10 \\u2013 Departure\\r\\n\\r\\nTransfer to Bandaranaike International Airport (Katunayake)\\r\\n\\r\\nDeparture with unforgettable Sri Lankan memories \\ud83c\\uddf1\\ud83c\\uddf0\\u2728\",\"images\":[]}]'),
(13, 'Sri Lanka Cultural, Hill Country & Beach Getaway – 10 Days / 9 Nights', 'This 10-day Sri Lanka Cultural, Hill Country & Beach Getaway is a perfectly balanced itinerary designed for travelers who wish to experience the true essence of Sri Lanka—from ancient heritage and scenic mountains to tropical beaches and coastal life.\r\n\r\nYour journey begins with arrival in Sri Lanka and travel to the Cultural Triangle, where you explore the ancient city of Polonnaruwa, showcasing remarkable ruins, reservoirs, and centuries-old engineering. In Sigiriya, you will climb the world-famous Sigiriya Rock Fortress, enjoy village-style experiences, elephant rides, traditional handicrafts, and wellness visits that introduce Sri Lanka’s Ayurvedic heritage.\r\n\r\nThe tour continues to the cultural heart of the island, Kandy, where you visit the sacred Temple of the Tooth Relic and experience the spiritual and historical importance of the city. Along the way, the journey includes the stunning Dambulla Cave Temple and fragrant spice gardens in Matale.\r\n\r\nTraveling through the misty hill country, you experience lush tea plantations in Nuwara Eliya, cascading waterfalls, and breathtaking mountain landscapes before reaching Ella. Highlights include Mini Adam’s Peak, the iconic Nine Arch Bridge, and scenic train-route views.\r\n\r\nThe final days are dedicated to relaxation along Sri Lanka’s southern coast in Mirissa and Hikkaduwa, featuring river safaris, turtle conservation visits, historic Galle Fort, beach leisure, and a Colombo city tour before departure.\r\n\r\nThis itinerary is ideal for travelers seeking a complete Sri Lankan experience—culture, nature, adventure, and relaxation combined into one unforgettable journey 🇱🇰✨', '[\"\\/storage\\/itineraries\\/c7wwZ3QQfnv4cxiFGx8goMkwCWECE6BpmW11gMzb.png\"]', '2025-12-26 02:29:27', '2025-12-26 02:29:27', 10, 9, '[{\"day\":\"1\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 01 \\u2013 Arrival & Cultural Triangle\\r\\n\\r\\nArrival at Bandaranaike International Airport\\r\\n\\r\\nTravel to Sigiriya\\r\\n\\r\\nVisit the ancient city of Polonnaruwa\\r\\n\\r\\nVisit Silk & Batik Centers in Sigiriya (Entrance Free)\\r\\n\\r\\nOvernight stay in Sigiriya\",\"images\":[]},{\"day\":\"2\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 02 \\u2013 Sigiriya Experiences\\r\\n\\r\\nClimb the iconic Sigiriya Rock Fortress\\r\\n\\r\\nEnjoy a Tropical Village Tour\\r\\n\\r\\nExperience an Elephant Back Ride\\r\\n\\r\\nVisit an Ayurvedic Wellness Center (Entrance Free)\\r\\n\\r\\nVisit the Gem Museum (Entrance Free)\\r\\n\\r\\nOvernight stay in Sigiriya\",\"images\":[]},{\"day\":\"3\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 03 \\u2013 Dambulla & Kandy\\r\\n\\r\\nTravel from Sigiriya to Kandy\\r\\n\\r\\nVisit Dambulla Cave Temple\\r\\n\\r\\nVisit a Sri Lankan Spice & Herbal Garden in Matale (Entrance Free)\\r\\n\\r\\nVisit the sacred Temple of the Tooth Relic\\r\\n\\r\\nOvernight stay in Kandy\",\"images\":[]},{\"day\":\"4\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 04 \\u2013 Scenic Hill Country to Ella\\r\\n\\r\\nTravel from Kandy to Ella\\r\\n\\r\\nVisit & experience a Tea Plantation and Factory in Nuwara Eliya\\r\\n\\r\\nEnjoy scenic waterfalls along the route\\r\\n\\r\\nClimb Mini Adam\\u2019s Peak\\r\\n\\r\\nVisit the iconic Nine Arch Bridge\\r\\n\\r\\nExperience breathtaking landscapes during the journey\\r\\n\\r\\nOvernight stay in Ella\",\"images\":[]},{\"day\":\"5\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 05 \\u2013 Ella to Mirissa\\r\\n\\r\\nTravel to Mirissa\\r\\n\\r\\nVisit Ravana Waterfall during the journey\\r\\n\\r\\nOvernight stay in Mirissa\",\"images\":[]},{\"day\":\"6\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 06 \\r\\nBeach & Coastal Experiences\\r\\n\\r\\nRelax and enjoy the beach stay\\r\\n\\r\\nVisit the Turtle Hatchery\",\"images\":[]},{\"day\":\"7\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 07 \\r\\nBeach & Coastal Experiences\\r\\n\\r\\nEnjoy a River Safari\\r\\n\\r\\nVisit the historic Galle Fort\",\"images\":[]},{\"day\":\"8\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 08 \\r\\n\\r\\nBeach & Coastal Experiences\\r\\n\\r\\nRelax at Hikkaduwa Beach\\r\\n\\r\\nOvernight stays along the southern coast\",\"images\":[]},{\"day\":\"9\",\"activities\":\"Day 09 \\u2013 Colombo City Tour\\r\\n\\r\\nTravel from Mirissa to Colombo\\r\\n\\r\\nColombo city sightseeing tour\\r\\n\\r\\nOvernight stay in Colombo or nearby\",\"images\":[]},{\"day\":\"10\",\"activities\":\"\\ud83d\\uddd3\\ufe0f Day 10 \\u2013 Departure\\r\\n\\r\\nTransfer to Bandaranaike International Airport\\r\\n\\r\\nDeparture with unforgettable Sri Lankan memories \\ud83c\\uddf1\\ud83c\\uddf0\\u2728\",\"images\":[]}]');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `conversation_id` bigint(20) UNSIGNED NOT NULL,
  `sender` enum('visitor','admin') NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 'visitor', 'hello', '2025-12-26 02:55:50', '2025-12-26 02:55:50'),
(2, 1, 'visitor', 'hii', '2025-12-26 03:03:29', '2025-12-26 03:03:29'),
(3, 2, 'visitor', 'hii, im netesha, looking tour plan', '2025-12-26 03:10:04', '2025-12-26 03:10:04');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_12_073500_create_personal_access_tokens_table', 1),
(5, '2025_11_12_084051_add_profile_fields_to_users_table', 2),
(6, '2025_11_12_084114_add_profile_fields_to_users_table', 3),
(7, '2025_11_19_062759_create_permission_tables', 4),
(8, '2025_11_19_095558_create_destinations_table', 5),
(9, '2025_11_19_095608_create_hotels_table', 5),
(10, '2025_11_19_095622_create_itineraries_table', 5),
(11, '2025_11_19_095633_create_destination_itinerary_table', 5),
(12, '2025_11_19_095645_create_hotel_itinerary_table', 5),
(13, '2025_11_19_110615_add_day_plans_to_itineraries_table', 6),
(14, '2025_11_19_140302_rename_total_days_to_day_count_and_add_night_count_to_itineraries_table', 7),
(15, '2025_11_20_044022_drop_start_date_and_end_date_from_itineraries_table', 8),
(16, '2025_11_24_053822_create_custom_quotes_table', 9),
(17, '2025_12_16_120000_update_itineraries_table_add_counts_and_day_plans', 10),
(18, '2025_12_26_000001_add_roll_to_users_table', 11),
(19, '2025_12_26_000100_create_conversations_table', 12),
(20, '2025_12_26_000101_create_messages_table', 12);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(2, 'App\\Models\\User', 6);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'api', '7f188f2a7a86c29c08d4c388ba8117b7f893ee34dd63ccb8a255cddc33128b3e', '[\"*\"]', NULL, NULL, '2025-11-12 03:06:07', '2025-11-12 03:06:07'),
(3, 'App\\Models\\User', 3, 'api', '635ecdac7610f723431daa199b017e7133af3064dee37b3a8988eb55868e196e', '[\"*\"]', NULL, NULL, '2025-11-12 09:18:53', '2025-11-12 09:18:53'),
(4, 'App\\Models\\User', 3, 'api', '9e1bad018a90d3ddf024350e31041bfed70bffabea8075c6a9ae292cae0d3635', '[\"*\"]', '2025-11-12 09:19:46', NULL, '2025-11-12 09:18:54', '2025-11-12 09:19:46'),
(5, 'App\\Models\\User', 3, 'api', 'cb19b26f05d1b6b590b60a131c6eb1d0acb1d39530700fe5f81c49413dbafd6f', '[\"*\"]', '2025-11-12 09:55:07', NULL, '2025-11-12 09:55:02', '2025-11-12 09:55:07'),
(6, 'App\\Models\\User', 4, 'api', '3ffeebbda624e73e6c7e9ac175080a76710944514c2768ae13195f6a37180d98', '[\"*\"]', NULL, NULL, '2025-11-12 10:10:41', '2025-11-12 10:10:41'),
(7, 'App\\Models\\User', 4, 'api', 'b87278e62ed6773f398c005ba46aa43bb01c8e331b37ef384af0fa802fce6fbe', '[\"*\"]', '2025-11-12 10:10:49', NULL, '2025-11-12 10:10:41', '2025-11-12 10:10:49'),
(8, 'App\\Models\\User', 5, 'api', 'c8352f3e9f7cb674701d29769a610d3828e3aecb8806c882c60cda39b167fba5', '[\"*\"]', '2025-11-12 16:20:01', NULL, '2025-11-12 16:19:59', '2025-11-12 16:20:01'),
(9, 'App\\Models\\User', 6, 'api', 'dd888a4745c13f12a595ed4cf78a84a56bf4b70a846eb6cf4f9f2dc1f2d6adb6', '[\"*\"]', '2025-11-19 03:45:40', NULL, '2025-11-19 03:44:39', '2025-11-19 03:45:40'),
(12, 'App\\Models\\User', 6, 'api', '3f0d7739d1ae170c0ac01f4cd3e00ca2859160a3afabd3cd445bac0fd23297ee', '[\"*\"]', '2025-11-19 08:30:52', NULL, '2025-11-19 03:54:40', '2025-11-19 08:30:52'),
(13, 'App\\Models\\User', 6, 'api', 'd85a63210b9099460113203e753a05b7649014727e7399f30767dab6268f9fb4', '[\"*\"]', '2025-11-19 23:37:48', NULL, '2025-11-19 23:07:49', '2025-11-19 23:37:48'),
(17, 'App\\Models\\User', 6, 'api', '038bf147b356f897d808992dc52f2752e5c307d478df64217180b4530ae96b97', '[\"*\"]', '2025-11-20 00:43:26', NULL, '2025-11-20 00:28:08', '2025-11-20 00:43:26'),
(18, 'App\\Models\\User', 6, 'api', '0fba2be30ec5465c913d881acdf6b585633283c3682e80f6a60d4088ccf9aab6', '[\"*\"]', '2025-11-20 00:45:22', NULL, '2025-11-20 00:43:51', '2025-11-20 00:45:22'),
(20, 'App\\Models\\User', 6, 'api', '92dbff6f5b2f5897401d1c72e0904f4fabc1305a7ca44298b53927881e469de1', '[\"*\"]', '2025-11-20 00:55:37', NULL, '2025-11-20 00:46:13', '2025-11-20 00:55:37'),
(22, 'App\\Models\\User', 6, 'api', 'ea68eb36dcceace537d9d7e68f72c58b48ac229241b2bb5d1b18995e3d10d806', '[\"*\"]', '2025-12-15 08:59:14', NULL, '2025-11-20 04:28:12', '2025-12-15 08:59:14'),
(23, 'App\\Models\\User', 6, 'api', '15ab9f498c62a3eb6bd6500963d80b3424c539efda1fb76004a26839406e9d47', '[\"*\"]', '2025-11-22 06:34:04', NULL, '2025-11-22 00:16:37', '2025-11-22 06:34:04'),
(24, 'App\\Models\\User', 6, 'api', 'bcbdbda8208a6454a1380bc355abe11edbbd8a1b624b16781fcd947356ed91a3', '[\"*\"]', '2025-11-22 08:12:44', NULL, '2025-11-22 06:34:19', '2025-11-22 08:12:44'),
(25, 'App\\Models\\User', 6, 'api', 'da2df64aa32e8d188d26043eca9e92649c7e108024947ed5b3badf3c5406e6ce', '[\"*\"]', '2025-11-27 01:59:14', NULL, '2025-11-25 07:42:40', '2025-11-27 01:59:14'),
(32, 'App\\Models\\User', 6, 'api', '7ba9dcfaca7f02852ba8f4ee7b4efc9b66f612577fe6cd261ce000528585557e', '[\"*\"]', '2025-11-29 03:02:32', NULL, '2025-11-29 03:02:31', '2025-11-29 03:02:32'),
(33, 'App\\Models\\User', 6, 'api', '0f12e18149ea3edef63ca7f4a64285067b37e197cf8484154deb8c2542a40351', '[\"*\"]', '2025-11-29 03:40:03', NULL, '2025-11-29 03:39:55', '2025-11-29 03:40:03'),
(34, 'App\\Models\\User', 6, 'api', 'a89073eeb0a1d52683859e181c1003e5a6a244b60c016631bbe184c4a50591ef', '[\"*\"]', '2025-11-29 04:06:41', NULL, '2025-11-29 03:53:55', '2025-11-29 04:06:41'),
(35, 'App\\Models\\User', 6, 'api', 'b543602367c0d463d07ba503e503fd12630313c52ab1fb948277454bac06c6eb', '[\"*\"]', '2025-12-15 09:15:42', NULL, '2025-12-15 09:01:06', '2025-12-15 09:15:42'),
(36, 'App\\Models\\User', 6, 'api', '450dd0b2604426120d538f50ee41338877ad7e5ef46a92b5d5da2e31c2e2ee38', '[\"*\"]', '2025-12-15 09:02:50', NULL, '2025-12-15 09:02:50', '2025-12-15 09:02:50'),
(37, 'App\\Models\\User', 6, 'api', 'c028842290ff36fbdfbd6e19594300bc25120c04e29210eaeccc98e453948be5', '[\"*\"]', '2025-12-15 10:42:05', NULL, '2025-12-15 10:37:37', '2025-12-15 10:42:05'),
(39, 'App\\Models\\User', 6, 'api', '1b1bf6821a701b06698d95548aa4c55ad9344396cc820d2a0c776aa66010616c', '[\"*\"]', '2025-12-18 12:41:43', NULL, '2025-12-18 11:44:28', '2025-12-18 12:41:43'),
(40, 'App\\Models\\User', 6, 'api', 'e290dabf935738c5828ecb4c88bb7a19ac74dae2b1738d371ecc3c294fc609f1', '[\"*\"]', '2025-12-25 23:08:21', NULL, '2025-12-25 23:00:46', '2025-12-25 23:08:21'),
(41, 'App\\Models\\User', 6, 'api', '64a65a644907b3f2745e5e8fe0e1256b1325c022e882ec6ce26360a5594a8999', '[\"*\"]', '2026-02-24 01:40:39', NULL, '2025-12-25 23:08:35', '2026-02-24 01:40:39'),
(43, 'App\\Models\\User', 6, 'api', 'c7900dd56204bdb53d62eefc170fb0757e145e2ac231a285affb759d40012c88', '[\"*\"]', '2025-12-26 01:23:13', NULL, '2025-12-26 01:18:22', '2025-12-26 01:23:13'),
(45, 'App\\Models\\User', 6, 'api', 'dfc742b8583ea38b4c2c0ba965145654776f0a9ae9381e1fda84a504de80d5d9', '[\"*\"]', '2025-12-29 01:02:05', NULL, '2025-12-28 21:40:10', '2025-12-29 01:02:05'),
(46, 'App\\Models\\User', 6, 'api', '48aa6d002e8aa0cc6d947e4af8a7435d44683ec7c1d9610dcb4557f36015c214', '[\"*\"]', '2026-01-06 23:31:30', NULL, '2026-01-06 22:50:40', '2026-01-06 23:31:30');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'superAdmin', 'web', '2025-11-19 00:59:00', '2025-11-19 00:59:00'),
(2, 'Admin', 'web', '2025-11-19 00:59:00', '2025-11-19 00:59:00'),
(3, 'site visitor', 'web', '2025-11-19 00:59:00', '2025-11-19 00:59:00');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('8MGpxaldYlYxHP03HMnyYUxctRl3H9iPY09hVlAG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYTNtMmJ3VkhtTllnYkUya1c1dXZVSlpMNmMzeDlOaFdNNGFaYUFuQSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762965100),
('96R6X1kIasv00tijnIySrnXimMfRCzIDC6VqQ9jV', NULL, '127.0.0.1', 'node', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmY1NHJXTDhzRXNMSXNKb2lFWnVRY1dURnZpb0o5bkJxeFo0NWk0MyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762962005),
('DztXpRcXvUSrieqGNePKAEwUjvyAIc08tMNvENzu', NULL, '127.0.0.1', 'node', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVVd6R3ZLalZxY1hBcjVZWjByVm9FdWlyWVdmZUZCSFhzRDd4YVFSbSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762961074),
('hMZ6KecxqCVwM7PCH1c1U6Nq7J5j7XWFW1P4urip', NULL, '127.0.0.1', 'node', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVFM1VHJZMzJsWFdJYWZod0ZmWHRaM0VoQnBLaGVteGNQREJnbWJHZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762959302),
('lQzDrYCG2EqS5kGkyXGXt5YXN9n33cPuvf2SZoPM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.6899', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicndyNWpBRmxQQmdpTzhWcG1uZEl1TG5DcUZzUW1haGhxS1RwblREUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762960027),
('NzWZgnz3RZ9LV59HwtUjMKrpWKuAB4Xv54AkNwJj', NULL, '127.0.0.1', 'node', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidWQwOExramE2bnFsa0FaSkRYZ09SZDBSZVdnZXhnUklXNmJBOVA1ZiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762959100),
('oE7XIqUFmucBR0WXjyeNP4CVfyAzcexsoPKCzsvS', NULL, '127.0.0.1', 'node', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiME5iSlJUbzJyMVcwUDZqQ1dtQkpkaXdReXFxMDRZeHNWanZVSG9pciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762959154),
('OUaDgS9W65NzdKWoFZDkeArfUMJlwemcuEKjp7SU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU3d5M01HZGhlSERLZUdTbGNnSU1kZzFUNDZNOUQ5QVpNMU5SVGdsayI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czoyNzoiZ2VuZXJhdGVkOjpMUWtyWDlXbWhtVHZ3T0hOIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764399019),
('S0VTI7wKZN6ZOKV4aPZov7Ux3Kef7h8QifgKd2Gg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQnhHZ2xzV1ViSk9TTTk0cjVyOWFNa0NVZXExb2s0bk9QSDNzdlpOZCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czoyNzoiZ2VuZXJhdGVkOjpMUWtyWDlXbWhtVHZ3T0hOIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1764399014),
('W89m7z0IAFY8NrGfSIuCSH60PcGWymqoZOPfkFp3', NULL, '127.0.0.1', 'node', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiemhTRVdCcnpSVG90WkY3dUpnbDk5U1dxSG1lRmVzalYzaEt0YTlDayI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762960601),
('YnbZzCifFbDBdBDyrlafIJmleA9Dg1AWyc6lI96n', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.6899', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNEFBREk4Vm1WeXNnSTczMGZ1Y1ozMFFRRVNFUWk1SklLZ2IwcUZXayI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762960203);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `roll` varchar(255) NOT NULL DEFAULT 'User',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `roll`, `remember_token`, `created_at`, `updated_at`, `phone`, `country`, `address`, `avatar_url`, `bio`) VALUES
(2, 'Sudhamra Hewavitharana', 'sudharma@gmail.com', NULL, '$2y$12$Dkp7zgtw8IUKRUzCT3NH6uHA5NEGQ9FUJgUhdwMdtU0N1zk2KEBw6', 'User', NULL, '2025-11-12 03:33:13', '2025-11-12 03:33:13', NULL, NULL, NULL, NULL, NULL),
(3, 'shashika Nuwan', 'shashika90nuwan@gmail.com', NULL, '$2y$12$HqnRSmP9rJLPUBwsHIapo.Mh7brij5s/bl2D7b5UDLibFcHz8MZM2', 'User', NULL, '2025-11-12 09:18:53', '2025-11-12 09:18:53', NULL, NULL, NULL, NULL, NULL),
(4, 'Diluka', 'diluka@gmail.com', NULL, '$2y$12$bqSaMLw5zU710m8tVyL/uOoFCbx0B/MHdZOsL6yLiSPRql4FpE.yS', 'User', NULL, '2025-11-12 10:10:41', '2025-11-12 10:10:41', NULL, NULL, NULL, NULL, NULL),
(5, 'nihal@gmail.com', 'nihal@gmail.co', NULL, '$2y$12$BiIuupBSFRhi6cJPmo8xC.pzxEPLcMuiC35xgBAaFOnv/tXVzZvoa', 'User', NULL, '2025-11-12 16:19:59', '2025-11-12 16:19:59', NULL, NULL, NULL, NULL, NULL),
(6, 'Admin User', 'admin@example.com', NULL, '$2y$12$G7K7x/n.CjRPY1ncdbXjauNZYXn0f3nUnP2MRSRhRbhIDMOEfUzRe', 'Admin', NULL, '2025-11-19 00:59:58', '2025-11-19 00:59:58', NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversations_user_id_foreign` (`user_id`),
  ADD KEY `conversations_visitor_token_index` (`visitor_token`);

--
-- Indexes for table `custom_quotes`
--
ALTER TABLE `custom_quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custom_quotes_itinerary_id_foreign` (`itinerary_id`);

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `destination_itinerary`
--
ALTER TABLE `destination_itinerary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_itinerary_destination_id_foreign` (`destination_id`),
  ADD KEY `destination_itinerary_itinerary_id_foreign` (`itinerary_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotel_itinerary`
--
ALTER TABLE `hotel_itinerary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_itinerary_hotel_id_foreign` (`hotel_id`),
  ADD KEY `hotel_itinerary_itinerary_id_foreign` (`itinerary_id`);

--
-- Indexes for table `itineraries`
--
ALTER TABLE `itineraries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_conversation_id_foreign` (`conversation_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `custom_quotes`
--
ALTER TABLE `custom_quotes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `destination_itinerary`
--
ALTER TABLE `destination_itinerary`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hotel_itinerary`
--
ALTER TABLE `hotel_itinerary`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `itineraries`
--
ALTER TABLE `itineraries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `custom_quotes`
--
ALTER TABLE `custom_quotes`
  ADD CONSTRAINT `custom_quotes_itinerary_id_foreign` FOREIGN KEY (`itinerary_id`) REFERENCES `itineraries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `destination_itinerary`
--
ALTER TABLE `destination_itinerary`
  ADD CONSTRAINT `destination_itinerary_destination_id_foreign` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `destination_itinerary_itinerary_id_foreign` FOREIGN KEY (`itinerary_id`) REFERENCES `itineraries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hotel_itinerary`
--
ALTER TABLE `hotel_itinerary`
  ADD CONSTRAINT `hotel_itinerary_hotel_id_foreign` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hotel_itinerary_itinerary_id_foreign` FOREIGN KEY (`itinerary_id`) REFERENCES `itineraries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_conversation_id_foreign` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
