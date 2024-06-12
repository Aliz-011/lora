import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
    email_verified_at: string;
}

export type Alternatif = {
    id: number;
    nama: string;
    keterangan?: string;
    img?: string;
    edit_url: string;
};

export type Kriteria = {
    id: number;
    keterangan: string;
    kode_kriteria: string;
    bobot: number;
    jenis: string;
    edit_url: string;
};

export type SubKriteria = {
    id: number;
    kriteria_id: number;
    deskripsi: string;
    nilai: number;
    edit_url: string;
};

export type Penilaian = {
    id: number;
    alternatif_id?: number;
    kriteria_id?: number;
    nilai: number;
    edit_url: string;
};

export type PaginatedData<T> = {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;

        links: {
            url: null | string;
            label: string;
            active: boolean;
        }[];
    };
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
