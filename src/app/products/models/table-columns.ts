interface TableFields {
    label: string;
    type?: "string" | "currency";
}
export type TableColumns<T> = Record<keyof T, TableFields>;