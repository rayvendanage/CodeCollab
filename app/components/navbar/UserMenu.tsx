'use client';

import { useCallback, useState } from "react";
import {AiOutlineMenu} from "react-icons/ai"
import {RxAvatar} from "react-icons/rx"
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useCreateProjectModal from "@/app/hooks/useCreateProjectModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

type UserMenuProps = {
    currentUser?: SafeUser | null;
}

const UserMenu = ({currentUser} : UserMenuProps) => {

    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const createProjectModal = useCreateProjectModal();


    const [isOpen, setIsOpen] = useState(false); //Setting the state of the menu 

    //useCallback is used to make sure functions are only called when a specific state variable is changed
    //useCallback makes sure function is only update when it needs to (something inside changes)
    //useCallback takes in function, and an array of dependencies (state object you are waiting to change)

    const toggleOpen = useCallback(() => setIsOpen((value) => !value), [])

    const onCreateNewProject = useCallback(() =>{

        if(!currentUser){
            return loginModal.onOpen();
        }
        //Open Create new Project modal
        createProjectModal.onOpen();

    }, [currentUser, loginModal, createProjectModal]);

    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div 
                    onClick = {onCreateNewProject}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Create a project
                </div>
                <div
                    onClick = {toggleOpen}
                    className="p-4 md:py-2 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <RxAvatar size={25}></RxAvatar>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className= "flex flex-col cursor-pointer">
                        {currentUser ? (
                        <>
                            <MenuItem 
                                onClick={() => router.push("/myProjects")} 
                                label= "My projects">
                            </MenuItem>
                            <MenuItem 
                                onClick={() => router.push("/favorites")} 
                                label= "My Favorites">
                            </MenuItem>
                            <MenuItem 
                                onClick={onCreateNewProject} 
                                label= "Create a Project">
                            </MenuItem>
                            <MenuItem 
                                onClick={() => signOut()} 
                                label= "Sign out">
                            </MenuItem>
                        </>)
                        :
                        ( <>
                            <MenuItem 
                                onClick={loginModal.onOpen} 
                                label= "Login">
                            </MenuItem>
                            <MenuItem 
                                onClick={registerModal.onOpen} 
                                label= "Sign up">
                            </MenuItem>
                        </>
                        )}
                    </div>
                </div>
            ) }
        </div>
    )
}

export default UserMenu;