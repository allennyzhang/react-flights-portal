import React from "react";
import { connect } from "react-redux";
import {
    Button, createStyles,
    Table, TableBody, TableCell,
    TableHead, TableRow, TableFooter,
    Typography, withStyles
} from '@material-ui/core'
import { Actions, } from '../redux';
import { tableStyles } from '../assets';
import clsx from 'clsx';

const styles = (theme) =>
    createStyles({
        ...tableStyles(theme)
    });

class FlightSearchImp extends React.PureComponent {

    handleFlightSearch = () => {
        this.props.fetchFlightAsyn('https://tokigames-challenge.herokuapp.com/api/flights/business');
    }

    render() {

        const { classes } = this.props;
        const { hasError, isLoading, flights } = this.props.flightState;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleFlightSearch} >
                    fetch flight
                    </Button>
                {isLoading && <p>Loading…</p>}

                {hasError && <p>Sorry! There was an error loading the items</p>}

                {flights.length > 0 &&
                    <div className={classes.tableResponsive}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                        Departure
							        </TableCell>
                                    <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                        Arrival
							        </TableCell>
                                    <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                        Departure Time
							        </TableCell>
                                    <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                        Arrival Time
							        </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {flights.map((flight, index) => {
                                    return (
                                        <TableRow className={classes.row} key={index} >
                                            <TableCell className={classes.tableCell}>{flight.departure}</TableCell>
                                            <TableCell className={classes.tableCell}>{flight.arrival}</TableCell>
                                            <TableCell className={classes.tableCell}>{flight.departureTime} </TableCell>
                                            <TableCell className={classes.tableCell}>{flight.arrivalTime}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            {flights.lengt &&
                                <TableFooter>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body2" gutterBottom>
                                                No items found!
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            }
                        </Table>
                    </div>
                }
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

export const FlightSearch = connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(FlightSearchImp));