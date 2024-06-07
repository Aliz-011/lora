import { Link, router, usePage } from "@inertiajs/react";
import qs from "query-string";
import { useMemo } from "react";

import HeaderLogo from "@/Components/header-logo";
import Navigation from "@/Components/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogHeader,
} from "@/Components/ui/dialog";
import WelcomeMsg from "@/Components/welcome-msg";

import { PageProps, User } from "@/types";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type Props = {
    user?: User;
};

const Header = () => {
    const {
        auth: { user },
    } = usePage<PageProps>().props;
    const initialName = useMemo(
        () =>
            user?.name
                .split(" ")
                .map((val) => val.substring(0, 1))
                .join(""),
        [user?.name]
    );

    const onClick = () => {
        const url = qs.stringifyUrl(
            {
                url: "/dashboard",
                query: {
                    kriteria: "test",
                    subkriteria: "paku",
                },
            },
            { skipEmptyString: true, skipNull: true }
        );

        router.visit(url);
    };

    return (
        <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <Dialog>
                            <DialogTrigger>
                                <Button
                                    variant="link"
                                    size="icon"
                                    className="rounded-full"
                                >
                                    <MagnifyingGlassIcon className="size-4 text-white" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Ranking</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4"></div>
                                <DialogFooter>
                                    <Button type="button" onClick={onClick}>
                                        Cari
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="size-8" asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarFallback>
                                        {initialName ? initialName : "CN"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" forceMount>
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                    >
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <WelcomeMsg name={user?.name} />
            </div>
        </header>
    );
};

export default Header;
