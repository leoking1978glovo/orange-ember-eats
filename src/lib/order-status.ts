import { createServerFn } from "@tanstack/react-start";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const getOrderStatus = createServerFn({ method: "GET" }).handler(
  async () => {
    const value = await redis.get("orders:open");
    return { open: value !== false };
  }
);

export const setOrderStatus = createServerFn({ method: "POST" })
  .validator((data: { open: boolean }) => data)
  .handler(async ({ data }) => {
    await redis.set("orders:open", data.open);
    return { open: data.open };
  });