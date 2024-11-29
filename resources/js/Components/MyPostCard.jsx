import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import {
    Ellipsis,
    Heart,
    MessageCircle,
    RefreshCw,
    Send,
    Trash,
    Bookmark,
    Pin,
    HeartOff,
    ChevronRight,
    History,
} from "lucide-react";
import PostIcon from "./PostIcon";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/ui/sheet";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import { Link } from "@inertiajs/react";

function MyPostCard({ post, user }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes.length);

    const handleDeletePost = (id) => {};

    useEffect(() => {
        const userLiked = post.likes.some((like) => like.user_id === user.id);
        setLiked(userLiked);
    }, [post.likes]);

    const handleLike = async () => {
        try {
            const response = await axios.post(`/posts/${post.id}/like`);
            if (response.data.status === "liked") {
                setLiked(true);
                setLikeCount(likeCount + 1);
            } else {
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
        } catch (error) {
            console.error("Error toggling like", error);
        }
    };

    return (
        <div className="flex gap-3 border-b-2 py-3 px-3">
            <Avatar>
                <AvatarImage src={post.user?.profile_image} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full">
                <div className="flex justify-between">
                    <h1 className="font-semibold">{post.user.name}</h1>
                    <Sheet>
                        <SheetTrigger>
                            <Ellipsis className="text-gray-500" />
                        </SheetTrigger>
                        <SheetContent
                            className="w-full rounded-t-3xl bg-gray-100"
                            side="bottom"
                        >
                            <div>
                                <div className="px-4 bg-white rounded-2xl mb-3">
                                    <div className="flex justify-between w-full font-medium border-b-2 py-3">
                                        Save
                                        <Bookmark className="h-5 w-5" />
                                    </div>
                                    <div className="flex justify-between w-full font-medium border-b-2 py-3">
                                        Pin to profile
                                        <Pin className="h-5 w-5" />
                                    </div>
                                    <div className="flex justify-between w-full font-medium border-b-2 py-3">
                                        Archive
                                        <History className="h-5 w-5" />
                                    </div>
                                    <div className="flex justify-between w-full font-medium border-b-2 py-3">
                                        Hide like and share counts
                                        <HeartOff className="h-5 w-5" />
                                    </div>
                                    <div className="flex justify-between w-full font-medium  py-3">
                                        Who can reply & quote
                                        <ChevronRight className="h-5 w-5" />
                                    </div>
                                </div>

                                <AlertDialog>
                                    <AlertDialogTrigger className="w-full">
                                        <div className="bg-white text-red-500 flex justify-between w-full p-4 font-medium rounded-2xl">
                                            Delete
                                            <Trash className="h-5 w-5" />
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <div>
                                            <h1 className="flex justify-center font-semibold text-xl">
                                                Delete this post?
                                            </h1>
                                        </div>
                                        <Link
                                            className="text-center text-red-500 border-t pt-4"
                                            href={route(
                                                "post.destroy",
                                                post.id
                                            )}
                                            method="DELETE"
                                        >
                                            Delete
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
                <p className="text-sm font-medium mb-2">{post.content}</p>

                {post.image && (
                    <img
                        src={post.image}
                        alt="Post Image"
                        className="rounded-xl"
                    />
                )}
                <div className="mt-2 flex gap-5">
                    <PostIcon
                        icon={
                            <Heart
                                className={`h-4 w-4 ${
                                    liked
                                        ? "text-red-500 active:scale-95 transition-all ease-in-out"
                                        : "text-gray-500"
                                }`}
                                onClick={handleLike}
                            />
                        }
                        count={
                            <span
                                className={` ${
                                    liked
                                        ? "text-red-500 active:scale-95 transition-all ease-in-out"
                                        : "text-gray-500"
                                }`}
                            >
                                {likeCount}
                            </span>
                        }
                    />
                    <PostIcon
                        icon={<MessageCircle className="h-4 w-4 -rotate-90" />}
                        count={post.comments.length}
                    />
                    <PostIcon
                        icon={<RefreshCw className="h-4 w-4" />}
                        count={0}
                    />
                    <PostIcon icon={<Send className="h-4 w-4" />} count={0} />
                </div>
            </div>
        </div>
    );
}

export default MyPostCard;
