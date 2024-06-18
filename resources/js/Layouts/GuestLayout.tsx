import { PropsWithChildren } from "react";
import { Link, usePage } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";

import { UseScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Search from "@/Components/search";

export default function Guest({ children }: PropsWithChildren) {
    const scroll = UseScrollTop();
    const { url } = usePage();

    return (
        <div className="h-full dark:bg-[#1f1f1f]">
            <div
                className={cn(
                    "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center px-6 py-4 w-full",
                    scroll && "border-b shadow-sm"
                )}
            >
                <Link href="/" className="font-bold text-2xl">
                    SMART
                </Link>
                <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                    {url.includes("rekomendasi") ? (
                        <Search />
                    ) : (
                        <Button variant="link" className="p-0" asChild>
                            <Link href="/rekomendasi">Rekomendasi</Link>
                        </Button>
                    )}
                </div>
            </div>

            <main className="min-h-full pt-40">
                <div className="h-full flex flex-col dark:bg-[#1F1F1F]">
                    <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 lg:gap-y-16 flex-1 px-6 pb-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
