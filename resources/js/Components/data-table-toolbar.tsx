import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/Components/ui/button";
import { DataTableFacetedFilter } from "@/Components/data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export const statuses = [
    {
        value: "pinjaman",
        label: "Pinjaman",
    },
    {
        value: "jaminan",
        label: "Jaminan",
    },
    {
        value: "angsuran",
        label: "Angsuran",
    },
    {
        value: "status",
        label: "Status",
    },
];

export const priorities = [
    {
        label: "Cost",
        value: "cost",
    },
    {
        label: "Benefit",
        value: "benefit",
    },
];

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <>
            {table.getColumn("keterangan") && (
                <DataTableFacetedFilter
                    column={table.getColumn("keterangan")}
                    title="Keterangan"
                    options={statuses}
                />
            )}
            {table.getColumn("jenis") && (
                <DataTableFacetedFilter
                    column={table.getColumn("jenis")}
                    title="Jenis"
                    options={priorities}
                />
            )}
            {isFiltered && (
                <Button
                    variant="ghost"
                    onClick={() => table.resetColumnFilters()}
                    className="h-8 px-2 lg:px-3"
                >
                    Reset
                    <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
            )}
        </>
    );
}
