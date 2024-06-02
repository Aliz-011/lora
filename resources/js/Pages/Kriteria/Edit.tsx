import { useCallback, useEffect, useMemo, useState } from "react";
import { useIsMounted } from "usehooks-ts";
import { Head } from "@inertiajs/react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import KriteriaForm from "./kriteria-form";

import { Kriteria, PageProps } from "@/types";

const Edit = ({ auth, ziggy }: PageProps) => {
    const isMounted = useIsMounted();

    const [kriteria, setKriteria] = useState<Kriteria | undefined>(undefined);
    const id = useMemo(() => {
        const splitUrl = ziggy.location.split("/")[4];
        return parseInt(splitUrl, 10);
    }, [ziggy.location]);

    const getKriteria = useCallback(async () => {
        const res = await axios.get(`/api/kriterias/${id}`);
        const data = res.data;
        if (res.status === 200) {
            setKriteria(data);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            getKriteria();
        }
    }, [id, getKriteria]);

    if (!isMounted) return null;

    return (
        <AuthenticatedLayout>
            <Head>
                <title>New alternatif</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>
                            Edit {kriteria && kriteria.keterangan}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <KriteriaForm id={id} defaultValues={kriteria} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
