import { kv } from "@vercel/kv";
import { REDIS_KEYS } from "@/constants/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const apyReturnsData = await kv.hgetall(REDIS_KEYS.periodApys);
  return NextResponse.json(apyReturnsData);
}
