-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2022 at 08:09 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cloud-document-processing`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `documentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `documentId`, `userId`, `content`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 1, 'created new folder', '2021-11-07 21:18:38.931', '2021-11-07 21:18:38.932', NULL),
(2, 2, 1, 'created new folder', '2021-11-07 21:19:00.886', '2021-11-07 21:19:00.887', NULL),
(3, 1, 1, 'commented', '2021-11-07 21:19:27.464', '2021-11-07 21:19:27.465', NULL),
(4, 5, 1, 'copied youtube.lua to videos folder.', '2021-11-07 21:36:52.627', '2021-11-07 21:36:52.627', NULL),
(5, 3, 1, 'moved tiger text.jpg to musics folder.', '2021-11-07 21:49:59.284', '2021-11-07 21:49:59.284', NULL),
(6, 2, 1, 'added star to videos', '2021-12-02 08:40:58.913', '2021-12-02 08:40:58.913', NULL),
(7, 7, 1, 'created new folder', '2021-12-02 08:41:26.548', '2021-12-02 08:41:26.549', NULL),
(8, 4, 1, 'added star to youtube.lua', '2021-12-02 08:41:42.900', '2021-12-02 08:41:42.901', NULL),
(9, 2, 1, 'removed star from videos', '2021-12-02 08:42:56.437', '2021-12-02 08:42:56.438', NULL),
(10, 4, 1, 'removed star from youtube.lua', '2021-12-02 08:43:00.275', '2021-12-02 08:43:00.275', NULL),
(11, 8, 1, 'created new folder', '2021-12-13 09:41:25.039', '2021-12-13 09:41:25.039', NULL),
(12, 9, 1, 'created new folder', '2021-12-13 09:41:31.023', '2021-12-13 09:41:31.023', NULL),
(13, 1, 1, 'added star to musics', '2021-12-13 09:43:25.072', '2021-12-13 09:43:25.073', NULL),
(14, 10, 1, 'created new folder', '2021-12-13 10:29:48.155', '2021-12-13 10:29:48.156', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `documentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `documentId`, `userId`, `content`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 1, 'hello.', '2021-11-07 21:19:27.412', '2021-11-07 21:24:46.840', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `mimeType` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extension` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isFolder` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `userId`, `mimeType`, `extension`, `url`, `isFolder`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, NULL, NULL, NULL, 1, '2021-11-07 21:18:38.781', '2021-11-07 21:18:38.782', NULL),
(2, 1, NULL, NULL, NULL, 1, '2021-11-07 21:19:00.828', '2021-11-07 21:19:00.829', NULL),
(3, 1, 'image/jpeg', 'jpg', '/uploads/1636320524111.jpg', 0, '2021-11-07 21:28:44.204', '2021-11-07 21:28:44.205', NULL),
(4, 1, 'application/octet-stream', 'lua', '/uploads/1636320706292.lua', 0, '2021-11-07 21:31:46.425', '2021-11-07 21:31:46.426', NULL),
(5, 1, 'application/octet-stream', 'lua', '/uploads/1636320978606.lua', 0, '2021-11-07 21:36:18.657', '2021-11-07 21:36:18.657', NULL),
(6, 1, 'application/octet-stream', 'lua', '/uploads/1636320978606.lua', 0, '2021-11-07 21:36:52.412', '2021-11-07 21:36:52.412', NULL),
(7, 1, NULL, NULL, NULL, 1, '2021-12-02 08:41:26.443', '2021-12-02 08:41:26.461', NULL),
(8, 1, NULL, NULL, NULL, 1, '2021-12-13 09:41:24.942', '2021-12-13 09:41:24.943', NULL),
(9, 1, NULL, NULL, NULL, 1, '2021-12-13 09:41:30.905', '2021-12-13 09:41:30.906', NULL),
(10, 1, NULL, NULL, NULL, 1, '2021-12-13 10:29:48.044', '2021-12-13 10:29:48.044', NULL),
(11, 1, 'image/jpeg', 'jpg', '/uploads/1639393708431.jpg', 0, '2021-12-13 11:08:28.563', '2021-12-13 11:08:28.563', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `documentversion`
--

CREATE TABLE `documentversion` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `documentId` int(11) NOT NULL,
  `folderId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` decimal(10,2) DEFAULT NULL,
  `isCurrent` tinyint(1) NOT NULL DEFAULT 1,
  `isStarred` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `documentversion`
--

INSERT INTO `documentversion` (`id`, `documentId`, `folderId`, `userId`, `name`, `size`, `isCurrent`, `isStarred`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('ckvpqmpx90006do9cvb6bu4xo', 1, NULL, 1, 'musics', NULL, 1, 1, '2021-11-07 21:18:38.781', '2021-12-13 09:43:24.882', NULL),
('ckvpqn6xn0018do9cqdbv0rfj', 2, NULL, 1, 'videos', NULL, 1, 0, '2021-11-07 21:19:00.828', '2021-12-02 08:42:56.171', NULL),
('ckvpqzp2k0132do9cjuemko6o', 3, NULL, 1, 'tiger text.jpg', '396830.00', 0, 0, '2021-11-07 21:28:44.204', '2021-11-07 21:49:59.127', NULL),
('ckvpr3lo90157do9c7hzamawt', 4, NULL, 1, 'youtube.lua', '28.00', 1, 0, '2021-11-07 21:31:46.425', '2021-12-02 08:43:00.216', NULL),
('ckvpr9fq80186do9c5jl1nt1o', 5, 1, 1, 'youtube.lua', '28.00', 1, 0, '2021-11-07 21:36:18.656', '2021-11-07 21:36:18.657', NULL),
('ckvpra5rv0239do9c5vtdgsby', 6, 2, 1, 'youtube.lua', '28.00', 1, 0, '2021-11-07 21:36:52.411', '2021-11-07 21:36:52.412', NULL),
('ckvprr0up0368do9cypjq1m6x', 3, 1, 1, 'tiger text.jpg', '396830.00', 1, 0, '2021-11-07 21:49:59.185', '2021-11-07 21:49:59.186', NULL),
('ckwopl8ru0288is9cwue98why', 7, 2, 1, 'nollywood', NULL, 1, 0, '2021-12-02 08:41:26.442', '2021-12-02 08:41:26.443', NULL),
('ckx4hkqq60046yk9ctih04cgl', 8, 1, 1, 'larry gaga', NULL, 1, 0, '2021-12-13 09:41:24.942', '2021-12-13 09:41:24.942', NULL),
('ckx4hkvbt0057yk9cx59nzwik', 9, 1, 1, '2Baba', NULL, 1, 0, '2021-12-13 09:41:30.905', '2021-12-13 09:41:30.906', NULL),
('ckx4jayru0474fo9chebnuyt7', 10, 9, 1, 'Pop', NULL, 1, 0, '2021-12-13 10:29:48.042', '2021-12-13 10:29:48.044', NULL),
('ckx4kopar0002so9cxvv3m95y', 11, NULL, 1, 'pexels-rebecca-diack-1154723.jpg', '1592871.00', 1, 0, '2021-12-13 11:08:28.563', '2021-12-13 11:08:28.563', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `refreshtoken`
--

CREATE TABLE `refreshtoken` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `userAgent` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `refreshtoken`
--

INSERT INTO `refreshtoken` (`id`, `userId`, `userAgent`, `token`, `valid`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoyLCJpYXQiOjE2MzYzMjM2ODAsImV4cCI6MTYzNjMyNzI4MCwiaXNzIjoiQ2xvdWQtRG9jdW1lbnQifQ.CVvC6vzmTbokVDnArDDqrlR0Pffsfsc0D3lHRy5T5ho', 0, '2021-11-07 21:18:14.234', '2021-11-09 15:11:36.724'),
(2, 1, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoyLCJpYXQiOjE2Mzg0MzQzNzMsImV4cCI6MTYzODQzNzk3MywiaXNzIjoiQ2xvdWQtRG9jdW1lbnQifQ.26uSioZujM_u8-3u-NrnPMNBGYBI8YFaVMZlFLo5e4M', 0, '2021-12-02 07:53:07.707', '2021-12-02 08:43:25.613'),
(3, 1, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoyLCJpYXQiOjE2Mzg0MzUwNDQsImV4cCI6MTYzODQzODY0NCwiaXNzIjoiQ2xvdWQtRG9jdW1lbnQifQ.a05XQEvxOUQlHmM-FrE0A0syxEY3qx1V8w6kXJzL_aw', 0, '2021-12-02 08:50:44.690', '2021-12-02 13:53:25.781'),
(4, 1, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoyLCJpYXQiOjE2MzkzOTQwMzIsImV4cCI6MTYzOTM5NzYzMiwiaXNzIjoiQ2xvdWQtRG9jdW1lbnQifQ.gzud5uRfdDMpLhN1LaIUSDxG7AkwpYUgljUIBP7n-JY', 0, '2021-12-13 09:38:22.962', '2021-12-13 11:16:05.981'),
(5, 1, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoyLCJpYXQiOjE2MzkzOTQyODgsImV4cCI6MTYzOTM5Nzg4OCwiaXNzIjoiQ2xvdWQtRG9jdW1lbnQifQ.Sz4TzLfNCaMu7WYdjQssssGsn-0f561pnlLl8DsV0Zc', 1, '2021-12-13 11:18:08.246', '2021-12-13 11:18:08.246'),
(6, 1, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoyLCJpYXQiOjE2MzkzOTU5MjYsImV4cCI6MTYzOTM5OTUyNiwiaXNzIjoiQ2xvdWQtRG9jdW1lbnQifQ.6pJ7ZBqTNObYjv0_Foa1VL-hag0zK6Wd-vl7Q4dDJu0', 1, '2021-12-13 11:45:26.187', '2021-12-13 11:45:26.187');

-- --------------------------------------------------------

--
-- Table structure for table `share`
--

CREATE TABLE `share` (
  `id` int(11) NOT NULL,
  `versionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `deletedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/assets/avatar.png',
  `role` int(11) NOT NULL DEFAULT 2,
  `hasVerifiedEmail` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `image`, `role`, `hasVerifiedEmail`, `createdAt`, `updatedAt`) VALUES
(1, 'jude', 'iwuji', 'xraybrain@gmail.com', '$2a$12$Mw5gQb3KOJvLdFsp9imFoOHuY5p8PfXFyTtqtFcg9jKNxV4Q7Rq6C', '/assets/avatar.png', 2, 0, '2021-11-07 21:18:00.661', '2021-11-07 21:18:00.707');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('da762267-aede-48d2-89ad-ffa23c74ee01', '84570d01616507002614e2d91387e9677731a2a3f7619b777109b3c8f2989c4b', '2021-11-07 21:17:13.861', '20211107211702_init', NULL, NULL, '2021-11-07 21:17:02.748', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Activity_documentId_fkey` (`documentId`),
  ADD KEY `Activity_userId_fkey` (`userId`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Comment_documentId_fkey` (`documentId`),
  ADD KEY `Comment_userId_fkey` (`userId`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Document_userId_fkey` (`userId`);

--
-- Indexes for table `documentversion`
--
ALTER TABLE `documentversion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `DocumentVersion_documentId_fkey` (`documentId`);

--
-- Indexes for table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RefreshToken_userId_fkey` (`userId`);

--
-- Indexes for table `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Share_versionId_fkey` (`versionId`),
  ADD KEY `Share_userId_fkey` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `share`
--
ALTER TABLE `share`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `Activity_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `document` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Activity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `Comment_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `document` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `Document_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `documentversion`
--
ALTER TABLE `documentversion`
  ADD CONSTRAINT `DocumentVersion_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `document` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `refreshtoken`
--
ALTER TABLE `refreshtoken`
  ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `share`
--
ALTER TABLE `share`
  ADD CONSTRAINT `Share_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Share_versionId_fkey` FOREIGN KEY (`versionId`) REFERENCES `documentversion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
