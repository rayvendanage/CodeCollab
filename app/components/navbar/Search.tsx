'use client';

import {BiSearch} from "react-icons/bi"

import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useContries from "@/app/hooks/useCountries";
import { useMemo } from "react";

const Search = () =>{

    const searchModal = useSearchModal();
    const params = useSearchParams();
    const {getByValue} = useContries();

    const locationValue = params?.get("locationValue")
    const category = params?.get("category")
    const difficulty = params?.get("difficulty")

    const locationLabel = useMemo(()=> {
        if(locationValue){
            return getByValue(locationValue as string)?.label;
        }
        return "Anywhere";
    }, [getByValue, locationValue])

    const categoryLabel = useMemo(() => {
        if(category){
            return "Topic: " + category
        }
        return "Any Topic"
    }, [category])

    const difficultyLabel = useMemo(() => {
        if(difficulty){
            return "Difficulty: " + difficulty + " +"
        }
        return "Difficulty Level"
    }, [difficulty])


    return (
        <div 
            className= "border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={searchModal.onOpen}>
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationLabel}
                </div>
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {categoryLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">
                        {difficultyLabel}
                    </div>
                    <div className="p-2 bg-blue-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;