export const formatLatlong = (number) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}   