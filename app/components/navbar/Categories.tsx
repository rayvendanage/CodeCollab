'use client';

import Container from "../Container";
import CategoryBox from "../CategoryBox";


import {FaMobileAlt, FaLaptop, FaCloud, FaRobot} from "react-icons/fa";
import {BsDatabaseFill, BsFillPersonFill} from "react-icons/bs"
import {IoGameController, IoHardwareChip} from "react-icons/io5"
import {VscShield} from "react-icons/vsc"
import {FiWifi} from "react-icons/fi"
import { useRouter, useSearchParams, usePathname} from "next/navigation";




export const categories = [
    {
        label: "Mobile App",
        icon: FaMobileAlt,
        description: "Mobile App Development"
    },
    {
        label: "Web App",
        icon: FaLaptop,
        description: "Web App Development"
    },
    {
        label: "Cloud Computing",
        icon: FaCloud,
        description: "Cloud Computing"
    },
    {
        label: "Data Science",
        icon: BsDatabaseFill,
        description: "Data Science"
    },
    {
        label: "Game Development",
        icon: IoGameController,
        description: "Game Development"
    },
    {
        label: "AI",
        icon: BsFillPersonFill,
        description: "Artifical Intellegence"
    },
    {
        label: "Cyber Security",
        icon: VscShield,
        description: "Cyber Security"
    },
    {
        label: "Embedded Systems",
        icon: IoHardwareChip,
        description: "Embedded Systems Engineer"
    },
    {
        label: "Iot",
        icon: FiWifi,
        description: "Internet of Things"
    },
    {
        label: "Robotics",
        icon: FaRobot,
        description: "Robotics"
    },
    
]

const Categories = () => {
    const params = useSearchParams(); //gets parameters from url
    const category = params?.get("category"); //gets category param value
    const pathName = usePathname();

    const isMainPage = pathName == "/";

    if (!isMainPage){
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        description={item.description}
                        selected={category == item.label}
                        icon={item.icon}>
                    </CategoryBox>
                ))}

            </div>
        </Container>
       
    )

}

export default Categories;