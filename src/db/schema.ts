import { serial, varchar,pgTable, text, json, integer, timestamp, uniqueIndex, index } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    tagline: varchar("tagline", { length: 512 }).notNull(),
    description: text("description"),
    websiteUrl: text("website_url"),
    tags: json("tags").$type<string[]>(),
    votecount: integer("votecount"),
    createdAt: timestamp("created_at", {withTimezone: true}).defaultNow(),
    approvedAt: timestamp("approved_at", {withTimezone: true}).defaultNow(),
    status: varchar("status", { length: 50 }).default("pending"),
    submittedBy: varchar("submitted_by", { length: 256 }).default("anonymous"),
    userId: varchar("user_id", { length: 256 }),
    organizationId: varchar("organization_id", { length: 256 }),
},
(table) => ({
    slugIdx: uniqueIndex("products_slug_idx").on(table.slug),
    statusIdx: index("products_status_idx").on(table.status),
    organizationIdx: index("products_organization_idx").on(table.organizationId),
}));