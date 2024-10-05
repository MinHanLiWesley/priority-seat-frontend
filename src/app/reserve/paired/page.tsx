"use client";

import useReservation from "@/lib/reservation/useReservation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReservationPairedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationId = searchParams.get("reservationId") ?? "none";

  const { reservation } = useReservation({ reservationId });

  useEffect(() => {
    if (reservation.data?.status === "resolved") {
      router.push(`/reserve/resolved`);
    }
  }, [reservation.data?.status, router]);

  return (
    <div className="flex flex-col px-6">
      <div className="bg-white rounded-md shadow-sm p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">配對成功</h1>
        <div className="flex flex-col items-center mt-8 w-full">
          <h2 className="text-xl">您的座位編號為</h2>
          <p className="text-[64px]">{reservation.data?.assigned_seat_id}</p>
          <h2 className="text-xl">請前往座位亮燈處尋找你的座位~</h2>
        </div>
      </div>
    </div>
  );
}
