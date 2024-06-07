import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel,
} from "@/Components/ui/form";
import { Kriteria, Penilaian, SubKriteria } from "@/types";

const formSchema = z.object({
    alternatif_id: z.coerce.number().nonnegative(),
    nilai: z.array(z.coerce.number()),
    kriteria_id: z.array(z.coerce.number()),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    id?: number;
    defaultValues?: {
        alternatif_id: number;
        nilai: number;
        kriteria_id: number[];
    };
    alternatifOptions: {
        value: number;
        label: string;
    }[];
    subkriterias: (SubKriteria & { kriteria: Kriteria })[];
    kriterias: Kriteria[];
};

type PageProps = {
    flash?: {
        success?: string;
        error?: string;
    };
    errors?: Record<string, string>;
};

const PenilaianForm = ({
    defaultValues,
    id,
    alternatifOptions,
    kriterias,
    subkriterias,
}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { flash, errors } = usePage<PageProps>().props;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            alternatif_id: 0,
            nilai: new Array(kriterias.length).fill(0),
            kriteria_id: kriterias.map((kriteria) => kriteria.id),
        },
    });

    const handleSubmit = (values: FormValues) => {
        try {
            setIsLoading(true);
            router.post("/penilaians", values),
                {
                    onSuccess: () => toast.success("Penilaian created!"),
                    forceFormData: true,
                };
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        } else if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    useEffect(() => {
        if (errors) {
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    toast.error(errors[key]);
                }
            }
        }
    }, [errors]);

    return (
        isMounted && (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        name="alternatif_id"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Alternatif</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih alternatif" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {alternatifOptions.map((alternatif) => (
                                            <SelectItem
                                                key={alternatif.value}
                                                value={alternatif.value.toString()}
                                            >
                                                {alternatif.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                                                                    value={item.id.toString()}
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
                    <Button disabled={isLoading}>
                        {!!id ? "Save changes" : "Add penilaian"}
                    </Button>
                </form>
            </Form>
        )
    );
};

export default PenilaianForm;
