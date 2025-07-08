import { useRouter } from "next/navigation"

export function useServiceOrders() {

    const router = useRouter()

    const handleDeleteClick = async (serviceOrderId: number | undefined, productIndex: number) => {
        router.push(`/orders/service-orders/${serviceOrderId}-${productIndex}/delete`)
    }

    return {
        handleDeleteClick
    }

}