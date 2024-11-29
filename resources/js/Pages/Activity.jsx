import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { UserPlus, MessageCircle, Repeat, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/button";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { Link } from "@inertiajs/react";

function Activity({ auth }) {
    const activities = [
        {
            type: "follow",
            user: {
                name: "John Doe",
                profile_image: "https://github.com/shadcn.png",
            },
        },
        {
            type: "comment",
            user: {
                name: "Jane Smith",
                profile_image: "https://github.com/shadcn.png",
            },
            content: "Great post! Really enjoyed reading it.",
        },
        {
            type: "reply",
            user: {
                name: "Alice Johnson",
                profile_image: "https://github.com/shadcn.png",
            },
            content: "I completely agree with you!",
        },
    ];

    const suggestedUsers = [
        {
            name: "Mark Hamilton",
            profile_image: "https://github.com/shadcn.png",
        },
        { name: "Emily Davis", profile_image: "https://github.com/shadcn.png" },
        {
            name: "Michael Brown",
            profile_image: "https://github.com/shadcn.png",
        },
    ];

    const activityMenu = [
        "All",
        "Follows",
        "Replies",
        "Mentions",
        "Quotes",
        "Reposts",
        "Verified",
    ];

    return (
        <Authenticated user={auth.user}>
            <div className="px-5 py-3">
                <h1 className="font-semibold text-2xl mb-4">Activity</h1>

                {/* Tabs for different activity types */}
                <Carousel>
                    <CarouselContent>
                        {activityMenu.map((menu) => (
                            <CarouselItem className="basis-1/4">
                                <Button
                                    className="w-full border-2 rounded-xl"
                                    variant="outline"
                                >
                                    {menu}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                <div className="mt-8">
                    <div className="flex w-full justify-between items-center text-sm font-medium border-b pb-4">
                        <h2 className="text-gray-400">Suggested for you</h2>
                        <Link className="text-sm">See all</Link>
                    </div>
                    <div className="flex flex-col gap-4 pt-4">
                        {suggestedUsers.map((user, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between gap-4 bg-gray-100 p-3 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={user.profile_image} />
                                        <AvatarFallback>
                                            {user.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="font-semibold">
                                            {user.name}
                                        </h2>
                                        <p className="text-gray-500">
                                            @
                                            {user.name
                                                .toLowerCase()
                                                .replace(" ", "")}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    Follow
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

export default Activity;
