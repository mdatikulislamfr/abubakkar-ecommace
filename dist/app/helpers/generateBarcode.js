import bwipjs from "bwip-js";
const generateBarcode = async (value) => {
    const barcode = await bwipjs.toBuffer({
        bcid: "code128",
        text: value,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: "center",
    });
    return barcode;
};
export default generateBarcode;
//# sourceMappingURL=generateBarcode.js.map