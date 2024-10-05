"use client";

import Image from "next/image";

import resolvedEmoji from "@/images/resolved.png";

export default function SeatResolvedPage() {
  return (
    <div className="flex flex-col px-6">
      <div className="bg-white rounded-md shadow-sm p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">讓位已完成</h1>
        <div className="flex flex-col items-center mt-8 w-full">
          {/* <h2 className="text-xl">感謝您的使用</h2> */}
          <Image src={resolvedEmoji} alt="seat-image" className="w-72 py-14" />
          <h2 className="text-xl text-center">
            若想顯示即時狀態或讓位給他人
            <br />
            請掃描座椅上的 QR Code
          </h2>
        </div>
      </div>
    </div>
  );
}
