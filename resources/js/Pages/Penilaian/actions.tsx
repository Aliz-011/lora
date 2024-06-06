"use client";

import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";

type Props = {
    id: number;
    edit_url: string;
};

export const Actions = ({ edit_url, id }: Props) => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="size-8 p-0" variant="ghost">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={edit_url}>
                            {edit_url.includes("create") ? (
                                <>
                                    <Plus className="size-4 mr-2" />
                                    Create
                                </>
                            ) : (
                                <>
                                    <Edit className="size-4 mr-2" />
                                    Edit
                                </>
                            )}
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link
                            href={`/subkriterias/${id}`}
                            method="delete"
                            as="button"
                            type="button"
                            className="w-full"
                        >
                            <Trash className="size-4 mr-2" />
                            Delete
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
