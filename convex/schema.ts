import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  categories: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
  }),
  videos: defineTable({
    categoryId: v.id("categories"),
    storageId: v.id("_storage"),
    title: v.optional(v.string()),
  }).index("by_category", ["categoryId"])
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
