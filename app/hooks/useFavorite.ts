import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";
import LoginModal from "../components/Modals/LoginModal";

type useFavoriteProps = {
    projectId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({projectId, currentUser} : useFavoriteProps)  => {

    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(( )=> {
        const list  = currentUser?.favoriteIds || [];

        return list.includes(projectId)

    }, [currentUser, projectId])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser){
            return loginModal.onOpen();
        }

        try{
            let request;

            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/${projectId}`);
            } else{
                request = () => axios.post(`/api/favorites/${projectId}`)
            }

            await request();
            router.refresh();
            toast.success("Success")
        }catch (error){
            toast.error("Something went wrong")
        }

    }, [currentUser, hasFavorited, projectId, LoginModal, router])

    return {hasFavorited, toggleFavorite}
}

export default useFavorite;