import React from "react";
import { connect } from "react-redux";
import {
    createStyles,
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

class FlightResultImp extends React.PureComponent {

    state = {
        pageSize: 10,
        pageIndex: 0,
        totalHits: 0,
    };

    getpageRecords = () => {
        let pageRecords = [];
        const { pageSize, pageIndex } = this.state;
        const allRecords = this.props.flightState.flights;
        this.setState({ totalHits: allRecords.length }, () => {
            if (pageIndex === 0) {
                pageRecords = allRecords.slice(0, pageSize);
            } else {
                const firstIndex = (pageIndex - 1) * pageSize;
                const lastIndex = (pageIndex * pageSize) > this.state.totalHits ? this.state.totalHits : (pageIndex * pageSize);

                pageRecords = allRecords.slice(firstIndex, lastIndex);
            }
            this.props.setPageRecords(pageRecords);
        });
    }

    handlePageChange = page => {
        this.setState({ pageIndex: page.selected }, () => { this.getpageRecords(); });
    }

    handlePageSizeChange = value => {
        this.setState({ pageIndex: 0, pageSize: value }, () => { this.getpageRecords(); });
    }

    render() {

        const { classes } = this.props;
        const { flights, pageRecords } = this.props.flightState;

        return (
            <div>
                {pageRecords.length > 0 &&
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
                                {pageRecords.map((flight, index) => {
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
                            {pageRecords.length === 0 &&
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
                            currentPage={this.state.pageIndex + 1}
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
    setPageRecords: pageRecords => dispatch(Actions.setPageRecords(pageRecords)),
});

export const FlightResult = connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(FlightResultImp));