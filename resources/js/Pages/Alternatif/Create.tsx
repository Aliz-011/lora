import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { PageProps } from "@/types";
import AlternatifForm from "./alternatif-form";
import { Head } from "@inertiajs/react";

const Create = ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout>
            <Head>
                <title>New alternatif</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>New alternatif page</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AlternatifForm />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
