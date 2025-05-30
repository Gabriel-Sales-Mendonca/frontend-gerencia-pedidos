import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export function useNavigation() {

    const router = useRouter()

    const handleCheckAdminAndNavigate = (e: React.MouseEvent<HTMLButtonElement>, href: string, isAdmin: boolean) => {
        if (isAdmin) {
            router.push(href)
        } else {
            e.preventDefault()
            toast.info("Você não é ADMIN")
        }
    }

    return {
        handleCheckAdminAndNavigate
    }

}