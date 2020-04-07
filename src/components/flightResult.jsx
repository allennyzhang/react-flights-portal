import React from "react";
import { connect } from "react-redux";
import {
    createStyles,
    Table, TableBody, TableCell,
    TableHead, TableRow,
    Typography, withStyles, TableSortLabel
} from '@material-ui/core'
import { Actions, } from '../redux';
import { tableStyles } from '../assets';
import clsx from 'clsx';
import { Pagination } from '../components';

const styles = (theme) =>
    createStyles({
        footer: {
            color: theme.palette.primary.main,
            textAlign: 'center',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        },
        ...tableStyles(theme)
    });

class FlightResultImp extends React.PureComponent {

    state = {
        sortDirection: "desc",
        orderByField: "departure",
    };

    getPageRecords = (allRecords, pageIndex, pageSize) => {
        const totalHits = allRecords.length;
        const firstIndex = pageIndex * pageSize;
        const lastIndex = ((pageIndex + 1) * pageSize) > totalHits ? totalHits : ((pageIndex + 1) * pageSize);
        const pageRecords = allRecords.slice(firstIndex, lastIndex);

        this.props.dispatch(Actions.setPageSize(pageSize));
        this.props.dispatch(Actions.setPageIndex(pageIndex));
        this.props.dispatch(Actions.setPageRecords(pageRecords));
    }

    handlePageIndexChange = page => {
        const { pageSize, flights } = this.props.flightState;
        this.getPageRecords(flights, page.selected, pageSize);
    }

    handlePageSizeChange = pageSize => {
        this.getPageRecords(this.props.flightState.flights, 0, pageSize);
    }

    handleSorting = (orderByField, changeDirection = true) => {
        const sortValue = this.state.sortDirection;
        const sortDirection = changeDirection ? sortValue === 'asc' ? 'desc' : 'asc' : sortValue;
        this.setState({ orderByField, sortDirection }, () => { this.sortResults(); });
    }

    sortLabelDirection = () => {
        return this.state.sortDirection ? this.state.sortDirection : undefined;
    }

    sortResults = () => {
        let sortedRecords = this.props.flightState.pageRecords;;
        const { pageIndex, pageSize, flights } = this.props.flightState;

        switch (this.state.orderByField) {
            case 'departure':
                sortedRecords = flights.slice().sort((a, b) => this.sortString(a.departure, b.departure));
                break;
            case 'arrival':
                sortedRecords = flights.slice().sort((a, b) => this.sortString(a.arrival, b.arrival));
                break;
            case 'departureTime':
                sortedRecords = flights.slice().sort((a, b) => this.sortString(a.departureTime, b.departureTime));
                break;
            case 'arrivalTime':
                sortedRecords = flights.slice().sort((a, b) => this.sortString(a.arrivalTime, b.arrivalTime));
                break;
            case 'classType':
                sortedRecords = flights.slice().sort((a, b) => this.sortString(a.classType, b.classType));
                break;
            default:
                return sortedRecords;
        }
        if (this.state.sortDirection === 'asc') {
            sortedRecords = sortedRecords.reverse();
        }
        this.getPageRecords(sortedRecords, pageIndex, pageSize);
    }

    sortString = (a, b) => {
        const nameA = a.toLowerCase();
        const nameB = b.toLowerCase();
        if (nameA < nameB) {
            return 1;
        }
        if (nameA > nameB) {
            return -1;
        }
        return 0;
    }

    render() {

        const { classes } = this.props;
        const { flights, pageRecords, isLoading, pageIndex, pageSize } = this.props.flightState;

        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                <TableSortLabel
                                    active={this.state.orderByField === 'departure'}
                                    direction={this.sortLabelDirection()}
                                    onClick={() => this.handleSorting('departure')}>
                                    Departure
								</TableSortLabel>
                            </TableCell>
                            <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                <TableSortLabel
                                    active={this.state.orderByField === 'arrival'}
                                    direction={this.sortLabelDirection()}
                                    onClick={() => this.handleSorting('arrival')}>
                                    Arrival
								</TableSortLabel>
                            </TableCell>
                            <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                <TableSortLabel
                                    active={this.state.orderByField === 'departureTime'}
                                    direction={this.sortLabelDirection()}
                                    onClick={() => this.handleSorting('departureTime')}>
                                    Departure Time
								</TableSortLabel>
                            </TableCell>
                            <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                <TableSortLabel
                                    active={this.state.orderByField === 'arrivalTime'}
                                    direction={this.sortLabelDirection()}
                                    onClick={() => this.handleSorting('arrivalTime')}>
                                    Arrival Time
								</TableSortLabel>
                            </TableCell>
                            <TableCell className={clsx(classes.tableCell, classes.tableHeadCell)}>
                                <TableSortLabel
                                    active={this.state.orderByField === 'classType'}
                                    direction={this.sortLabelDirection()}
                                    onClick={() => this.handleSorting('classType')}>
                                    Class
								</TableSortLabel>
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

                </Table>
                {pageRecords.length === 0 && !isLoading &&
                    <Typography variant="body1" className={classes.footer}  >
                        No records found!
                    </Typography>
                }
                <Pagination
                    pageSize={pageSize}
                    totalHits={flights.length}
                    currentPage={pageIndex + 1}
                    handleChangePage={this.handlePageIndexChange}
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

export const FlightResult = connect(
    mapStateToProps
)(withStyles(styles)(FlightResultImp));