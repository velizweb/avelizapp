CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"tagline" varchar(512) NOT NULL,
	"description" text,
	"website_url" text,
	"tags" json,
	"votecount" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"approved_at" timestamp with time zone DEFAULT now(),
	"status" varchar(50) DEFAULT 'pending',
	"submitted_by" varchar(256) DEFAULT 'anonymous',
	"user_id" varchar(256),
	"organization_id" varchar(256),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "products_status_idx" ON "products" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "products_organization_idx" ON "products" USING btree ("organization_id");