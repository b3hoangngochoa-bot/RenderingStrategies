import { createDashboardSnapshot, wait } from "@/lib/dashboard-data";
export const dynamic = "force-dynamic";
export async function GET() { await wait(550); return Response.json(createDashboardSnapshot("CSR")); }
