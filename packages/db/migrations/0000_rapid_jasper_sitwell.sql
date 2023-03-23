CREATE TABLE `allergens` (
	`id` char(16) PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `ingredients` (
	`id` char(16) PRIMARY KEY NOT NULL,
	`recipe_id` char(16) NOT NULL,
	`unit_id` char(16) NOT NULL,
	`name` varchar(255) NOT NULL,
	`quantity` real NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `instructions` (
	`id` char(16) PRIMARY KEY NOT NULL,
	`recipe_id` char(16) NOT NULL,
	`step` int NOT NULL,
	`description` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `recipe_allergens` (
	`recipe_id` char(16) NOT NULL,
	`allergen_id` char(16) NOT NULL);

CREATE TABLE `recipe_nutrition` (
	`id` char(16) PRIMARY KEY NOT NULL,
	`recipe_id` char(16) NOT NULL,
	`calories` real NOT NULL,
	`protein` real NOT NULL,
	`fat` real NOT NULL,
	`carbohydrates` real NOT NULL,
	`fiber` real NOT NULL,
	`sugar` real NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `recipes` (
	`id` char(16) PRIMARY KEY NOT NULL,
	`user_id` char(16) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`preparation_time` int NOT NULL,
	`cooking_time` int NOT NULL,
	`servings` int NOT NULL,
	`difficulty` enum('EASY','MEDIUM','HARD') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `units` (
	`id` char(16) PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`abbreviation` varchar(10) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `users` (
	`id` char(16) PRIMARY KEY NOT NULL,
	`clerkId` varchar(64) NOT NULL,
	`username` varchar(60) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
