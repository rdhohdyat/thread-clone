import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={(active ? "text-black " : " text-gray-400") + className}
        >
            {children}
        </Link>
    );
}
