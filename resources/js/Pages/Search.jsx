import React from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/button";

import Authenticated from "@/Layouts/AuthenticatedLayout";

function SearchPage({ auth, data }) {
    const users = data.data;
    return (
        <Authenticated>
            <div className="px-5">
                <h1 className="font-semibold text-3xl">Search</h1>
                <div className="sticky top-0 bg-white z-10 py-3">
                    <div className="flex items-center bg-gray-100 mt-3 px-4 py-1 rounded-full shadow-sm">
                        <Search className="text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            className="bg-transparent border-none focus:outline-none focus:ring-0 active:outline-none placeholder-gray-500 text-gray-700 w-full"
                            placeholder="Search"
                        />
                    </div>
                </div>
                <div className="mt-3 pb-10">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="flex gap-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Avatar>
                                <AvatarImage src={user.profile_image} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex justify-between w-full border-b-2 pb-4">
                                <div className="font-semibold text-sm flex flex-col gap-1">
                                    <h1 className="w-44 truncate ...">
                                        {user.name}
                                    </h1>
                                    <div className="w-44 truncate text-gray-500 text-sm">
                                        {user.email}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="px-6 py-2 rounded-full border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    Follow
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
}

export default SearchPage;
