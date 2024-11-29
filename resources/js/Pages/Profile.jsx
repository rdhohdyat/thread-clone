import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { UserPlus, Globe, Instagram, AlignRight, Check } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/ui/sheet";
import { Link } from "@inertiajs/react";
import MyPostCard from "@/Components/MyPostCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";

import PostCard from "@/Components/PostCard";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import menuSettings from "@/lib/constants/settings";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";

function Profile({ auth, data }) {
    const posts = data.data;

    return (
        <Authenticated user={auth.user}>
            <div className="flex justify-between items-center p-5">
                <Globe />
                <div className="flex items-center gap-5">
                    <Instagram />
                    <Sheet>
                        <SheetTrigger>
                            <AlignRight />
                        </SheetTrigger>
                        <SheetContent className="w-full" close="true">
                            <div className="ml-10">
                                <h1 className="font-semibold text-lg">
                                    Settings
                                </h1>
                            </div>
                            <div className="mt-4">
                                {menuSettings.map((menu, index) => (
                                    <div
                                        className="flex items-center gap-4 py-2.5"
                                        key={index}
                                    >
                                        <menu.icon className="h-5 w-5" />
                                        <span className="text-md">
                                            {menu.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-3 mt-2 borer-t-2">
                                <Sheet>
                                    <SheetTrigger className="text-start">
                                        <div className="text-blue-500">
                                            Switch profiles
                                        </div>
                                    </SheetTrigger>
                                    <SheetContent
                                        side="bottom"
                                        className="rounded-t-3xl bg-gray-100"
                                    >
                                        <div className="bg-white rounded-2xl">
                                            <div className="flex items-center w-full justify-between p-4 border-b-2 pb-3 ">
                                                <div className="flex gap-4 ">
                                                    <Avatar>
                                                        <AvatarImage
                                                            src={`http://localhost:8000/storage/${auth.user.profile_image}`}
                                                        ></AvatarImage>
                                                        <AvatarFallback>
                                                            RH
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm">
                                                            {auth.user.email}
                                                        </p>
                                                        <h1 className="text-gray-500">
                                                            {auth.user.name}
                                                        </h1>
                                                    </div>
                                                </div>
                                                <Check />
                                            </div>
                                            <div className="flex items-center w-full justify-between p-4 border-b-2 pb-3 ">
                                                <div className="flex gap-4 items-center">
                                                    <Avatar>
                                                        <AvatarImage></AvatarImage>
                                                        <AvatarFallback>
                                                            +
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>Add profile</div>
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                <AlertDialog>
                                    <AlertDialogTrigger className="w-full">
                                        <div className="bg-white text-red-500 flex justify-between w-full rounded-2xl">
                                            Log Out
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <div>
                                            <h1 className="flex justify-center font-semibold text-xl">
                                                Log out from thread?
                                            </h1>
                                        </div>
                                        <Link
                                            className="text-center text-red-500 border-t pt-4"
                                            href={route("logout")}
                                            method="POST"
                                        >
                                            Log out
                                        </Link>
                                        <AlertDialogCancel className="border-0 shadow-none border-t hover:bg-transparent">
                                            Cancel
                                        </AlertDialogCancel>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div className="flex justify-between items-center px-5">
                <div>
                    <h1 className="font-semibold text-2xl">{auth.user.name}</h1>
                    <h3 className="font-semibold">{auth.user.email}</h3>
                </div>
                <Avatar className="h-16 w-16">
                    <AvatarImage
                        src={`http://localhost:8000/storage/${auth.user.profile_image}`}
                    ></AvatarImage>
                    <AvatarFallback>
                        <UserPlus className="h-9 w-9" />
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex justify-center gap-2 mt-5 px-5">
                <Link href={route("profile.edit")} className="w-full">
                    <Button
                        variant="outline"
                        className="w-full text-md border-2 font-medium rounded-xl"
                    >
                        Edit Profile
                    </Button>
                </Link>
                <Button
                    variant="outline"
                    className="w-full text-md border-2 font-medium rounded-xl"
                >
                    Share Profile
                </Button>
            </div>
            <div className="mt-3">
                <Tabs className="w-full" defaultValue="threads">
                    <TabsList className="w-full">
                        <TabsTrigger
                            value="threads"
                            className="w-full bg-white rounded-none"
                        >
                            Threads
                        </TabsTrigger>
                        <TabsTrigger
                            value="replies"
                            className="w-full bg-white rounded-none"
                        >
                            Replies
                        </TabsTrigger>
                        <TabsTrigger
                            value="reposts"
                            className="w-full bg-white rounded-none"
                        >
                            Reposts
                        </TabsTrigger>
                    </TabsList>
                    <div className="pb-16">
                        <TabsContent value="threads">
                            <div className="mt-3">
                                {posts && posts.length > 0 ? (
                                    posts?.map((post) => (
                                        <MyPostCard
                                            post={post}
                                            user={auth.user}
                                            key={post.id}
                                        />
                                    ))
                                ) : (
                                    <h1 className="text-gray-400 text-center font-semibold mt-10">
                                        You haven't thread
                                    </h1>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="replies">
                            <div className="mt-3">
                                {posts && posts.length > 0 ? (
                                    posts?.map((post) => (
                                        <PostCard
                                            post={post}
                                            user={auth.user}
                                            key={post.id}
                                        />
                                    ))
                                ) : (
                                    <h1 className="text-gray-400 font-semibold mt-5">
                                        You haven't replies any thread yet.
                                    </h1>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="reposts">
                            <div className="p-5 flex justify-center">
                                <h1 className="text-gray-400 font-semibold mt-5">
                                    You haven't reposted any thread yet.
                                </h1>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </Authenticated>
    );
}

export default Profile;
