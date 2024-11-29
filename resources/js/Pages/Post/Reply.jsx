import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import {
    X,
    CircleEllipsis,
    Images,
    Camera,
    ImagePlay,
    Mic,
    Hash,
    Text,
    Ellipsis,
} from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { useState } from "react";

const Reply = ({ auth, data: postData }) => {
    const { data, setData, post, errors, processing } = useForm({
        user_id: auth.user.id,
        post_id: postData.data.id,
        content: "",
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file && file.type.startsWith("image/")) {
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("comment.store"), {
            onSuccess: () => {
                console.log("comment successful!");
            },
            onError: (errors) => {
                console.log("Errors:", errors);
            },
        });
    };

    return (
        <div className="pb-20">
            <div className="sticky top-0 z-10 bg-white">
                <div className="flex justify-between items-center p-5 border-b-2">
                    <div className="flex items-center gap-4">
                        <Link href={route("page.index")}>
                            <X className="h-7 w-7" />
                        </Link>
                        <h1 className="text-xl font-semibold">Reply</h1>
                    </div>
                    <CircleEllipsis />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="pt-5">
                    <div className="flex gap-3 pb-3 px-5">
                        <div className="flex flex-col items-center">
                            <Avatar className="mb-4">
                                <AvatarImage
                                    src={postData.data.user?.profile_image}
                                />
                                <AvatarFallback className="font-medium">
                                    {postData.data.user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="w-0.5 h-full bg-gray-200 "></div>
                        </div>
                        <div className="w-full ">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <h1 className="font-semibold">
                                        {postData.data.user.name}
                                    </h1>
                                    <p className="text-xs font-medium text-gray-400">
                                        {postData.data.created_at}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm font-medium mb-2">
                                {postData.data.content}
                            </p>

                            {postData.data.image && (
                                <img
                                    src={postData.data.image}
                                    alt="Post Image"
                                    className="rounded-xl cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-3 px-5 pb-4 mt-2">
                        <div className="flex flex-col items-center">
                            <Avatar className="mb-4">
                                <AvatarImage
                                    src={`http://localhost:8000/storage/${auth.user.profile_image}`}
                                />
                                <AvatarFallback>
                                    {auth.user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="w-0.5 h-full bg-gray-200 "></div>
                        </div>
                        <div className="flex-grow">
                            <h1 className="font-semibold text-black">
                                {auth.user.name}
                            </h1>
                            <textarea
                                type="text"
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                                value={data.content}
                                className="w-full bg-transparent focus:outline-none focus:ring-0 border-none active:outline-none placeholder-gray-500 text-md resize-none placeholder:text-sm px-0 h-[40px]"
                                placeholder={`Reply to ${postData.data.user.name} ...`}
                            />
                            {errors.content && (
                                <div className="text-red-600">
                                    {errors.content}
                                </div>
                            )}
                            <div className="flex gap-5 mt-3">
                                <label className="relative cursor-pointer">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageChange}
                                    />
                                    <Images className="text-gray-500" />
                                </label>
                                <Camera className="text-gray-500" />
                                <ImagePlay className="text-gray-500" />
                                <Mic className="text-gray-500" />
                                <Hash className="text-gray-500" />
                                <Text className="text-gray-500" />
                            </div>
                            {previewImage && (
                                <div className="mt-3">
                                    <img
                                        src={previewImage}
                                        alt="Image Preview"
                                        className="max-w-full h-auto"
                                    />
                                </div>
                            )}
                            {errors.image && (
                                <div className="text-red-600">
                                    {errors.image}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 p-5 bg-white">
                    <div className="flex justify-between w-full">
                        <input
                            type="text"
                            className="w-full bg-transparent focus:outline-none focus:ring-0 border-none active:outline-none placeholder:text-md text-sm placeholder-gray-500"
                            placeholder="Anyone can reply & quote"
                        />
                        <Button
                            className="rounded-full"
                            type="submit"
                            disabled={processing}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Reply;
