export const mapListCurrentData = (data) => {
    const { idd, currencies } = data;
    const rootWithoutPlus = idd?.root.replace("+", "");
    const iddWithoutPlus = rootWithoutPlus + idd?.suffixes.join("")
    const currency = Object.keys(currencies)[0];
    const mappedData = {
        altSpellings: data?.altSpellings,
        name: data?.name.common,
        flags: data?.flags.svg,
        lat: data?.latlng[0],
        lang: data?.latlng[1],
        capital: data?.capital[0],
        region: data?.region,
        subregion: data?.subregion,
        idd: iddWithoutPlus,
        currencies: currency
    };
    return mappedData;
};