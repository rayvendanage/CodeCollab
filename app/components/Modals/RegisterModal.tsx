"use client";

import axios from "axios"
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react";
import{
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn, signOut } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false)
    const loginModal = useLoginModal();

    const {
        register, 
        handleSubmit,
        formState: {errors},

    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error("Something went wrong") //error pop up
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className = "flex flex-col gap-4">
            <Heading 
                title = {"Welcome to CodeCollab"}
                subtitle="Create an account!"
                center = {true}>
            </Heading>
            <Input
                id="name"
                label="Name"
                type="text"
                disabled={isLoading}
                register={register}
                errors={errors}
                required>
            </Input>
            <Input
                id="email"
                label="Email"
                type="text"
                disabled={isLoading}
                register={register}
                errors={errors}
                required>
            </Input>
            <Input
                id="password"
                type = "password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required>
            </Input>

        </div>
    )

    const footerContent = (
        <div className = "flex flex-col gap-4 mt-3">
            <hr></hr>
            <Button 
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn("google")}>
            </Button>
            <Button 
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn("github")}>
            </Button>
            <div className="text-neutral-500 text-center mt-4 font-ligt">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" 
                    onClick={toggle}>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title= "Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body = {bodyContent}
            footer = {footerContent}
        >
        </Modal>
    )
}

export default RegisterModal