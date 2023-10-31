"use client"

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import {TbPhotoPlus} from "react-icons/tb"

declare global{
    var cloudinary: any;
}

type ImageUploadProps = {
    children?: React.ReactNode;
    onChange: (value: string) => void;
    value: string;

}

const ImageUpload = ({children, onChange, value} : ImageUploadProps) => {

    const handleUpload = useCallback((result:any) => {
        onChange(result.info.secure_url)
    }, [onChange])

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="jvdg56if"
            options={{maxFiles:1}}
        >

            {({open}) => {
                return (
                    <div className="relative cursor-pointer hover:opacity-70 transition h-96 w-auto border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                    onClick={() => open?.()}>
                        <TbPhotoPlus size={50}></TbPhotoPlus>
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    alt="Upload"
                                    fill
                                    style= {{objectFit: "cover"}}
                                    src={value}>

                                </Image>
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>   
        
    )
}

export default ImageUpload;