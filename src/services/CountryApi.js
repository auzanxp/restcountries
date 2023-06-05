import axios from 'axios';
import { mapListCurrentData } from '../mappers/CountryMapper';

const baseURL = 'https://restcountries.com';

const getCountryData = async (searchParams) => {
    const url = `${baseURL}/${searchParams}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getListCountry = async (searchQuery) => {
    try {
        const countries = await getCountryData(`v3.1/name/${searchQuery}`);
        return countries;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

export const getFormattedCountryData = async (keyword) => {
    try {
        const countries = await getCountryData(`v3.1/name/${keyword}?fullText=true`);
        const country = countries[0];
        const mappedCurrentData = mapListCurrentData(country);
        const { idd } = country;
        const rootWithoutPlus = idd.root.replace("+", "");
        const iddWithoutPlus = rootWithoutPlus + idd.suffixes.join("")
        const iddd = iddWithoutPlus
        const currencies = Object.keys(country.currencies)[0];
        const countryData = {
            ...mappedCurrentData
        };
        const [phoneData, currencyData] = await Promise.all([
            getApiByPhoneNumber(iddd),
            getApiByCurrency(currencies),
        ]);
        countryData.phoneData = phoneData;
        countryData.currencyData = currencyData;
        return countryData;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

const getApiByPhoneNumber = async (number) => {
    try {
        const response = await axios.get(`${baseURL}/v2/callingcode/${number}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

const getApiByCurrency = async (currencyCode) => {
    try {
        const response = await axios.get(`${baseURL}/v2/currency/${currencyCode}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

