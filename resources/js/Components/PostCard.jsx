import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/shadcn/ui/avatar";
import { Ellipsis, Heart, MessageCircle, RefreshCw, Send } from "lucide-react";
import PostIcon from "./PostIcon";
import { router } from "@inertiajs/react";

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/90 z-10"
            onClick={onClose}
        >
            <img
                src={imageSrc}
                alt="Zoomed Image"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};

function PostCard({ post, user }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const userLiked = post.likes.some((like) => like.user_id === user.id);
        setLiked(userLiked);
    }, [post.likes, user.id]);

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

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleReply = (postId) => {
        router.get(route("comments.create", postId));
    };



    return (
        <div className="flex gap-3 border-b-2 pb-3 px-3">
            <Avatar>
                <AvatarImage src={post.user?.profile_image} />
                <AvatarFallback className="font-medium">
                    {post.user.name.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <div className="w-full">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <h1 className="font-semibold">{post.user.name}</h1>
                        <p className="text-xs font-medium text-gray-400">
                            {post.created_at}
                        </p>
                    </div>
                    <Ellipsis className="text-gray-500" />
                </div>
                <p className="text-sm font-medium mb-2">{post.content}</p>

                {post.image && (
                    <img
                        src={post.image}
                        alt="Post Image"
                        className="rounded-xl cursor-pointer"
                        onClick={handleImageClick}
                    />
                )}

                <div className="mt-2 flex gap-5">
                    <PostIcon
                        icon={
                            <Heart
                                className={`h-4 w-4 ${
                                    liked
                                        ? "text-red-500 active:scale-125 transition-all ease-in-out"
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
                        onClick={() => handleReply(post.id)}
                        count={post.comments.length}
                    />
                    <PostIcon
                        icon={<RefreshCw className="h-4 w-4" />}
                        count={0}
                    />
                    <PostIcon icon={<Send className="h-4 w-4" />} count={0} />
                </div>
            </div>

            {/* Image Modal */}
            <ImageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                imageSrc={post.image}
            />
        </div>
    );
}

export default PostCard;
