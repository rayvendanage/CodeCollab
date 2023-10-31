"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

type HeartButtonProps = {
    children: React.ReactNode;
    projectId: string;
    currentUser: SafeUser | null | undefined;
}

const HeartButton = ({children, projectId, currentUser} : HeartButtonProps) => {

    const {hasFavorited, toggleFavorite} = useFavorite({projectId, currentUser})

    return (
        <div 
            className="relative hover:opacity-80 transition cursor-pointer"
            onClick={toggleFavorite}>
            {!hasFavorited && (
                <AiOutlineHeart 
                className= "fill-white absolute -top-[2px] -right-[2px] hover:fill-rose-500"
                size ={28}>
            </AiOutlineHeart>
            )}
            {hasFavorited && (
                <AiFillHeart 
                className= "fill-rose-500"
                size={27}
                />
            )}

        </div>
    )
}

export default HeartButton;