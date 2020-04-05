import axios from 'axios';

export const ActionTypes = {
    FETCH_FLIGHT: 'FETCH_FLIGHT',
    SET_HAS_ERROR: 'SET_HAS_ERROR',
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_PAGE_RECORDS: 'SET_PAGE_RECORDS',
    RESET_FLIGHS: 'RESET_FLIGHS',
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

const resetFlights = () => ({
    type: ActionTypes.RESET_FLIGHS
})

export function fetchBusinessFlightAsyn(departure, arrival, departureTime, arrivalTime) {
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

                if (departure) {
                    flights = flights.filter(x => x.departure.toLowerCase().trim() === departure.toLowerCase().trim());

                    if (arrival) {
                        flights = flights.filter(x => x.arrival.toLowerCase().trim() === arrival.toLowerCase().trim());
                    }

                    if (departureTime) {
                        flights = flights.filter(x => x.departureTime === departureTime);
                    }

                    if (arrivalTime) {
                        flights = flights.filter(x => x.arrivalTime === arrivalTime);
                    }
                }

                const pageSize = 10;
                const pageRecords = flights.length > pageSize ? flights.slice(0, pageSize) : flights;
                if (pageRecords.length > 0)
                    dispatch(setPageRecords(pageRecords));
                else
                    dispatch(resetFlights(pageRecords));
                dispatch(fetchFlight(flights));
                dispatch(setIsLoading(false));
            })
            .catch(err => {
                dispatch(setIsLoading(false));
                dispatch(setHasError(true));
            });
    };
}

export function fetchEconomyFlightAsyn(departure, arrival, departureTime, arrivalTime) {
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

                if (departure) {
                    flights = flights.filter(x => x.departure.toLowerCase().trim() === departure.toLowerCase().trim());

                    if (arrival) {
                        flights = flights.filter(x => x.arrival.toLowerCase().trim() === arrival.toLowerCase().trim());
                    }

                    if (departureTime) {
                        flights = flights.filter(x => x.departureTime === departureTime);
                    }

                    if (arrivalTime) {
                        flights = flights.filter(x => x.arrivalTime === arrivalTime);
                    }
                }

                const pageSize = 10;
                const pageRecords = flights.length > pageSize ? flights.slice(0, pageSize) : flights;
                if (pageRecords.length > 0)
                    dispatch(setPageRecords(pageRecords));
                else
                    dispatch(resetFlights(pageRecords));
                dispatch(fetchFlight(flights));
                dispatch(setIsLoading(false));
            })
            .catch(err => {
                dispatch(setIsLoading(false));
                dispatch(setHasError(true));
            });
    };
}

export const Actions = {
    fetchEconomyFlightAsyn,
    fetchBusinessFlightAsyn,
    setPageRecords,
    resetFlights,
};