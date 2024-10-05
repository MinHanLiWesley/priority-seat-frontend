"use client";

import Image from "next/image";
import seatImage from "@/images/seat_image.png";
import useMakeReservation from "@/lib/reservation/useMakeReservation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useReservation from "@/lib/reservation/useReservation";

export default function ReserveEntry() {
  const router = useRouter();
  const [reservationId, setReservationId] = useState<null | string>(null);

  const { makeReservation } = useMakeReservation();
  const { reservation } = useReservation({ reservationId });

  const handleReserveClick = async () => {
    const res = await makeReservation.trigger();
    setReservationId(res._id);
  };

  useEffect(() => {
    if (reservation.data?.status === "paired") {
      router.push(`/reserve/paired?reservationId=${reservation.data._id}`);
    }
  });

  return (
    <div className="flex flex-col px-6">
      <h1 className="text-3xl font-bold text-center">歡迎使用捷運讓位系統</h1>
      <div className="bg-white rounded-md shadow-sm p-8 flex flex-col items-center mt-8">
        <Image src={seatImage} alt="seat-image" className="w-40 py-14" />

        {reservationId ? (
          <>
            <h2 className="text-xl">進入配對狀態...</h2>
            <h2 className="text-lg text-center mt-6">
              配對成功後，
              <br />
              椅子將會「震動」提醒您
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-xl">點擊按鈕向車廂乘客申發出請求</h2>
            <button
              className="btn btn-lg btn-primary bg-[#4788DB] border-none w-full rounded-full mt-6 text-white"
              onClick={handleReserveClick}
            >
              申請位置
            </button>
          </>
        )}
      </div>
    </div>
  );
}
