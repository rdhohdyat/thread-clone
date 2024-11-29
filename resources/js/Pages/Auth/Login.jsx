import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div>
                <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">
                        Log in to Your Account
                    </h2>
                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <div>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                className="w-full rounded-lg border border-gray-300"
                                value={data.email}
                                placeholder="Email"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2 text-red-600"
                            />
                        </div>

                        <div className="mt-4">
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                className="w-full rounded-lg border border-gray-300"
                                value={data.password}
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-600"
                            />
                        </div>

                        <Button
                            className="w-full py-2 mt-4 text-white rounded-xl"
                            disabled={processing}
                        >
                            Log in
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        <a
                            href={route("register")}
                            className="text-sm hover:underline"
                        >
                            Don't have account ?, register
                        </a>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
