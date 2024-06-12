import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState, useEffect, ChangeEvent } from "react";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormMessage,
    FormLabel,
    FormDescription,
} from "@/Components/ui/form";
import { Alternatif } from "@/types";
import { Textarea } from "@/Components/ui/textarea";

const formSchema = z.object({
    nama: z.string().min(1, {
        message: "Tolong masukkan nama",
    }),
    img: z.any(),
    keterangan: z
        .string()
        .min(10, {
            message: "Keterangan must be at least 10 characters.",
        })
        .max(160, {
            message: "Keterangan must not be longer than 160 characters.",
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
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { flash, errors } = usePage<PageProps>().props;

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

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            nama: "",
            keterangan: "",
        },
    });

    const onClose = () => {
        setIsSubmitting(false);
        setFile(undefined);
    };

    const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files[0]);

            setIsSubmitting(true);
            setFile(e.target.files[0]);

            form.setValue("img", e.target.files[0]);

            onClose();
        }
    };

    const handleSubmit = (values: FormValues) => {
        try {
            setIsLoading(true);
            if (id) {
                router.patch(
                    `/alternatifs/${id}`,
                    { ...values },
                    {
                        forceFormData: true,
                    }
                );
            } else {
                router.post(
                    "/alternatifs",
                    { ...values },
                    {
                        forceFormData: true,
                    }
                );
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
                encType="multipart/form-data"
            >
                <FormField
                    name="img"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    id="img"
                                    type="file"
                                    onChange={onChange}
                                    accept="image/*"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="keterangan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Keterangan rumah"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Jelaskan mengenai rumah secara singkat.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading || isSubmitting}>
                    {id ? "Save changes" : "Create alternatif"}
                </Button>
            </form>
        </Form>
    );
};

export default AlternatifForm;
