CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`completed` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP
);
