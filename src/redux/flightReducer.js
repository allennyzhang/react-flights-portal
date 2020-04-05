import { ActionTypes } from './actions';

const initialState =
{
    flights: [],
    pageRecords: [],
    hasError: false,
    isLoading: false,
}

export const flightReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_FLIGHT: {
            return {
                ...state, flights: action.payload, pageRecords: action.payload
            };
        }
        case ActionTypes.SET_IS_LOADING: {
            return {
                ...state, isLoading: action.payload
            }
        }
        case ActionTypes.SET_HAS_ERROR: {
            return {
                ...state, hasError: action.payload
            }
        }
        case ActionTypes.SET_PAGE_RECORDS: {
            return {
                ...state, pageRecords: action.payload
            };
        }
        default:
            return state;
    }
};