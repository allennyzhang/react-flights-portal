import { ActionTypes } from './actions';

const initialState =
{
    flights: [],
    hasError: false,
    isLoading: false,
}

export const FlightReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_FLIGHT: {
            return {
                ...state, flights: action.payload.data
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
        default:
            return state;
    }
};