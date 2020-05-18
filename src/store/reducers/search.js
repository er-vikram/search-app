import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    data: [],
    searchString: "",
    error: false,
    loading: false
};

const fetchStart = ( state ) => {
    return updateObject( state, { error: false, loading: true } );
};

const setSearchResult = (state, action) => {
    return updateObject( state, {
        data: [
            ...action.data
        ],
        searchString: action["serachString"],
        error: false,
        loading: false
    } );
};

const fetchSearchResultFailed = (state) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_START: return fetchStart(state);
        case actionTypes.SET_SEARCH_RESULT: return setSearchResult(state, action);    
        case actionTypes.FETCH_SEARCH_RESULT_FAILED: return fetchSearchResultFailed(state, action);
        default: return state;
    }
};

export default reducer;