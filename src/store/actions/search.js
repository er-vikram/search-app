import axios from '../../axios-admin';
import * as actionTypes from './actionTypes';
import config from './searchConfig.json';

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_START
    };
};

export const setSearchResult = ( data, serachString ) => {
    return {
        type: actionTypes.SET_SEARCH_RESULT,
        data: data,
        serachString: serachString
    };
};

export const fetchSearchResultFailed = () => {
    return {
        type: actionTypes.FETCH_SEARCH_RESULT_FAILED
    };
};

export const fetchSearchResult = (serachString) => {

    return dispatch => {

        dispatch(fetchStart());
        
        axios({
            method: 'get',
            url: `http://3.122.7.162:5000/v60/admin/search/user?keyword=${serachString}&alias=${config.alias}`,
            withCredentials: true
        })
        .then( response => {
            dispatch( setSearchResult( response.data, serachString ) );
        } )
        .catch( error => {
            dispatch( fetchSearchResultFailed() );
        } );
    };
};