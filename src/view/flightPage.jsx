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
import { Pagination } from '../components';

const styles = (theme) =>
    createStyles({
        ...tableStyles(theme)
    });

class FlightPageImp extends React.PureComponent {

    state = {
        pageSize: 10,
        totalHits: 0,
        currPageIdx: 0,
    };

    handleFlightSearch = () => {
        this.props.fetchFlightAsyn('https://tokigames-challenge.herokuapp.com/api/flights/business');
    }

    handlePageChange = async currPageIdx => {
        this.setState({ currPageIdx })
        await this.props.fetchFlightAsyn('https://tokigames-challenge.herokuapp.com/api/flights/business');
    }

    handlePageSizeChange = async pageSize => {
        this.setState({ pageSize, currPageIdx: 0 })
        await this.props.fetchFlightAsyn('https://tokigames-challenge.herokuapp.com/api/flights/business');
    }


    render() {

        const { classes } = this.props;
        const { hasError, isLoading, flights } = this.props.flightState;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleFlightSearch} >
                    fetch flight
                    </Button>
                <div className={isLoading ? 'loading' : ''}></div>

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
                        <Pagination
                            pageSize={this.state.pageSize}
                            totalHits={flights.length}
                            currentPage={this.state.currPageIdx + 1}
                            handleChangePage={this.handlePageChange}
                            onPageSizeChange={this.handlePageSizeChange}
                            pageSizeOptions={[10, 20, 50, 100]}
                        />
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

export const FlightPage = connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(FlightPageImp));