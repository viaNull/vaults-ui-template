import { kv } from '@vercel/kv';
import { REDIS_KEYS } from 'src/constants/redis';

export const dynamic = 'force-dynamic';

export async function GET() {
	const apyReturnsData = await kv.hgetall(REDIS_KEYS.apyReturnsV2);
	return Response.json(apyReturnsData);
}
