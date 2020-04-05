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
        const allRecords = this.props.flightState.flights;
        this.setState({ totalHits: allRecords.length }, () => {
            const { pageSize, pageIndex, totalHits } = this.state;
            const firstIndex = pageIndex * pageSize;
            const lastIndex = ((pageIndex + 1) * pageSize) > totalHits ? totalHits : ((pageIndex + 1) * pageSize);
            pageRecords = allRecords.slice(firstIndex, lastIndex);

            this.props.setPageRecords(pageRecords);
        });
    }

    handlePageChange = page => {
        console.log(`page.selected:${page.selected}`)
        this.setState({ pageIndex: page.selected }, () => { this.getpageRecords(); });
    }

    handlePageSizeChange = value => {
        console.log(`pageIndex:${value};pageSize:${value}`)
        this.setState({ pageIndex: 0, pageSize: value }, () => { this.getpageRecords(); });
    }

    render() {

        const { classes } = this.props;
        const { flights, pageRecords, isLoading } = this.props.flightState;

        return (
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
                            <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                Class Type
							        </TableCell>
                        </TableRow>
                    </TableHead>
                    {pageRecords.length > 0 && !isLoading &&
                        <TableBody>
                            {pageRecords.map((flight, index) => {
                                return (
                                    <TableRow className={classes.row} key={index} >
                                        <TableCell className={classes.tableCell}>{flight.departure}</TableCell>
                                        <TableCell className={classes.tableCell}>{flight.arrival}</TableCell>
                                        <TableCell className={classes.tableCell}>{flight.departureTime} </TableCell>
                                        <TableCell className={classes.tableCell}>{flight.arrivalTime}</TableCell>
                                        <TableCell className={classes.tableCell}>{flight.classType}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    }
                    {pageRecords.length === 0 && !isLoading &&
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