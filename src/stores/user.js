import axios from 'axios';
import { API_ROOT, CLIENT_ID } from '../constants/service-info';

/* -------------action type----------------*/
export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const SELECT_USER = 'SELECT_USER';
export const SELECT_USER_SUCCESS = 'SELECT_USER_SUCCESS';
export const CLEAR_USERS = 'CLEAR_USERS';
export const GET_ERRORS = 'GET_ERRORS';


/* -------------action creators------------*/
export const onGetUsers = (options) => dispatch => {
    dispatch({
        type: GET_USERS
    });
    const { query, page, per_page, url } = options;
    const clientID = `client_id=${CLIENT_ID}`
    const usersQuery = clientID + `&query=${query ? query : ''}` 
                + `&page=${page ? page : 1}`
                + `&per_page=${per_page ? per_page : 10}`;

    axios.get(`${API_ROOT}/${url}?${usersQuery}`)
        .then(res => {
        const { results } = res.data;
        dispatch(setBuildingsStore(results));
        })
        .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        });
    });
}

export const onSelectUser = (options) => dispatch => {
    dispatch({
        type: SELECT_USER
    });
    const { username } = options;
    const clientID = `client_id=${CLIENT_ID}`

    axios.get(`${API_ROOT}/users/${username}?${clientID}`)
        .then(res => {
        const { data } = res;
        dispatch(setUserBuildingsStore(data));
        })
        .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: null
        });
    });
}

export const onClearUsers = () => dispatch => {
    dispatch({
        type: CLEAR_USERS
    })
}

export const setUserBuildingsStore = decoded => {
    return {
        type: SELECT_USER_SUCCESS,
        payload: decoded
    }
}

export const setBuildingsStore = decoded => {
    return {
        type: GET_USERS_SUCCESS,
        payload: decoded
    }
}

/*----------------initialState-------------*/
const initialState = {
    users: null,
    selectedUser: null,
    username: null,
    isLoading: false,
    isError: false
}
/*-----------------reducers----------------*/

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isLoading: false,
                isError: false
            }
        case SELECT_USER:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case SELECT_USER_SUCCESS:
            return {
                ...state,
                selectedUser: action.payload,
                username: action.payload.username,
                isLoading: false,
                isError: false
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: null,
                selectedUser: null,
                isLoading: false,
                isError: true
            }
        default: 
            return state;
    }
}
  

