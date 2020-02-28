import axios from 'axios';
import { API_ROOT, CLIENT_ID } from '../constants/service-info';

/* -------------action type----------------*/
export const GET_PHOTOS = 'GET_PHOTOS';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const CLEAR_PHOTOS = 'CLEAR_PHOTOS';
export const GET_ERRORS = 'GET_ERRORS';

/* -------------action creators------------*/

export const onGetPhotos = (options) => async (dispatch) => {
    dispatch({
      type: GET_PHOTOS
    });
    const { query, page, per_page, url } = options;
    const clientID = `client_id=${CLIENT_ID}`
    const photoQuery = clientID + '' 
                + `&page=${page ? page : 1}`
                + `&per_page=${per_page ? per_page : 10}`;
  
    try {
        const res = await axios.get(`${API_ROOT}/${url}?${photoQuery}`);
        const { data } = res;
        dispatch(setBuildingsStore(data, page));
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: null
        });
    }
}
  
export const onClearPhotos = () => dispatch => {
    dispatch({
    type: CLEAR_PHOTOS
    })
}
  
export const setBuildingsStore = (decoded, page) => {
    return {
        type: GET_PHOTOS_SUCCESS,
        payload: decoded,
        page: page + 1
    }
}

/*----------------initialState-------------*/

const initialState = {
    photos: [],
    page: 1,
    isLoading: false,
    isError: false
}
/*-----------------reducers----------------*/

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: [
                    ...state.photos,
                    ...action.payload
                ],
                page: action.page,
                isLoading: false,
                isError: false
            }
        case CLEAR_PHOTOS:
            return {
                ...state,
                photos: [],
                page: 1,
                isLoading: false,
                isError: true
            }
        default: 
            return state;
    }
}
