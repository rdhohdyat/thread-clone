import { Link, Head } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Card } from "@/shadcn/ui/card";
import { useState } from "react";

export default function Welcome() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-center w-full h-screen items-center">
                
            </div>
        </>
    );
}
