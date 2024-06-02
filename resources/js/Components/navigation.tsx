import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import NavButton from "@/Components/nav-button";

const routes = [
    {
        href: "/dashboard",
        label: "Dashboard",
    },
    {
        href: "/hasils",
        label: "Hasil",
    },
    {
        href: "/penilaians",
        label: "Penilaian",
    },
    {
        href: "/kriterias",
        label: "Kriteria",
    },
    {
        href: "/subkriterias",
        label: "Sub Kriteria",
    },
    {
        href: "/alternatifs",
        label: "Alternatif",
    },
];

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { url } = usePage();
    const isMobile = useMediaQuery("(max-width: 768px)", {
        initializeWithValue: false,
    });

    const onClick = (href: string) => {
        router.visit(href);
        setIsOpen(false);
    };

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="px-2" side="left" forceMount>
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                size="sm"
                                variant={
                                    route.href === url ? "secondary" : "ghost"
                                }
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <nav className="hidden lg:flex items-center gap-2 overflow-x-auto">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={url === route.href}
                />
            ))}
        </nav>
    );
};

export default Navigation;
