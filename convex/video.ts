import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listByCategory = query({
  args: {
    categoryId: v.id("categories"),
  },
  handler: async (ctx, args) => {
    const videos = await ctx.db
      .query("videos")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .collect();

    return Promise.all(
      videos.map(async (video) => ({
        ...video,
        url: await ctx.storage.getUrl(video.storageId),
      }))
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    categoryId: v.id("categories"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const category = await ctx.db.get(args.categoryId);
    if (!category) {
      throw new Error("Category not found or not authorized");
    }
    return await ctx.db.insert("videos", {
      categoryId: args.categoryId,
      storageId: args.storageId,
      title: args.title,
    });
  },
});

export const remove = mutation({
  args: {
    videoId: v.id("videos"),
  },
  handler: async (ctx, args) => {
    const video = await ctx.db.get(args.videoId);
    if (!video) {
      throw new Error("Video not found or not authorized");
    }

    await ctx.storage.delete(video.storageId);
    await ctx.db.delete(args.videoId);
  },
});
