import React from "react";

const HouseCard = () => {
    return (
        <div className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog-imgs-55-origin.fc2.com%2Fl%2Fu%2Fx%2Fluxuryhomes%2FBig-Homes-4.jpg&f=1&nofb=1&ipt=9b1341555b36660134eef26e7e52a584da1035341e183e78e08d6842b7772de7&ipo=images"
                        alt="listings"
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                </div>

                <h4 className="font-semibold text-lg">
                    Perumahan Vidi Regency 2 (Tanah Hitam)
                </h4>
                <span className="font-light text-neutral-500">
                    Luas: 120 m<sup>2</sup>
                </span>
                <div className="flex items-center gap-1">
                    <span className="font-semibold">Rp. 550.000.000</span>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;
