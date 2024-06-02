import { Plus } from "lucide-react";
import { Head, Link, usePage } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

import {
    Alternatif,
    Kriteria,
    PageProps,
    PaginatedData,
    Penilaian,
} from "@/types";
import { columns } from "./columns";

const Home = ({ create_url }: PageProps<{ create_url: string }>) => {
    const { penilaians } = usePage<{
        penilaians: PaginatedData<
            Penilaian & { kriteria: Kriteria; alternatif: Alternatif }
        >;
    }>().props;

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Penilaian</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>Penilaian page</CardTitle>
                        <Button size="sm" asChild>
                            <Link href={create_url}>
                                <Plus className="size-4 mr-2" />
                                New penilaian
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            data={penilaians.data}
                            columns={columns}
                            filterKey="nilai"
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Home;
