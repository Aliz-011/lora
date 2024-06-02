import { Link } from "@inertiajs/react";

const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="items-center hidden lg:flex">
                {/* <img src="/logo.svg" alt="logo" width={28} height={28} /> */}
                <p className="font-semibold text-white text-2xl ml-2.5">
                    SMART
                </p>
            </div>
        </Link>
    );
};

export default HeaderLogo;
