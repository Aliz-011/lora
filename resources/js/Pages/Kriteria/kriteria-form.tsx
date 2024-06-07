import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel,
} from "@/Components/ui/form";

import { Kriteria } from "@/types";

const formSchema = z.object({
    keterangan: z.string().min(1, {
        message: "Tolong masukkan keterangan",
    }),
    kode_kriteria: z.string().min(2),
    bobot: z.coerce.number().gt(0),
    jenis: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    id?: number;
    defaultValues?: Kriteria;
};

type PageProps = {
    flash?: {
        success?: string;
        error?: string;
    };
    errors?: Record<string, string>;
};

const KriteriaForm = ({ defaultValues, id }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { flash, errors } = usePage<PageProps>().props;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            keterangan: "",
            jenis: "",
            kode_kriteria: "",
            bobot: 0,
        },
    });

    const handleSubmit = (values: FormValues) => {
        try {
            setIsLoading(true);
            if (!!id) {
                router.patch(`/kriterias/${id}`, { ...values }),
                    {
                        onSuccess: () => toast.success("Kriteria updated!"),
                        forceFormData: true,
                    };
            } else {
                router.post("/kriterias", { ...values }),
                    {
                        onSuccess: () => toast.success("Kriteria created!"),
                        forceFormData: true,
                    };
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                        name="kode_kriteria"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kode kriteria</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. A1"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="keterangan"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Keterangan</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Jaminan"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    name="jenis"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Jenis</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. Cost"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="bobot"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bobot</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. 20"
                                    type="number"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading}>
                    {!!id ? "Save changes" : "Create kriteria"}
                </Button>
            </form>
        </Form>
    );
};

export default KriteriaForm;
