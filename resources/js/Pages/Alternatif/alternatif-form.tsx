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
import { Alternatif } from "@/types";

const formSchema = z.object({
    nama: z.string().min(1, {
        message: "Tolong masukkan nama",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    id?: number;
    defaultValues?: Alternatif;
};

type PageProps = {
    flash?: {
        success?: string;
        error?: string;
    };
    errors?: Record<string, string>;
};

const AlternatifForm = ({ defaultValues, id }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { flash, errors } = usePage<PageProps>().props;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            nama: "",
        },
    });

    const handleSubmit = (values: FormValues) => {
        try {
            setIsLoading(true);
            if (!!id) {
                router.patch(`/alternatifs/${id}`, { ...values }),
                    {
                        forceFormData: true,
                    };
            } else {
                router.post("/alternatifs", values),
                    {
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
                <FormField
                    name="nama"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. Jaya Asri"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading}>
                    {!!id ? "Save changes" : "Create alternatif"}
                </Button>
            </form>
        </Form>
    );
};

export default AlternatifForm;
