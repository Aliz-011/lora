import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { router, usePage } from "@inertiajs/react";
import qs from "query-string";

import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
} from "@/Components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
} from "@/Components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";

import { Kriteria, SubKriteria } from "@/types";

const formSchema = z.object({
    alternatif_id: z.coerce.number().nonnegative(),
    nilai: z.array(z.coerce.number()),
    kriteria_id: z.array(z.coerce.number()),
});

type FormValues = z.infer<typeof formSchema>;

const Search = () => {
    const { kriterias, subkriterias } = usePage<{
        subkriterias: (SubKriteria & { kriteria: Kriteria })[];
        kriterias: Kriteria[];
    }>().props;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            alternatif_id: 21,
            nilai: new Array(kriterias.length).fill(0),
            kriteria_id: kriterias.map((kriteria) => kriteria.id),
        },
    });

    const handleSubmit = (values: FormValues) => {
        const { alternatif_id, kriteria_id, nilai } = values;

        const queryParams = {
            alternatif_id,
            kriteria_id,
            nilai,
        };

        const url = qs.stringifyUrl(
            {
                url: `/perhitungan?${queryParams}`,
                query: queryParams,
            },
            {
                skipEmptyString: true,
                skipNull: true,
                arrayFormat: "index",
            }
        );

        router.visit(url);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="icon" className="rounded-full">
                    <MagnifyingGlassIcon className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rekomendasi rumah</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {kriterias.map((kriteria, index) => {
                                const subKriteriaOptions = subkriterias.filter(
                                    (item) => item.kriteria.id === kriteria.id
                                );
                                return (
                                    <div key={kriteria.id}>
                                        <input
                                            type="number"
                                            value={kriteria.id}
                                            {...form.register(
                                                `kriteria_id.${index}`
                                            )}
                                            hidden
                                        />

                                        <FormField
                                            name={`nilai.${index}`}
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {kriteria.keterangan}
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    placeholder={`Pilih ${kriteria.keterangan}`}
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {subKriteriaOptions.map(
                                                                (item) => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        value={item.nilai.toString()}
                                                                    >
                                                                        {
                                                                            item.deskripsi
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <Button className="w-full">Cari</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default Search;
