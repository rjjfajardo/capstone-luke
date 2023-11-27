import { PurchaseOrder, PurchaseOrderStatus } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

export interface PurchaseOrders extends PurchaseOrder {
  project: {
    title: string;
    status: string;
  };
}

export const useHooks = () => {
  const router = useRouter();
  const { data, isLoading }: { data?: PurchaseOrders[]; isLoading: boolean } =
    useSWR("/order-management");

  const orders = data?.length ? data : [];

  return {
    orders,
    router,
    isLoading,
  };
};
