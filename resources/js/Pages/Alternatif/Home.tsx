import { Head, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { columns } from "./columns";

import { Alternatif, PageProps } from "@/types";

const Home = ({
    auth,
    alternatifs,
    create_url,
}: PageProps<{ alternatifs: Alternatif[]; create_url: string }>) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head>
                <title>Alternatif</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>Alternatif page</CardTitle>
                        <Button size="sm" asChild>
                            <Link href={create_url}>
                                <Plus className="size-4 mr-2" />
                                New alternatif
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            data={alternatifs}
                            columns={columns}
                            filterKey="nama"
                        />
                        <div>Home</div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Home;
