"use client";

import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import queryString from "query-string";
import { url } from "inspector";

type CategoryBoxProps = {
    children?: React.ReactNode;
    label: String;
    description: String;
    icon: IconType;
    selected?: boolean;

}

const CategoryBox = ({children, label, description, icon:Icon, selected} : CategoryBoxProps) => {

    const router = useRouter();
    const params = useSearchParams(); //gets parameters from url 

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if(params){
            currentQuery = queryString.parse(params.toString());
        } 

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        } //updating url params when clicked on a category

        if(params?.get("category") == label){
            delete updatedQuery.category;
        } //if category is already selected and it is selected agian delete category from params 

        const url = queryString.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, {skipNull: true});

        router.push(url);
    }, [label, params, router]);

    return (
        <div onClick = {handleClick}
            className={`flex flex-col items-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer whitespace-nowrap
            ${selected ? "border-b-neutral-800" : "border-transparent"}
            ${selected ? "text-neutral-800" : "text-neutral-500"}
        `}>
            <Icon size={26}></Icon>
            <div className="font-medium text-sm">
                {label}

            </div>


        </div>
    )
}

export default CategoryBox;