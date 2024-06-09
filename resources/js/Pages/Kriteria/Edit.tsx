import { useIsMounted } from "usehooks-ts";
import { Head } from "@inertiajs/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import KriteriaForm from "./kriteria-form";

import { Kriteria, PageProps } from "@/types";

const Edit = ({ kriteria }: PageProps<{ kriteria: Kriteria }>) => {
    const isMounted = useIsMounted();

    if (!isMounted) return null;

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Edit Kriteria</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>
                            Edit{" "}
                            {kriteria &&
                                `${kriteria.kode_kriteria} ${kriteria.keterangan}`}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <KriteriaForm
                            id={kriteria.id}
                            defaultValues={kriteria}
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
