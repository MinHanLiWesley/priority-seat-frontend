import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { EmojiName } from "@/components/emoji";

import { API_ROOT } from "../constants";

export interface ISeat {
  emoji: null | EmojiName;
  willingness: boolean;
  accepted_reservation_id: null | number;
}

export default function useSeat({ seatId }: { seatId: number }) {
  const getSeatSWR = useSWR(
    ["seat", seatId],
    async () => {
      const res = await fetch(`${API_ROOT}/seat/${seatId}`);
      return (await res.json()) as ISeat;
    },
    {
      refreshInterval: 1000,
    }
  );

  const editSeatEmojiSWR = useSWRMutation(
    ["seat", seatId],
    async (_, { arg: { emoji } }: { arg: { emoji: string } }) => {
      const res = await fetch(`${API_ROOT}/seat/${seatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emoji,
        }),
      });

      return (await res.json()).seat as ISeat;
    }
  );

  const editSeatWillingnessSWR = useSWRMutation(
    ["seat", seatId],
    async (_, { arg: { willingness } }: { arg: { willingness: boolean } }) => {
      const res = await fetch(`${API_ROOT}/seat/${seatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          willingness,
        }),
      });

      return (await res.json()).seat as ISeat;
    }
  );

  return {
    seat: getSeatSWR,
    editSeatEmoji: editSeatEmojiSWR,
    editSeatWillingness: editSeatWillingnessSWR,
  };
}
