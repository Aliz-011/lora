import { Link } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";

import { cn } from "@/lib/utils";

type Props = {
    href: string;
    label: string;
    isActive?: boolean;
};

const NavButton = ({ href, isActive, label }: Props) => {
    return (
        <Button
            size="sm"
            variant="outline"
            className={cn(
                "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
                isActive ? "bg-white/10 text-white" : "bg-transparent"
            )}
            asChild
        >
            <Link href={href}>{label}</Link>
        </Button>
    );
};

export default NavButton;
