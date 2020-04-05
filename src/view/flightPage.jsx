import React from "react";
import { connect } from "react-redux";
import {
    createStyles,
    withStyles
} from '@material-ui/core'
import { tableStyles } from '../assets';
import { FlightSearch, FlightResult } from '../components';

const styles = (theme) =>
    createStyles({
        ...tableStyles(theme)
    });

class FlightPageImp extends React.PureComponent {

    render() {
        const { hasError, isLoading, pageRecords } = this.props.flightState;
        return (
            <div>
                <FlightSearch />

                {pageRecords.length > 0 &&
                    <FlightResult />
                }

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
)(withStyles(styles)(FlightPageImp));