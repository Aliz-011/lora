import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useState } from "react";

import { Input } from "@/Components/ui/input";
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

import { SubKriteria } from "@/types";

const formSchema = z.object({
    kriteria_id: z.coerce.number(),
    deskripsi: z.string().min(2),
    nilai: z.coerce.number().gt(0),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    id?: number;
    defaultValues?: SubKriteria;
    options: {
        value: number;
        label: string;
    }[];
};

const SubKriteriaForm = ({ defaultValues, id, options }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            deskripsi: "",
            nilai: 0,
        },
    });

    const handleSubmit = (values: FormValues) => {
        try {
            setIsLoading(true);
            if (!!id) {
                router.patch(`/subkriterias/${id}`, { ...values }),
                    {
                        onSuccess: () => toast.success("Sub kriteria updated!"),
                        forceFormData: true,
                    };
            } else {
                router.post("/subkriterias", values),
                    {
                        onSuccess: () => toast.success("Sub kriteria created!"),
                        forceFormData: true,
                    };
                console.log({ values });
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormField
                        name="kriteria_id"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kode kriteria</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kriteria" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {options.map((kriteria) => (
                                            <SelectItem
                                                key={kriteria.value}
                                                value={kriteria.value.toString()}
                                            >
                                                {kriteria.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="deskripsi"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Deskripsi</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Deskripsi..."
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
                    name="nilai"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nilai</FormLabel>
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
                    {!!id ? "Save changes" : "Create sub kriteria"}
                </Button>
            </form>
        </Form>
    );
};

export default SubKriteriaForm;
