import { Head } from "@inertiajs/react";

import Guest from "@/Layouts/GuestLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { PageProps } from "@/types";

interface NilaiAkhir {
    [key: string]: number;
}

const Rekomendasi = ({
    nilai_akhir,
}: PageProps<{ nilai_akhir?: NilaiAkhir | null }>) => {
    if (!nilai_akhir) {
        return (
            <Guest>
                <Head>
                    <title>Rekomendasi rumah</title>
                </Head>

                <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                    <Card className="border-none drop-shadow-none w-full">
                        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                            <CardTitle>Rekomendasi rumah</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Alternatif</TableHead>
                                            <TableHead>Nilai</TableHead>
                                            <TableHead>Ranking</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                colSpan={3}
                                                className="h-24"
                                            >
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Guest>
        );
    }

    const sortedEntries = Object.entries(nilai_akhir).sort(
        ([, valueA], [, valueB]) => valueB - valueA
    );

    return (
        <Guest>
            <Head>
                <title>Rekomendasi rumah</title>
            </Head>

            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle>Hasil page</CardTitle>
                        <CardDescription className="text-lg">
                            Rekomendasi rumah
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Alternatif</TableHead>
                                        <TableHead>Nilai</TableHead>
                                        <TableHead>Ranking</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedEntries.map(
                                        ([name, value], index) => (
                                            <TableRow key={value}>
                                                <TableCell className="h-24">
                                                    {name}
                                                </TableCell>
                                                <TableCell className="h-24">
                                                    {value}
                                                </TableCell>
                                                <TableCell className="h-24">
                                                    {index + 1}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Guest>
    );
};

export default Rekomendasi;
