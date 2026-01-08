import { CompassIcon, HomeIcon, LoaderIcon, SparkleIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Suspense } from "react";
import CustomerUserButton from "./customer-user-button";

const Logo = () => {
    return <Link href="/" className="flex items-center gap-2 group">
        <div className="size-8 rounded-lg bg-fuchsia-500 flex justify-center items-center">
            <SparkleIcon className="size-4 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">
            a<span className="text-fuchsia-500">Veliz</span>Web
        </span>
    </Link>
}

export default function Header() {

    return (
        <header className="sticky top-0 z-50 border-b border-fuchsia-500 bg-violet-400 backdrop-blur supports-backdrop-filter:bg-violet-100/60">
            <div className="container mx-auto sm:px-6 lg:px-8 px-12">
                <div className="flex h-16 items-center justify-between">
                    <Logo />
                    <nav className="flex items-center gap-1">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                            <HomeIcon className="size-4" />
                            <span>Home</span>
                        </Link>

                        <Link
                            href="/explore"
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                            <CompassIcon className="size-4" />
                            <span>Explore</span>
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Suspense fallback={<LoaderIcon className="size-4 animate-spin" />}>
                            <SignedOut>
                                <SignInButton />
                                <SignUpButton>
                                    <Button className="cursor-pointer">
                                        Sign Up
                                    </Button>
                                </SignUpButton>
                            </SignedOut>

                            <SignedIn>
                                <Button asChild>
                                    <Link href="/submit">
                                        <SparklesIcon className="size-4" />
                                        Submit Project
                                    </Link>
                                </Button>
                                <CustomerUserButton />
                            </SignedIn>
                        </Suspense>
                    </div>
                </div>
            </div>
        </header>
    )
}
