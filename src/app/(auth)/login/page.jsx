"use client";

import { siteConfig } from "@/config/site";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";


export default function LoginPage() {
    const { loginWithGoogle } = useAuth();

    const handle_login_with_google = () => {
        const callbackURL = "/onboarding";
        loginWithGoogle(callbackURL);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-xl font-semibold text-slate-900">
                        {siteConfig.name}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Sign in to continue
                    </p>
                </div>

                <button
                    onClick={handle_login_with_google}
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                >
                    <FcGoogle className="h-5 w-5" />
                    Continue with Googling
                </button>

            </div>
        </div>
    );
}