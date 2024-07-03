import axios from "axios";
import { GET_ALL_COUNTRIES, SET_COUNTRY_ITEM, SET_SEARCH_COUNTRY } from '../types';

const getUsers = async () => {
    const response = await fetch("https://dummy.restapiexample.com/api/v1/employees");
    const users = await response.json();
    return users
}

// ** GET Countries ** //
const customGetAllCountries = (response) => {
    return {
        type: GET_ALL_COUNTRIES,
        payload: response
    }
}
const getAllCountries = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json');
            const data = response.data;
            dispatch(customGetAllCountries(data));
            return data;
        } catch (error) {
            return error; // Rethrow the error to be caught by the caller if needed
        }
    };
};

const SetCountryItem = (data) => {
    return {
        type: SET_COUNTRY_ITEM,
        payload: data
    }
}

const SetSearchCountry = (data) => {
    return {
        type: SET_SEARCH_COUNTRY,
        payload: data
    }
}

export {
    getAllCountries,
    getUsers,
    SetCountryItem,
    SetSearchCountry
}