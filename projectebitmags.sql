-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2026 a las 16:14:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `projectebitmags`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fuel_invoices`
--

CREATE TABLE `fuel_invoices` (
  `id` int(11) NOT NULL,
  `truck_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `fuel_type` enum('combustible','adblue') NOT NULL,
  `liters` decimal(10,2) NOT NULL,
  `price_per_liter` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `fuel_invoices`
--

INSERT INTO `fuel_invoices` (`id`, `truck_id`, `date`, `fuel_type`, `liters`, `price_per_liter`, `total_price`, `created_at`) VALUES
(6, 1, '2024-03-15', '', 45.20, 1.65, 74.58, '2024-03-15 13:30:00'),
(7, 2, '2024-03-16', '', 38.70, 1.82, 69.83, '2024-03-16 08:15:00'),
(8, 3, '2024-03-17', '', 60.10, 1.58, 94.96, '2024-03-17 15:20:00'),
(9, 4, '2024-03-18', '', 25.40, 1.75, 44.45, '2024-03-18 10:45:00'),
(10, 5, '2024-03-19', '', 52.80, 1.60, 84.48, '2024-03-19 12:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maintenance_invoices`
--

CREATE TABLE `maintenance_invoices` (
  `id` int(11) NOT NULL,
  `truck_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text DEFAULT NULL,
  `cost` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `maintenance_invoices`
--

INSERT INTO `maintenance_invoices` (`id`, `truck_id`, `date`, `description`, `cost`, `created_at`) VALUES
(1, 1, '2026-04-05', 'Cambio de aceite y filtro de motor', 120.50, '2026-04-22 14:12:19'),
(2, 2, '2026-04-10', 'Revisión de frenos y cambio de pastillas', 250.00, '2026-04-22 14:12:19'),
(3, 3, '2026-04-15', 'Alineación y balanceo de ruedas', 85.75, '2026-04-22 14:12:19'),
(4, 4, '2026-04-18', 'Reparación de sistema de enfriamiento', 310.20, '2026-04-22 14:12:19'),
(5, 5, '2026-04-20', 'Mantenimiento preventivo general y revisión de luces', 175.00, '2026-04-22 14:12:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `truck_id` int(11) NOT NULL,
  `start_location` varchar(255) NOT NULL,
  `end_location` varchar(255) NOT NULL,
  `distance_km` decimal(10,2) NOT NULL,
  `fuel_consumed_liters` decimal(10,2) DEFAULT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `routes`
--

INSERT INTO `routes` (`id`, `truck_id`, `start_location`, `end_location`, `distance_km`, `fuel_consumed_liters`, `date`, `created_at`) VALUES
(1, 1, 'Madrid, Centro', 'Barcelona, Zona Franca', 625.50, 95.40, '2026-04-23', '2026-04-22 14:11:22'),
(2, 2, 'Valencia, Puerto', 'Sevilla, Polígono Industrial', 840.20, 128.70, '2026-04-24', '2026-04-22 14:11:22'),
(3, 3, 'Bilbao, Indautxu', 'Zaragoza, Actur', 335.80, 52.10, '2026-04-25', '2026-04-22 14:11:22'),
(4, 1, 'Madrid, Atocha', 'Valladolid, Centro', 180.40, 27.50, '2026-04-26', '2026-04-22 14:11:22'),
(5, 4, 'Málaga, Estepona', 'Granada, Centro', 145.00, 22.30, '2026-04-26', '2026-04-22 14:11:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trucks`
--

CREATE TABLE `trucks` (
  `id` int(11) NOT NULL,
  `license_plate` varchar(20) NOT NULL,
  `model` varchar(50) DEFAULT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `trucks`
--

INSERT INTO `trucks` (`id`, `license_plate`, `model`, `driver_name`, `created_at`) VALUES
(1, 'B-1234-XYZ', 'Volvo FH16', 'Juan Pérez', '2026-04-22 14:10:43'),
(2, 'G-5678-ABC', 'Mercedes Actros', 'María García', '2026-04-22 14:10:43'),
(3, 'M-9012-DEF', 'Scania R450', 'Carlos Rodríguez', '2026-04-22 14:10:43'),
(4, 'L-3456-GHI', 'Iveco S-Way', 'Laura Martínez', '2026-04-22 14:10:43'),
(5, 'S-7890-JKL', 'MAN TGX', 'Andrés López', '2026-04-22 14:10:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUsuari` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUsuari`, `username`, `password`, `email`, `role`, `created_at`) VALUES
(1, 'usuario1', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'usuario1@ejemplo.com', 'user', '2026-04-22 14:09:18'),
(2, 'usuario2', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'usuario2@ejemplo.com', 'user', '2026-04-22 14:09:18'),
(3, 'admin_user', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@ejemplo.com', 'admin', '2026-04-22 14:09:18'),
(4, 'usuario4', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'usuario4@ejemplo.com', 'user', '2026-04-22 14:09:18'),
(5, 'usuario5', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'usuario5@ejemplo.com', 'user', '2026-04-22 14:09:18');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fuel_invoices`
--
ALTER TABLE `fuel_invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `truck_id` (`truck_id`);

--
-- Indices de la tabla `maintenance_invoices`
--
ALTER TABLE `maintenance_invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `truck_id` (`truck_id`);

--
-- Indices de la tabla `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `truck_id` (`truck_id`);

--
-- Indices de la tabla `trucks`
--
ALTER TABLE `trucks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `license_plate` (`license_plate`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUsuari`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fuel_invoices`
--
ALTER TABLE `fuel_invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `maintenance_invoices`
--
ALTER TABLE `maintenance_invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `trucks`
--
ALTER TABLE `trucks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idUsuari` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `fuel_invoices`
--
ALTER TABLE `fuel_invoices`
  ADD CONSTRAINT `fuel_invoices_ibfk_1` FOREIGN KEY (`truck_id`) REFERENCES `trucks` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `maintenance_invoices`
--
ALTER TABLE `maintenance_invoices`
  ADD CONSTRAINT `maintenance_invoices_ibfk_1` FOREIGN KEY (`truck_id`) REFERENCES `trucks` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`truck_id`) REFERENCES `trucks` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
