"use client";

import { useAuth } from "@/hooks/useAuth";
import { routes } from "@/lib/routes/routes";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";


export default function LoginPage() {
    const { loginWithGoogle } = useAuth();

    const [loading, setLoading] = useState(false);

    const handle_login_with_google = async () => {
        setLoading(true);

        try {
            const callbackURL = routes.manage;
            await loginWithGoogle(callbackURL);
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <img src="/horizontal_logo.png" className={`w-full h-auto`} />

                    <p className="mt-1 text-sm text-slate-500">
                        Sign in to continue
                    </p>
                </div>



                <button
                    onClick={handle_login_with_google}
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                >
                    {loading ? (
                        <>
                            <svg
                                className="h-5 w-5 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>

                            Redirecting...
                        </>
                    ) : (
                        <>
                            <FcGoogle className="h-5 w-5" />
                            Continue with Google
                        </>
                    )}
                </button>

            </div>
        </div>
    );
}