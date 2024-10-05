"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import seatImage from "@/images/seat_image.png";
import useSeat from "@/lib/seat/useSeat";
import { useEffect } from "react";

export default function SeatPairedPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const seatId = Number(searchParams.get("seatId") ?? "1");

  const { seat } = useSeat({ seatId });

  useEffect(() => {
    if (seat && !seat.data?.accepted_reservation_id) {
      router.push(`/seat/resolved`);
    }
  }, [seat, router, seat.data?.accepted_reservation_id]);

  return (
    <div className="flex flex-col px-6">
      <div className="bg-white rounded-md shadow-sm p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">配對成功</h1>
        <Image src={seatImage} alt="seat-image" className="w-40 mt-10" />
        <div className="flex flex-col items-center mt-8 w-full">
          <h2 className="text-xl">您的座位編號為</h2>
          <p className="text-[64px]">{seatId}</p>
          <h2 className="text-xl">請耐心等候需求者前來~</h2>
        </div>
      </div>
    </div>
  );
}
