import { NextResponse } from "next/server";

// placeholder API route for market data aggregation
export async function GET() {
  return NextResponse.json({
    markets: [],
    totalMarkets: 0,
    message: "Use on-chain reads via wagmi hooks for live data",
  });
}
