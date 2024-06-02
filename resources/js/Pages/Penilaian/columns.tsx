import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/Components/ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { DataTableColumnHeader } from "@/Components/data-table-column-header";
import { Actions } from "./actions";

import { Alternatif, Kriteria, Penilaian } from "@/types";

type ResponseType = Penilaian & { kriteria: Kriteria; alternatif: Alternatif };

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
        accessorKey: "nilai",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nilai" />
        ),
    },
    {
        accessorKey: "alternatif",
        header: "Alternatif",
        cell: ({ row }) => <div>{row.original.alternatif.nama}</div>,
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
        id: "actions",
        cell: ({ row }) => (
            <Actions id={row.original.id} edit_url={row.original.edit_url} />
        ),
    },
];
