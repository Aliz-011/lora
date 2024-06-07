import { Head } from "@inertiajs/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AlternatifForm from "./alternatif-form";

import { Alternatif, PageProps } from "@/types";
import { useIsMounted } from "usehooks-ts";

const Edit = ({ alternatif }: PageProps<{ alternatif: Alternatif }>) => {
    const isMounted = useIsMounted();

    if (!isMounted) return null;

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Edit alternatif</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>
                            Edit {alternatif && alternatif.nama}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AlternatifForm
                            id={alternatif.id}
                            defaultValues={alternatif}
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
