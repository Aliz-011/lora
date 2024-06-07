import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import PenilaianForm from "./penilaian-form";

import {
    Alternatif,
    Kriteria,
    PageProps,
    Penilaian,
    SubKriteria,
} from "@/types";

const Edit = ({
    penilaian,
    alternatifs,
    subkriterias,
    kriterias,
}: PageProps<{
    penilaian: Penilaian;
    alternatifs: Alternatif[];
    subkriterias: (SubKriteria & { kriteria: Kriteria })[];
    kriterias: Kriteria[];
}>) => {
    const formattedAlternatifs = alternatifs.map((alternatif) => ({
        value: alternatif.id,
        label: alternatif.nama,
    }));

    return (
        <AuthenticatedLayout>
            <Head>
                <title>Edit penilaian</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>Edit page</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PenilaianForm
                            id={penilaian.id}
                            defaultValues={penilaian}
                            kriterias={kriterias}
                            subkriterias={subkriterias}
                            alternatifOptions={formattedAlternatifs}
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
