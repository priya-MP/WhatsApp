import {
    GET_USERS,
    GET_ALL_LANGUAGE_LIST,
    GET_ALL_QUESTION_LIST,
    GET_ALL_COUNTRIES,
    SET_COUNTRY_ITEM,
    SET_SEARCH_COUNTRY,
    SET_CHAT_ITEM,
    SET_CHAT_HISTORY,
    SET_LOGGED_USER
} from "../types";
import * as constants from '../../utils/constants';

const initialState = {
    getallusers: [],
    getalllanguagelist: constants?.langlist,
    getallquestions: constants?.questions,
    getallcountries: [],
    searchCountry: "",
    getLoggedUser: {},
    chatHistory: [],
    loggedIn: false,
    chatItem: {
        type: '',
        message: '',
        userId: '',
        isTyping: false
    },
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
        case SET_CHAT_ITEM:
            return {
                ...state,
                chatItem: action?.payload,
            };
        case SET_CHAT_HISTORY:
            return {
                ...state,
                chatHistory: action?.payload,
            };
        case SET_LOGGED_USER:
            return {
                ...state,
                loggedIn: action?.payload ? true : false,
                getLoggedUser: action?.payload,
            };
        default:
            return state;
    }
}

export default reducer;