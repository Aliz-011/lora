import { Head } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

import { Alternatif, Kriteria, PageProps, SubKriteria } from "@/types";
import PenilaianForm from "./penilaian-form";

const Create = ({
    auth,
    alternatifs,
    subkriterias,
    kriterias,
}: PageProps<{
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
                <title>New penilaian</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>New penilaian page</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PenilaianForm
                            alternatifOptions={formattedAlternatifs}
                            kriterias={kriterias}
                            subkriterias={subkriterias}
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
