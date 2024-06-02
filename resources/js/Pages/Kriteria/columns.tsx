import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/Components/ui/checkbox";
import { Actions } from "./actions";

import { DataTableColumnHeader } from "@/Components/data-table-column-header";

import { Kriteria } from "@/types";

export const columns: ColumnDef<Kriteria>[] = [
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
        accessorKey: "kode_kriteria",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kode Kriteria" />
        ),
    },
    {
        accessorKey: "keterangan",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keterangan" />
        ),
    },
    {
        accessorKey: "jenis",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jenis" />
        ),
    },
    {
        accessorKey: "bobot",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bobot" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <Actions id={row.original.id} edit_url={row.original.edit_url} />
        ),
    },
];
