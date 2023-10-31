"use client";

import Modal from "./Modal";
import Heading from "../Heading";

import useCreateProjectModal from "@/app/hooks/useCreateProjectModal"

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

import Map from "../Map";


import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";



enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    DIFFICULTY = 2,
    IMAGES = 3,
    TOOLS_TECHNOLOGIES = 5,
    DESCRIPTION = 4,
}

const CreateProjectModal = () =>{

    const createProjectModal = useCreateProjectModal()
    const router = useRouter()

    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

    const {register, handleSubmit, setValue, watch, formState: {errors}, reset} = useForm<FieldValues>({
        defaultValues:{
            category: "",
            location: null,
            description: "",
            difficulty: 1,
            imageSrc: "",
            title: "",
            tools_technologies: [""],
        }
    })

   
    const category = watch('category')
    console.log("Category: " + category)
    const location = watch("location")
    console.log("Location: " + location)
    const difficulty = watch("difficulty")
    console.log("Difficulty: " + difficulty)
    const imageSrc = watch("imageSrc")

    const Map = useMemo(() => dynamic(()=>import("../Map"), {
        ssr: false
    }), [location])

   const setCustomValue = (id:string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    const onBack = () => {
        setStep((value) => value - 1)
    };

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step != STEPS.DESCRIPTION){
            return onNext();
        }
        setIsLoading(true);

        axios.post("/api/projects", data)
        .then(() =>  {
            toast.success("Project Created!")
            router.refresh();
            reset()
            setStep(STEPS.CATEGORY)
            createProjectModal.onClose;
        })
        .catch(() => {
            toast.error("Something went wrong")
        }).finally(() =>{
            setIsLoading(false)
        })
    }

    const actionlabel = useMemo(() => {
        if (step == STEPS.DESCRIPTION){
            return "Create";
        }
        return "Next";
    }, [step])

    const secondaryActionLabel = useMemo (() =>{
        if (step == STEPS.CATEGORY){
            return undefined;
        }
        return "Back";

    }, [step])

    let bodyContent = (
    
        <div className="flex flex-col gap-8">
            <Heading 
                title="Which of these topics best describes your project?"
                subtitle="Pick a Topic">
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => ( 
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(categoryLabel) => setCustomValue("category",categoryLabel)} 
                            selected={category == item.label}
                            label={item.label}
                            icon={item.icon}>
                        </CategoryInput>
                    </div>
                ))}
            </div>
        </div>
    )
    
    if (step == STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where will your project be based?"
                    subtitle="Select a location to connect with other coders in your area! ">
                </Heading>
                <CountrySelect
                    value = {location}
                    onChange={(value) => setCustomValue("location", value)}>
                </CountrySelect>
                <Map
                    center={location?.latlng}>

                </Map>
            </div>
        )
    }
    
    if (step == STEPS.DIFFICULTY){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some details about your project"
                    subtitle="What is the level of difficulty? (Reminder: Setting the difficulty level too high may discourage other coders from joining)">
                </Heading>
                <Counter
                    title="Difficulty"
                    subtitle="Please select difficulty level 1-10"
                    value={difficulty}
                    onChange= {(value) => setCustomValue("difficulty", value)}>

                </Counter>

            </div>
        )
    }

    
    if (step == STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add Photos"
                    subtitle="Show other coders inspiration photos, mockups, theme pics, anything related that will get people excited about your project!">
                </Heading>
                <ImageUpload
                    value={imageSrc}
                    onChange= {(value) => setCustomValue("imageSrc", value)}>

                </ImageUpload>

            </div>
        )
    }

   
    if(step == STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your project idea?"
                    subtitle="Include the tools and technologies you are interested in using">
                </Heading>
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    large={false}>
                </Input>
                <hr>
                </hr>
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    large>
                </Input>

            </div>
        )
    }
    

    return(
        <Modal
            title="Create a Project"
            isOpen={createProjectModal.isOpen}
            onClose={createProjectModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionlabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
            body = {bodyContent}
            >

        </Modal>
    )
}

export default CreateProjectModal;