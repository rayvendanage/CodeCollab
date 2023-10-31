'use client';
import { useEffect, useState } from "react"

type ClientOnlyProps = {
    children?: React.ReactNode;
}
//Fixes Hydration
//Checking if we are in server side rendering or not

const ClientOnly = ({children}:ClientOnlyProps) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true);
    }, [])

    //if app 
    if (!hasMounted){
        return null;
    }

    return(
        <>
            {children}
        </>

    )


 }

 export default ClientOnly;