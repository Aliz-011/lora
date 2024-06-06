import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/Components/ui/checkbox";
import { DataTableColumnHeader } from "@/Components/data-table-column-header";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

import { Actions } from "./actions";

import { Kriteria } from "@/types";

interface ResponseType {
    id: number;
    kriteria_id: number;
    deskripsi: string;
    nilai: number;
    edit_url: string;
    kriteria: Kriteria;
}

export const columns: ColumnDef<ResponseType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "deskripsi",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Deskripsi" />
        ),
    },
    {
        accessorKey: "kriteria",
        header: "Kriteria",
        cell: ({ row }) => (
            <TooltipProvider delayDuration={50}>
                <Tooltip>
                    <TooltipTrigger>
                        <p>{row.original.kriteria.kode_kriteria}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.original.kriteria.keterangan}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ),
    },
    {
        accessorKey: "nilai",
        header: "Nilai",
        cell: ({ row }) => <div>{row.original.nilai}</div>,
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <Actions id={row.original.id} edit_url={row.original.edit_url} />
        ),
    },
];
