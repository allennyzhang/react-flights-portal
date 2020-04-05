import React from "react";
import { connect } from "react-redux";
import { FlightSearch, FlightResult } from '../components';
import { withStyles, createStyles } from "@material-ui/core";

const styles = (theme) => createStyles({
    body: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
});

class FlightPageImp extends React.Component {

    render() {
        const { hasError, isLoading } = this.props.flightState;
        return (
            <div className={this.props.classes.body}>
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
)(withStyles(styles)(FlightPageImp));