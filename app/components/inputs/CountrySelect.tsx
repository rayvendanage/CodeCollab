"use client";

import Select from "react-select"
import useContries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
}

type CountrySelectProps = {
    children?: React.ReactNode;
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({value, onChange} : CountrySelectProps) => {

    const {getAll} = useContries();



    return (
        <div>
            <Select
                classNames={{control: () => "p-3 border-e-2", input: () => "text-lg", option: () => "text-lg"}}
                placeholder="Anywhere"
                isClearable
                options={ getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                            {option.label}, 
                            <span className="text-neutral-500 ml-1">
                                {option.region}
                            </span>
                        </div>
                    </div>

                )}
            />
        </div>
    )
}

export default CountrySelect;