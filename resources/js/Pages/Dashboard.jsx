import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Images, Camera, ImagePlay, Mic, Hash, Text, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import PostCard from "@/Components/PostCard";
import PaginationComponent from "@/Components/Pagination";
import axios from "axios";
import { useEffect } from "react";

export default function Dashboard({ auth, data }) {
    const posts = data.data;

       const fetchPost = async () => {
           const response = await axios.get("/post");
           console.log(response.data);
       };

       useEffect(() => {
           fetchPost();
       }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="w-full flex justify-center mt-2 mb-3">
                <img
                    src="/thread.png"
                    className="w-[54px] h-[54px]"
                    alt="Thread Logo"
                />
            </div>
            <div className="flex gap-3 border-b-2 px-3 pb-4">
                <Avatar>
                    <AvatarImage
                        src={`http://localhost:8000/storage/${auth.user.profile_image}`}
                    />
                    <AvatarFallback className="font-medium">
                        {auth.user.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="font-semibold text-black">
                        {auth.user.name}
                    </h1>
                    <p className="text-gray-500">What's new?</p>
                    <div className="flex gap-5 mt-2">
                        <Images className="text-gray-500" />
                        <Camera className="text-gray-500" />
                        <ImagePlay className="text-gray-500" />
                        <Mic className="text-gray-500" />
                        <Hash className="text-gray-500" />
                        <Text className="text-gray-500" />
                    </div>
                </div>
            </div>
            <div className="mt-3 flex flex-col gap-4 pb-20">
                {posts.map((post) => (
                    <PostCard key={post.id} user={auth.user} post={post} />
                ))}
                <PaginationComponent links={data.meta.links}/>
            </div>
        </AuthenticatedLayout>
    );
}
