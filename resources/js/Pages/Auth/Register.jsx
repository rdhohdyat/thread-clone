import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div>
                <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        Create Your Account
                    </h2>
                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <div>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full rounded-lg border border-gray-300"
                                autoComplete="name"
                                placeholder="Name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2 text-red-600"
                            />
                        </div>

                        <div>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full rounded-lg border border-gray-300"
                                autoComplete="username"
                                placeholder="Email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2 text-red-600"
                            />
                        </div>

                        <div>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full rounded-lg border border-gray-300"
                                autoComplete="new-password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-600"
                            />
                        </div>

                        <div>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full rounded-lg border border-gray-300"
                                autoComplete="new-password"
                                placeholder="Confirm Password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2 text-red-600"
                            />
                        </div>

                        <Button className="w-full py-3" disabled={processing}>
                            Register
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link
                            href={route("login")}
                            className="text-sm  hover:underline"
                        >
                            Already registered?
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
