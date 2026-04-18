"use client";

import { useParams } from "next/navigation";
import { MarketDetail } from "@/components/markets/MarketDetail";

export default function MarketPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return <div className="py-20 text-center text-gray-500">Invalid market ID</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <MarketDetail marketId={BigInt(id)} />
    </div>
  );
}
