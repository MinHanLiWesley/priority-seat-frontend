import useSWRMutation from "swr/mutation";
import { API_ROOT } from "../constants";

export type ReservationStatus = "not_paired" | "paired" | "resolved";

export interface IReservation {
  _id: string;
  status: ReservationStatus;
  assigned_seat_id: number;
}

export default function useMakeReservation() {
  const makeReservationSWR = useSWRMutation("makeReservation", async () => {
    const res = await fetch(`${API_ROOT}/reservation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await res.json()) as IReservation;
  });

  return { makeReservation: makeReservationSWR };
}
