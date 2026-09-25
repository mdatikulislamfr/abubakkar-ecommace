export const toBanglaNumber = (text) => {
    const inputStr = String(text);
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const result = inputStr.replace(/[0-9]/g, (digit) => {
        return banglaNumbers[Number(digit)];
    });
    return result;
};
//# sourceMappingURL=toBanglaNumber.js.map