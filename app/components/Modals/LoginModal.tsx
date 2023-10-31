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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false)

    const {
        register, 
        handleSubmit,
        formState: {errors},

    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        signIn("credentials", {...data,redirect: false})
        .then((callback) =>{
            setIsLoading(false);

            if (callback?.ok){
                toast.success("Logged in");
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error){
                toast.error(callback.error)
            }

        })
        
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className = "flex flex-col gap-4">
            <Heading 
                title = {"Welcome back to CodeCollab!"}
                subtitle="Login to your account"
                center = {true}>
            </Heading>
            <Input
                id="email"
                label="Email"
                type="text"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                large={false}>
            </Input>
            <Input
                id="password"
                type = "password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                large={false}>
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
                        First time using CodeCollab?
                    </div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" 
                    onClick={toggle}>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title= "Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body = {bodyContent}
            footer = {footerContent}
        >
        </Modal>
    )
}

export default LoginModal