DROP INDEX "products_status_idx";--> statement-breakpoint
DROP INDEX "products_organization_idx";--> statement-breakpoint
CREATE INDEX "products_status_idx" ON "products" USING btree ("status");--> statement-breakpoint
CREATE INDEX "products_organization_idx" ON "products" USING btree ("organization_id");