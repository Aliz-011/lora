import { Head } from "@inertiajs/react";

import { FlipWords } from "@/Components/flip-words";

import { PageProps } from "@/types";
import { UseScrollTop } from "@/hooks/use-scroll-top";
import { TracingBeam } from "@/Components/tracing-beam";
import { twMerge } from "tailwind-merge";
import Guest from "@/Layouts/GuestLayout";

export default function Welcome({ auth }: PageProps) {
    const words = ["better", "beautiful", "modern"];
    const scroll = UseScrollTop();

    return (
        <>
            <Head title="Welcome" />

            <Guest>
                <div className="max-w-3xl space-y-4">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                        Search <FlipWords words={words} /> house. <br />
                        Welcome to <span className="underline">SMART</span>
                    </h2>
                    <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                        SMART is the connected workspace where <br /> better and
                        faster work happens
                    </h3>
                </div>

                <TracingBeam className="px-6">
                    <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                        {dummyContent.map((item, index) => (
                            <div key={`content-${index}`} className="mb-10">
                                <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                                    {item.badge}
                                </h2>

                                <p className={twMerge("text-xl mb-4")}>
                                    {item.title}
                                </p>

                                <div className="text-sm  prose prose-sm dark:prose-invert">
                                    {item?.image && (
                                        <img
                                            src={item.image}
                                            alt="blog thumbnail"
                                            height="700"
                                            width="700"
                                            className="rounded-lg mb-10 object-cover"
                                        />
                                    )}
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </TracingBeam>
            </Guest>
        </>
    );
}

const dummyContent = [
    {
        title: "Perumahan Vidi Regency 2 (Tanah Hitam)",
        description: (
            <>
                <p>
                    Sit duis est minim proident non nisi velit non consectetur.
                    Esse adipisicing laboris consectetur enim ipsum
                    reprehenderit eu deserunt Lorem ut aliqua anim do. Duis
                    cupidatat qui irure cupidatat incididunt incididunt enim
                    magna id est qui sunt fugiat. Laboris do duis pariatur
                    fugiat Lorem aute sit ullamco. Qui deserunt non
                    reprehenderit dolore nisi velit exercitation Lorem qui do
                    enim culpa. Aliqua eiusmod in occaecat reprehenderit laborum
                    nostrud fugiat voluptate do Lorem culpa officia sint labore.
                    Tempor consectetur excepteur ut fugiat veniam commodo et
                    labore dolore commodo pariatur.
                </p>
                <p>
                    Dolor minim irure ut Lorem proident. Ipsum do pariatur est
                    ad ad veniam in commodo id reprehenderit adipisicing.
                    Proident duis exercitation ad quis ex cupidatat cupidatat
                    occaecat adipisicing.
                </p>
                <p>
                    Tempor quis dolor veniam quis dolor. Sit reprehenderit
                    eiusmod reprehenderit deserunt amet laborum consequat
                    adipisicing officia qui irure id sint adipisicing.
                    Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia
                    aliquip deserunt veniam deserunt officia adipisicing aliquip
                    proident officia sunt.
                </p>
            </>
        ),
        badge: "Rumah",
        image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1103172353057961733/original/dd2e63d3-8357-47b9-9f2b-3144e17b6f83.jpeg?im_w=720",
    },
    {
        title: "Perumahan Megapura Koya Residence",
        description: (
            <>
                <p>
                    Ex irure dolore veniam ex velit non aute nisi labore ipsum
                    occaecat deserunt cupidatat aute. Enim cillum dolor et nulla
                    sunt exercitation non voluptate qui aliquip esse tempor.
                    Ullamco ut sunt consectetur sint qui qui do do qui do.
                    Labore laborum culpa magna reprehenderit ea velit id esse
                    adipisicing deserunt amet dolore. Ipsum occaecat veniam
                    commodo proident aliqua id ad deserunt dolor aliquip duis
                    veniam sunt.
                </p>
                <p>
                    In dolore veniam excepteur eu est et sunt velit. Ipsum sint
                    esse veniam fugiat esse qui sint ad sunt reprehenderit do
                    qui proident reprehenderit. Laborum exercitation aliqua
                    reprehenderit ea sint cillum ut mollit.
                </p>
            </>
        ),
        badge: "Changelog",
        image: "https://a0.muscache.com/im/pictures/miso/Hosting-1011233640536374070/original/39f87fa3-ec7c-4fbc-9a07-46483e3fc76b.jpeg?im_w=720",
    },
    {
        title: "Perumahan Megapura Skyline",
        description: (
            <>
                <p>
                    Ex irure dolore veniam ex velit non aute nisi labore ipsum
                    occaecat deserunt cupidatat aute. Enim cillum dolor et nulla
                    sunt exercitation non voluptate qui aliquip esse tempor.
                    Ullamco ut sunt consectetur sint qui qui do do qui do.
                    Labore laborum culpa magna reprehenderit ea velit id esse
                    adipisicing deserunt amet dolore. Ipsum occaecat veniam
                    commodo proident aliqua id ad deserunt dolor aliquip duis
                    veniam sunt.
                </p>
            </>
        ),
        badge: "Launch Week",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Perumahan Vidi Regency 1 (Dok 7)",
        description: (
            <>
                <p>
                    Ex irure dolore veniam ex velit non aute nisi labore ipsum
                    occaecat deserunt cupidatat aute. Enim cillum dolor et nulla
                    sunt exercitation non voluptate qui aliquip esse tempor.
                    Ullamco ut sunt consectetur sint qui qui do do qui do.
                    Labore laborum culpa magna reprehenderit ea velit id esse
                    adipisicing deserunt amet dolore. Ipsum occaecat veniam
                    commodo proident aliqua id ad deserunt dolor aliquip duis
                    veniam sunt.
                </p>
            </>
        ),
        badge: "Launch Week",
        image: "https://a0.muscache.com/im/pictures/miso/Hosting-896669046266545795/original/e6d39c58-f58b-499e-8e0b-5539fe5d43ea.jpeg?im_w=720",
    },
    {
        title: "Perumahan Grand Vidi Lestari (Holtekamp)",
        description: (
            <>
                <p>
                    Ex irure dolore veniam ex velit non aute nisi labore ipsum
                    occaecat deserunt cupidatat aute. Enim cillum dolor et nulla
                    sunt exercitation non voluptate qui aliquip esse tempor.
                    Ullamco ut sunt consectetur sint qui qui do do qui do.
                    Labore laborum culpa magna reprehenderit ea velit id esse
                    adipisicing deserunt amet dolore. Ipsum occaecat veniam
                    commodo proident aliqua id ad deserunt dolor aliquip duis
                    veniam sunt.
                </p>
            </>
        ),
        badge: "Launch Week",
        image: "https://a0.muscache.com/im/pictures/ec593870-4efa-4a82-866b-fd988f783baa.jpg?im_w=720",
    },
];
