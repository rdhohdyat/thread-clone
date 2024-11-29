import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Search, User, Home, Heart } from "lucide-react";
import { Button } from '@/shadcn/ui/button';

export default function Authenticated({ user, header, children }) {

    return (
        <div className="h-screen  w-screen">
            <main className="w-full h-full">{children}</main>
            <div className="fixed bottom-0 left-0 right-0 bg-white">
                <div className="flex justify-around items-center py-2 text-black">
                    <NavLink href={route('page.index')} active={route().current('page.index')}>
                        <Home className="h-7 w-7" />
                    </NavLink>
                    <NavLink href={route('page.search')} active={route().current('page.search')}>
                        <Search className="h-7 w-7" />
                    </NavLink>
                    <Link href={route('post.create')}>
                        <Button className="text-4xl bg-gray-100 py-6 rounded-full hover:bg-gray-200 text-gray-400">
                            +
                        </Button>
                    </Link>
                    <NavLink href={route('page.activity')} active={route().current('page.activity')}>
                        <Heart className="h-7 w-7" />
                    </NavLink>
                    <NavLink href={route('page.profile')} active={route().current('page.profile')}>
                        <User className="h-7 w-7" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
