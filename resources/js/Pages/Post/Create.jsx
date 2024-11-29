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
} from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

const Create = ({ auth }) => {
    const { data, setData, post, errors, processing } = useForm({
        user_id: auth.user.id,
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
    console.log(previewImage);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        post(route("post.store"), {
            onSuccess: () => {
                console.log("Post successful!");
            },
            onError: (errors) => {
                console.log("Errors:", errors);
            },
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center p-5 border-b-2">
                    <div className="flex items-center gap-4">
                        <Link href={route("page.index")}>
                            <X className="h-7 w-7" />
                        </Link>
                        <h1 className="text-xl font-semibold">New thread</h1>
                    </div>
                    <CircleEllipsis />
                </div>
                <div>
                    <div className="flex gap-3 border-b-2 px-5 pb-4 mt-4">
                        <Avatar>
                            <AvatarImage
                                src={`http://localhost:8000/storage/${auth.user.profile_image}`}
                            />
                            <AvatarFallback>
                                {auth.user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
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
                                className="w-full bg-transparent focus:outline-none focus:ring-0 border-none active:outline-none placeholder-gray-500 text-md resize-none placeholder:text-sm px-0"
                                placeholder="What's new?"
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
                            className="w-full bg-transparent focus:outline-none focus:ring-0 border-none active:outline-none placeholder:text-md placeholder-gray-500"
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

export default Create;
