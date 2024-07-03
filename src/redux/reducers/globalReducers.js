import { GET_USERS, GET_ALL_LANGUAGE_LIST, GET_ALL_QUESTION_LIST, GET_ALL_COUNTRIES, SET_COUNTRY_ITEM, SET_SEARCH_COUNTRY } from "../types";
import * as constants from '../../utils/constants';
import { isEmpty } from "lodash";

const initialState = {
    getallusers: [],
    getalllanguagelist: constants?.langlist,
    getallquestions: constants?.questions,
    getallcountries: [],
    searchCountry: "",
    countryItem: {
        code: "IN",
        dial_code: "+91",
        name: "India"
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                getallusers: action.payload,
            };
        case GET_ALL_LANGUAGE_LIST:
            return {
                ...state,
                getalllanguagelist: state.getalllanguagelist,
            };
        case GET_ALL_QUESTION_LIST:
            return {
                ...state,
                getallquestions: state.getallquestions,
            };
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                getallcountries: action?.payload,
            };
        case SET_COUNTRY_ITEM:
            return {
                ...state,
                countryItem: action?.payload,
            };
        case SET_SEARCH_COUNTRY:
            return {
                ...state,
                searchCountry: action?.payload,
            };
        default:
            return state;
    }
}

export default reducer;