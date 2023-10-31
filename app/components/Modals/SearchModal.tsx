"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, useCallback, use } from "react";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import queryString from "query-string";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import { categories } from "../navbar/Categories";
import Counter from "../inputs/Counter";


enum STEPS {
    LOCATION = 0,
    TOPIC = 1,
    DIFFICULTY = 2
}

const SearchModal = () => {

    const router = useRouter();
    const params = useSearchParams
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [location, setLocation] = useState<CountrySelectValue>()
    const [difficulty, setDifficulty] = useState(1)
    const [category, setCategory] = useState("Any");

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false,
    }), [location])

    const onBack = useCallback(() => {
        setStep((value) => value - 1)
    }, [])
    
    const onNext = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if(step != STEPS.DIFFICULTY){
            return onNext();
        }

        let currentQuery = {}

        if(params){
            currentQuery = queryString.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            category,
            difficulty
        };

        const url = queryString.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, {skipNull: true})

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);

    }, [step, searchModal, location, router, category, difficulty, onNext, params])


    const actionLabel = useMemo(() => {
        if(step == STEPS.DIFFICULTY){
            return "Search";
        }
        return "Next";
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step == STEPS.LOCATION){
            return undefined;
        }
        return "Back";
    }, [step])

    let bodyContent = (
        <div className = "flex flex-col gap-8">
            <Heading
                title="Where are you willing to go?"
                subtitle="Find other coders near you!">
            </Heading>
            <CountrySelect
                value={location}
                onChange={(value) => {
                    setLocation(value as CountrySelectValue)
                }}>
            </CountrySelect>
            <hr></hr>
            <Map center={location?.latlng}>

            </Map>
        </div>
    )

    if (step == STEPS.TOPIC){
        bodyContent = (
            <div className = "flex flex-col gap-8">
            <Heading
                title="What topic are you interested in?"
                subtitle="Find projects that you are passionate about!">
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => ( //Looping through each category from the array in categories.tsx
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(categoryLabel) => setCategory(categoryLabel)} //This function is sent to CategoryInput component and that component invokes the function and passes the label property
                            selected={category == item.label}
                            label={item.label} //item is a category object from the array in categories array in categories.tsx and we are getting the label value
                            icon={item.icon}>
                        </CategoryInput>
                    </div>
                ))}
            </div>
    
        </div>
        )
    }

    if(step == STEPS.DIFFICULTY){
        bodyContent = (
            <div>
                <Heading
                title="Difficulty level prefrence?"
                subtitle="Find projects for any level of expertise!">
                </Heading>
                <Counter
                    title=""
                    subtitle=""
                    value = {difficulty}
                    onChange={(value) => setDifficulty(value)}>
                </Counter>
            </div>
        )
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            body={bodyContent}
            secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel}>
            

        </Modal>
    )
}

export default SearchModal;