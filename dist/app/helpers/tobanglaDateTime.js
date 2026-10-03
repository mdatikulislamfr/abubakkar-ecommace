export const toBanglaDateTime = (dateTime) => {
    const text = new Date(dateTime.toString()).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return text;
};
//# sourceMappingURL=tobanglaDateTime.js.map