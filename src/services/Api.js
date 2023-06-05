import axios from "axios";

export const getListCountry = async (searchParams) => {
    try {
        const data = await axios.get(`https://restcountries.com/v3.1/name/${searchParams}`);
        return data
    } catch (error) {
        console.log(error);
    }
};