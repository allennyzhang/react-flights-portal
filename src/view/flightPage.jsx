import React from "react";
import { connect } from "react-redux";
import { FlightSearch, FlightResult } from '../components';

class FlightPageImp extends React.PureComponent {

    render() {
        const { hasError, isLoading } = this.props.flightState;
        return (
            <div>
                <FlightSearch />
                <FlightResult />
                <div className={isLoading ? 'loading' : ''}></div>
                {hasError && <p>Sorry! There was an error loading the items</p>}
            </div >
        );
    }
}

const mapStateToProps = state => ({
    flightState: state.flightState
});

export const FlightPage = connect(
    mapStateToProps
)(FlightPageImp);