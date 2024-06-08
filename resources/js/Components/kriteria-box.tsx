import { cn } from "@/lib/utils";
import { IconNode, LucideIcon } from "lucide-react";

type Props = {
    icon: LucideIcon;
    label: string;
    selected?: boolean;
};

const KriteriaBox = ({ icon: Icon, label, selected }: Props) => {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
                selected
                    ? "border-b-neutral-800 text-neutral-800"
                    : "border-transparent text-neutral-500"
            )}
        >
            <Icon />
            <span className="font-medium text-sm">{label}</span>
        </div>
    );
};

export default KriteriaBox;
