import { Plus } from "lucide-react";
import { Head, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

import { Alternatif, PageProps, Penilaian } from "@/types";
import { columns } from "./columns";

const Home = ({
    create_url,
    penilaians,
    alternatifs,
}: PageProps<{
    create_url: string;
    penilaians: Penilaian[];
    alternatifs: (Alternatif & { sum: number })[];
}>) => {
    const newAlternatifs = alternatifs.map((alt) => {
        if (alt.sum > 0) {
            const penilaian = penilaians.find(
                (p) => p.alternatif_id === alt.id
            );
            return {
                id: alt.id,
                nama: alt.nama,
                edit_url: penilaian
                    ? route("penilaians.edit", penilaian.id)
                    : "",
            };
        } else {
            return {
                id: alt.id,
                nama: alt.nama,
                edit_url: route("penilaians.create"),
            };
        }
    });

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
                            data={newAlternatifs}
                            columns={columns}
                            filterKey="nama"
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Home;
