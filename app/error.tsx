"use client";

import {useEffect} from "react";
import EmptyState from "./components/EmptyState";

type ErrorStateProps = {
    error:Error
}

const ErrorState = ({error} : ErrorStateProps) => {

    useEffect(() => {
        console.error(error)
    }, [error])

    return(
        <EmptyState
            title="Uh Oh"
            subtitle="Something went wrong!">
        </EmptyState>
    )

}

export default ErrorState;
