"use client";

import Emoji, { EmojiName } from "@/components/emoji";
import useSeat from "@/lib/seat/useSeat";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import seatImage from "@/images/seat_image.png";
import Image from "next/image";

const emojis: EmojiName[] = [
  "dizzy",
  "fine",
  "happiness",
  "happy",
  "sad",
  "sick",
  "sleepy",
  "tired",
];

export default function SeatEditPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const seatId = Number(searchParams.get("seatId") ?? "1");

  const { seat, editSeatEmoji, editSeatWillingness } = useSeat({ seatId });

  const [willingnessClicked, setWillingnessClicked] = useState(false);

  const handleEmojiClick = async (name: EmojiName) => {
    editSeatEmoji.trigger(
      { emoji: name },
      { optimisticData: (cur) => ({ ...cur!, emoji: name }) }
    );
  };

  const handleWillingnessClick = () => {
    setWillingnessClicked(true);
  };

  const handleWillingnessCancelClick = () => {
    setWillingnessClicked(false);
  };

  const handleWillingnessConfirmClick = async () => {
    editSeatWillingness.trigger({ willingness: true });
  };

  useEffect(() => {
    if (seat.data?.accepted_reservation_id) {
      router.push(`/seat/paired?seatId=${seatId}`);
    }
  }, [router, seat.data?.accepted_reservation_id, seatId]);

  return (
    <div className="flex flex-col px-6">
      <h1 className="text-3xl font-bold text-center">歡迎使用捷運讓位系統</h1>
      <div className="bg-white rounded-md shadow-sm p-8 flex flex-col items-center mt-8">
        <Image src={seatImage} alt="seat-image" className="w-40" />
        <div className="flex flex-col items-center mt-8 w-full">
          {seat.data?.willingness ? (
            <>
              <h2 className="text-xl">進入配對狀態...</h2>
              <h2 className="text-lg text-center mt-6">
                配對成功後，
                <br />
                椅子將會「震動」提醒您
              </h2>
            </>
          ) : willingnessClicked ? (
            <>
              <h2 className="text-xl">確認送出？</h2>
              <div className="flex flex-row content-stretch w-full gap-4">
                <button
                  className="btn btn-lg btn-primary bg-[#4788DB] border-none rounded-full mt-6 text-white flex-1"
                  onClick={handleWillingnessConfirmClick}
                >
                  是
                </button>
                <button
                  className=" btn btn-lg btn-primary bg-[#E2E2E2] text-[#464646] border-none rounded-full mt-6 flex-1"
                  onClick={handleWillingnessCancelClick}
                >
                  否
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl">點擊讓位後系統將開始配對需求者</h2>
              <button
                className="btn btn-lg btn-primary bg-[#4788DB] border-none w-full rounded-full mt-6 text-white"
                onClick={handleWillingnessClick}
              >
                我願意讓位
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-8 items-center">
        <h2 className="text-xl font-bold text-center">
          選擇你要投放的狀況來與大家互動吧~
        </h2>
        <div className="my-6 flex flex-row justify-center gap-3 flex-wrap max-w-96 ">
          {emojis.map((name, index) => (
            <Emoji
              name={name}
              key={`${name}-${index}`}
              onClick={() => handleEmojiClick(name)}
              selected={name === seat.data?.emoji}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
