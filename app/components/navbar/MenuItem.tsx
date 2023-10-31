'use client';

type MenuItemProps = {
    children: React.ReactNode;
    onClick: () => void;
    label: string;
}

const MenuItem = ({children, onClick, label}: MenuItemProps) => {

    return (
        <div onClick={onClick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold ">
            {label}
        </div>
    )
}

export default MenuItem;