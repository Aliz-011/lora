import { useCallback, useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AlternatifForm from "./alternatif-form";

import { Alternatif, PageProps } from "@/types";
import { useIsMounted } from "usehooks-ts";

const Edit = ({ auth, ziggy }: PageProps) => {
    const isMounted = useIsMounted();

    const [alternatif, setAlternatif] = useState<Alternatif | undefined>(
        undefined
    );
    const id = useMemo(() => {
        const splitUrl = ziggy.location.split("/")[4];
        return parseInt(splitUrl, 10);
    }, [ziggy.location]);

    const getAlternatif = useCallback(async () => {
        const res = await axios.get(`/api/alternatifs/${id}`);
        const data = res.data;
        if (res.status === 200) {
            setAlternatif(data);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            getAlternatif();
        }
    }, [id, getAlternatif]);

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
                        <AlternatifForm id={id} defaultValues={alternatif} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
