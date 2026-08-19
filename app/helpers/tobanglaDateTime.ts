export const toBanglaDateTime = (dateTime: string): string => {
    const text = new Date(dateTime.toString()).toLocaleDateString(
        "bn-BD",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
    return text;
}