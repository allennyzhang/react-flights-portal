import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from '@material-ui/core'
import { Actions, } from '../redux';

class FlightSearchImp extends Component {

    handleFlightSearch = () => {
        this.props.fetchFlightAsyn('https://tokigames-challenge.herokuapp.com/api/flights/business');
    }

    render() {
        if (this.props.flightState.hasError) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.flightState.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleFlightSearch} >
                    fetch flight
                    </Button>
                <ul>
                    {this.props.flightState.flights.map((item, index) => (
                        <li key={index}>
                            {item.departure} - {item.arrival}
                        </li>
                    ))}
                </ul>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    flightState: state.flightState
});

const mapDispatchToProps = dispatch => ({
    fetchFlightAsyn: url => dispatch(Actions.fetchFlightAsyn(url))
});

export const FlightSearch = connect(mapStateToProps, mapDispatchToProps)(FlightSearchImp);