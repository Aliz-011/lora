import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/Components/ui/checkbox";
import { Actions } from "./actions";

import { Alternatif } from "@/types";

// type ResponseType = Penilaian & { kriteria: Kriteria; alternatif: Alternatif };

export const columns: ColumnDef<Alternatif>[] = [
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
        accessorKey: "nama",
        header: "Alternatif",
        cell: ({ row }) => <div>{row.original.nama}</div>,
    },
    // {
    //     accessorKey: "kriteria",
    //     header: "Kriteria",
    //     cell: ({ row }) => (
    //         <TooltipProvider delayDuration={50}>
    //             <Tooltip>
    //                 <TooltipTrigger>
    //                     <p>{row.original.kriteria.kode_kriteria}</p>
    //                 </TooltipTrigger>
    //                 <TooltipContent>
    //                     <p>{row.original.kriteria.keterangan}</p>
    //                 </TooltipContent>
    //             </Tooltip>
    //         </TooltipProvider>
    //     ),
    // },
    {
        id: "actions",
        cell: ({ row }) => (
            <Actions id={row.original.id} edit_url={row.original.edit_url} />
        ),
    },
];
