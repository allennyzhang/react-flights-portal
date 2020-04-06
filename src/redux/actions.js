import axios from 'axios';
import moment from 'moment';

export const ActionTypes = {
    SET_FLIGHT: 'SET_FLIGHT',
    SET_HAS_ERROR: 'SET_HAS_ERROR',
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_PAGE_RECORDS: 'SET_PAGE_RECORDS',
    SET_PAGE_SIZE: 'SET_PAGE_SIZE',
    SET_PAGE_INDEX: 'SET_PAGE_INDEX',
    RESET_FLIGHS: 'RESET_FLIGHS',
};

const setFlight = payload => ({
    type: ActionTypes.SET_FLIGHT,
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

export function fetchBusinessFlightAsyn(departure, arrival, departureTime, arrivalTime, pageSize) {
    const url = "https://tokigames-challenge.herokuapp.com/api/flights/business";

    return (dispatch) => {
        dispatch(setIsLoading(true));

        axios.get(url)
            .then(resp => {
                const tempFlights = resp.data.data;

                let flights = tempFlights.map(flight => {
                    return {
                        departure: flight.departure,
                        arrival: flight.arrival,
                        departureTime: new Date(flight.departureTime).toLocaleString(),
                        arrivalTime: new Date(flight.arrivalTime).toLocaleString(),
                        classType: 'Business'
                    }
                })

                flights = filterFlights(flights, departure, arrival, departureTime, arrivalTime)
                const pageRecords = flights.length > pageSize ? flights.slice(0, pageSize) : flights;

                if (pageRecords.length > 0)
                    dispatch(setPageRecords(pageRecords));
                else
                    dispatch(resetFlights(pageRecords));
                dispatch(setFlight(flights));
                dispatch(setIsLoading(false));
            })
            .catch(err => {
                dispatch(setIsLoading(false));
                dispatch(setHasError(true));
            });
    };
}

export function fetchEconomyFlightAsyn(departure, arrival, departureTime, arrivalTime, pageSize) {
    const url = "https://tokigames-challenge.herokuapp.com/api/flights/cheap";

    return (dispatch) => {
        dispatch(setIsLoading(true));

        axios.get(url)
            .then(resp => {
                const tempFlights = resp.data.data;

                let flights = tempFlights.map(flight => {
                    return {
                        departure: flight.route.split('-')[0],
                        arrival: flight.route.split('-')[1],
                        departureTime: new Date(flight.departure).toLocaleString(),
                        arrivalTime: new Date(flight.arrival).toLocaleString(),
                        classType: 'Economy'
                    }
                })

                flights = filterFlights(flights, departure, arrival, departureTime, arrivalTime)
                const pageRecords = flights.length > pageSize ? flights.slice(0, pageSize) : flights;

                if (pageRecords.length > 0)
                    dispatch(setPageRecords(pageRecords));
                else
                    dispatch(resetFlights(pageRecords));
                dispatch(setFlight(flights));
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
    fetchEconomyFlightAsyn,
    fetchBusinessFlightAsyn,
    setPageRecords,
    setPageIndex,
    setPageSize,
    resetFlights,
};