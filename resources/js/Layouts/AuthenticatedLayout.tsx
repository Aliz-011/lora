import Header from "@/Components/header";
import { Toaster } from "@/Components/ui/sonner";

import { User } from "@/types";

type Props = {
    user?: User;
    children: React.ReactNode;
};
export default function Authenticated({ user, children }: Props) {
    return (
        <>
            <Header />
            <div className="px-3 lg:px-14" suppressHydrationWarning={true}>
                <Toaster />
                {children}
            </div>
        </>
    );
}
