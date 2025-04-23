PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_urls` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`url` text NOT NULL,
	`short_url` text NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_urls`("id", "user_id", "url", "short_url", "created_at", "updated_at") SELECT "id", "user_id", "url", "short_url", "created_at", "updated_at" FROM `urls`;--> statement-breakpoint
DROP TABLE `urls`;--> statement-breakpoint
ALTER TABLE `__new_urls` RENAME TO `urls`;--> statement-breakpoint
PRAGMA foreign_keys=ON;