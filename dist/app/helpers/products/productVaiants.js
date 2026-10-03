import { VarientModel } from "../../Models/varient.model.js";
export const getVarientsBy = async (field, operator, value) => {
    return await VarientModel
        .table()
        .where(field, operator, value)
        .whereNull("deleted_at");
};
// Create
export const createVarient = (data) => {
    return VarientModel.table().insert(data);
};
// Update
export const updateVarient = (id, data) => {
    return VarientModel
        .table()
        .where({ id })
        .update(data);
};
// Delete
export const deleteVarient = (id) => {
    return VarientModel
        .table()
        .where({ id })
        .update({
        deleted_at: new Date(),
    });
};
//# sourceMappingURL=productVaiants.js.map