'use client';

import { SafeUser } from "@/app/types";
import Container from "../Container"
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

type NavBarProps = {
    children?: React.ReactNode;
    currentUser?: SafeUser | null;
}

const Navbar = ({currentUser}: NavBarProps) => {
    console.log({currentUser})
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo></Logo>
                        <Search></Search>
                        <UserMenu currentUser={currentUser}></UserMenu>
                    </div>
                </Container>
            </div>
            <Categories></Categories>
        </div>
    )
}

export default Navbar;