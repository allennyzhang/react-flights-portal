import axios from 'axios';

export const ActionTypes = {
    FETCH_FLIGHT: 'FETCH_FLIGHT',
    SET_HAS_ERROR: 'SET_HAS_ERROR',
    SET_IS_LOADING: 'SET_IS_LOADING',
};

const fetchFlight = payload => ({
    type: ActionTypes.FETCH_FLIGHT,
    payload
})

const setHasError = payload => ({
    type: ActionTypes.SET_HAS_ERROR,
    payload
})

const setIsLoading = payload => ({
    type: ActionTypes.SET_IS_LOADING,
    payload
})

export function fetchFlightAsyn(url) {
    return (dispatch) => {
        dispatch(setIsLoading(true));

        axios.get(url)
            .then(resp => {
                dispatch(fetchFlight(resp.data));
                dispatch(setIsLoading(false));
            })
            .catch(err => {
                dispatch(setHasError(true));
            });
    };
}

export const Actions = {
    fetchFlightAsyn,
};