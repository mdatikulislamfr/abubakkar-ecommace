import { ProductVariant } from "../../../@types/table.js";
import { VarientModel } from "../../Models/varient.model.js";


// get
type Operator =
    | "="
    | "!="
    | ">"
    | ">="
    | "<"
    | "<="
    | "like";

export const getVarientsBy = async (field: keyof ProductVariant, operator: Operator, value: string | number | boolean | null): Promise<ProductVariant[]> => {
    return await VarientModel
        .table()
        .where(field as string, operator, value)
        .whereNull("deleted_at");
};

// Create
export const createVarient = (data: ProductVariant[]) => {
    return VarientModel.table().insert(data);
};

// Update
export const updateVarient = (id: number, data: Partial<ProductVariant>) => {
    return VarientModel
        .table()
        .where({ id })
        .update(data);
};

// Delete
export const deleteVarient = (id: number) => {
    return VarientModel
        .table()
        .where({ id })
        .update({
            deleted_at: new Date(),
        });
};