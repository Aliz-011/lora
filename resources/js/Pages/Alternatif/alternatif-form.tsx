import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

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

const AlternatifForm = ({ defaultValues, id }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

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
                        onSuccess: () => toast.success("Alternatif updated!"),
                        forceFormData: true,
                    };
            } else {
                router.post("/alternatifs", values),
                    {
                        onSuccess: () => toast.success("Alternatif created!"),
                        forceFormData: true,
                    };
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
