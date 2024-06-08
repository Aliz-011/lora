import { usePage } from "@inertiajs/react";
import KriteriaBox from "./kriteria-box";
import {
    CirclePercent,
    Maximize,
    PersonStanding,
    MapPin,
    Accessibility,
    Trees,
    KeyRound,
    Box,
    Building2,
} from "lucide-react";

export const kriterias = [
    {
        label: "Harga",
        icon: CirclePercent,
        description: "This property is close to the beach!",
    },
    {
        label: "Luas Bangunan",
        icon: Building2,
        description: "This property is has windmills!",
    },
    {
        label: "Fasilitas",
        icon: PersonStanding,
        description: "This property is modern!",
    },
    {
        label: "Lokasi",
        icon: MapPin,
        description: "This property is in the countryside!",
    },
    {
        label: "Aksesibilitas",
        icon: Accessibility,
        description: "This is property has a beautiful pool!",
    },
    {
        label: "Lingkungan",
        icon: Trees,
        description: "This property is on an island!",
    },
    {
        label: "Keamanan",
        icon: KeyRound,
        description: "This property is near a lake!",
    },
    {
        label: "Ruangan",
        icon: Box,
        description: "This property has skiing activies!",
    },
    {
        label: "LuasTanah",
        icon: Maximize,
        description: "This property is an ancient castle!",
    },
];

const Kriteria = () => {
    const { url } = usePage();

    return (
        <div className="max-w-[2520px] xl:px-20 md:px-10 sm:px-2 px-4 mx-auto w-full">
            <div className="pt-4 flex items-center justify-between overflow-x-auto">
                {kriterias.map((kriteria) => (
                    <KriteriaBox
                        key={kriteria.label}
                        label={kriteria.label}
                        selected={false}
                        icon={kriteria.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default Kriteria;
