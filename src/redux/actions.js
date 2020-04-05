import axios from 'axios';

export const ActionTypes = {
    FETCH_FLIGHT: 'FETCH_FLIGHT',
    SET_HAS_ERROR: 'SET_HAS_ERROR',
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_PAGE_RECORDS: 'SET_PAGE_RECORDS',
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

const setPageRecords = payload => ({
    type: ActionTypes.SET_PAGE_RECORDS,
    payload
})

export function fetchFlightAsyn(departure, arrival, departureTime, arrivalTime, type) {
    const urlCheap = "https://tokigames-challenge.herokuapp.com/api/flights/cheap";
    const urlBusiness = "https://tokigames-challenge.herokuapp.com/api/flights/business";
    const url = type === "cheap" ? urlCheap : urlBusiness;

    return (dispatch) => {
        dispatch(setIsLoading(true));

        axios.get(url)
            .then(resp => {
                let flights = resp.data.data;

                if (departure) {
                    flights = flights.filter(x => x.departure.toLowerCase().trim() === departure.toLowerCase().trim());

                    if (arrival) {
                        flights = flights.filter(x => x.arrival.toLowerCase().trim() === arrival.toLowerCase().trim());
                    }

                    if (arrival) {
                        flights = flights.filter(x => x.departureTime === departureTime);
                    }

                    if (arrival) {
                        flights = flights.filter(x => x.arrivalTime === arrivalTime);
                    }
                }

                dispatch(fetchFlight(flights));
                dispatch(setIsLoading(false));
            })
            .catch(err => {
                dispatch(setHasError(true));
            });
    };
}

export const Actions = {
    fetchFlightAsyn,
    setPageRecords,
};