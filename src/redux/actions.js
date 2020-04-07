import axios from 'axios';
import moment from 'moment';

export const ActionTypes = {
    SET_FLIGHTS: 'SET_FLIGHTS',
    SET_HAS_ERROR: 'SET_HAS_ERROR',
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_PAGE_RECORDS: 'SET_PAGE_RECORDS',
    SET_PAGE_SIZE: 'SET_PAGE_SIZE',
    SET_PAGE_INDEX: 'SET_PAGE_INDEX',
    RESET_FLIGHS: 'RESET_FLIGHS',
};

const setFlights = payload => ({
    type: ActionTypes.SET_FLIGHTS,
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

const setPageIndex = payload => ({
    type: ActionTypes.SET_PAGE_INDEX,
    payload
})

const setPageSize = payload => ({
    type: ActionTypes.SET_PAGE_SIZE,
    payload
})

const resetFlights = () => ({
    type: ActionTypes.RESET_FLIGHS
})

export const fetchAllFlightsAsyn = (departure, arrival, departureTime, arrivalTime) => {
    return dispatch => {
        dispatch(setIsLoading(true));
        return Promise.all([
            dispatch(fetchEconomyFlightsAsyn(departure, arrival, departureTime, arrivalTime)),
            dispatch(fetchBusinessFlightsAsyn(departure, arrival, departureTime, arrivalTime)),
        ]).then(
            () => dispatch(setIsLoading(false))
        )
    }
}

export const fetchBusinessFlightsAsyn = (departure, arrival, departureTime, arrivalTime) => {
    const url = "https://tokigames-challenge.herokuapp.com/api/flights/business";

    return dispatch => {
        dispatch(setIsLoading(true));

        return axios.get(url)
            .then(resp => {
                let flights = resp.data.data.map(flight => {
                    return {
                        departure: flight.departure,
                        arrival: flight.arrival,
                        departureTime: new Date(flight.departureTime).toLocaleString(),
                        arrivalTime: new Date(flight.arrivalTime).toLocaleString(),
                        classType: 'Business'
                    }
                })

                flights = filterFlights(flights, departure, arrival, departureTime, arrivalTime)
                dispatch(setFlights(flights));
                dispatch(setIsLoading(false));
            })
            .catch(err => {
                dispatch(setIsLoading(false));
                dispatch(setHasError(true));
            });
    };
}

export const fetchEconomyFlightsAsyn = (departure, arrival, departureTime, arrivalTime) => {
    const url = "https://tokigames-challenge.herokuapp.com/api/flights/cheap";

    return dispatch => {
        dispatch(setIsLoading(true));

        return axios.get(url)
            .then(resp => {
                let flights = resp.data.data.map(flight => {
                    return {
                        departure: flight.route.split('-')[0],
                        arrival: flight.route.split('-')[1],
                        departureTime: new Date(flight.departure).toLocaleString(),
                        arrivalTime: new Date(flight.arrival).toLocaleString(),
                        classType: 'Economy'
                    }
                })

                flights = filterFlights(flights, departure, arrival, departureTime, arrivalTime)
                dispatch(setFlights(flights));
                dispatch(setIsLoading(false));
            })
            .catch(err => {
                dispatch(setIsLoading(false));
                dispatch(setHasError(true));
            });
    };
}

const filterFlights = (flights, departure, arrival, departureTime, arrivalTime) => {
    if (departure) {
        flights = flights.filter(x => x.departure.toLowerCase().trim() === departure.toLowerCase().trim());
    }
    if (arrival) {
        flights = flights.filter(x => x.arrival.toLowerCase().trim() === arrival.toLowerCase().trim());
    }
    if (departureTime) {
        flights = flights.filter(x => getFullDateWithFormat(x.departureTime) === getFullDateWithFormat(departureTime));
    }
    if (arrivalTime) {
        flights = flights.filter(x => getFullDateWithFormat(x.arrivalTime) === getFullDateWithFormat(arrivalTime));
    }
    return flights;
}

const getFullDateWithFormat = (datetime) => {
    return moment(datetime).format('YYYY-MM-DD');
}

export const Actions = {
    fetchAllFlightsAsyn,
    fetchEconomyFlightsAsyn,
    fetchBusinessFlightsAsyn,
    setIsLoading,
    setPageRecords,
    setPageIndex,
    setPageSize,
    resetFlights,
};