import { Head } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

import { PageProps } from "@/types";

interface NilaiAkhir {
    [key: string]: number;
}

const Home = ({ nilai_akhir }: PageProps<{ nilai_akhir: NilaiAkhir }>) => {
    const sortedEntries = Object.entries(nilai_akhir).sort(
        ([, valueA], [, valueB]) => valueB - valueA
    );
    return (
        <Authenticated>
            <Head>
                <title>Hasil</title>
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
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Alternatif
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nilai
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Ranking
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedEntries.map(([name, value], index) => (
                                    <tr className="bg-whit" key={value}>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {name}
                                        </th>
                                        <td className="px-6 py-4">{value}</td>
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
};

export default Home;
