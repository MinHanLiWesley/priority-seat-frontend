import useSWR from "swr";
import { API_ROOT } from "../constants";
import { IReservation } from "./useMakeReservation";

export default function useReservation({
  reservationId,
}: {
  reservationId: string | null;
}) {
  const getReservationSWR = useSWR(
    reservationId ? ["reservation", reservationId] : null,
    async () => {
      const res = await fetch(`${API_ROOT}/reservation/${reservationId}`);
      return (await res.json()) as IReservation;
    },
    {
      refreshInterval: 1000,
    }
  );

  return { reservation: getReservationSWR };
}
