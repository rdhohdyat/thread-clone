import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { X, UserPlus } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            profile_image: null,
            _method : "PUT"
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update"));
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div className="flex justify-between items-center p-5">
                    <div className="flex items-center gap-4">
                        <Link href={route("page.index")}>
                            <X className="h-7 w-7" />
                        </Link>
                        <h1 className="text-xl font-semibold">Edit Profile</h1>
                    </div>
                    <PrimaryButton
                        className="text-black bg-white border-0 shadow-none hover:bg-white text-md font-semibold"
                        disabled={processing}
                    >
                        {processing ? "Saving..." : "Done"}
                    </PrimaryButton>
                </div>

                <div className="flex justify-center items-center h-[600px]">
                    <div className="border-2 p-6 rounded-xl space-y-4 w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <div className="w-full">
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    className="block w-full bg-transparent p-0 mt-1"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    autoComplete="name"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="ml-4">
                                <Avatar className="h-14 w-14 relative">
                                    <AvatarImage src={user.profile_image} />
                                    <AvatarFallback>
                                        <UserPlus className="h-9 w-9" />
                                    </AvatarFallback>
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) =>
                                            setData(
                                                "profile_image",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </Avatar>
                                <InputError
                                    message={errors.profile_image}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="border-b w-full py-2">
                            <InputLabel htmlFor="bio" value="Bio" />
                            <TextInput
                                id="bio"
                                className="block w-full bg-transparent p-0 mt-1"
                                onChange={(e) => setData("bio", e.target.value)}
                                autoComplete="bio"
                            />
                            <InputError message={errors.bio} className="mt-2" />
                        </div>

                        <PrimaryButton
                            className="w-full"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "Update Profile"}
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    );
}
