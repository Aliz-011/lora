import { Head } from "@inertiajs/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SubKriteriaForm from "./sub-kriteria-form";

import { Kriteria, PageProps, SubKriteria } from "@/types";

const Edit = ({
    kriterias,
    data,
}: PageProps<{ kriterias: Kriteria[]; data: SubKriteria }>) => {
    const formattedKriterias = kriterias.map((kriteria) => ({
        value: kriteria.id,
        label: `${kriteria.kode_kriteria} ${kriteria.keterangan}`,
    }));

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Edit sub kriteria</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>Edit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SubKriteriaForm
                            id={data.id}
                            options={formattedKriterias}
                            defaultValues={data}
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
