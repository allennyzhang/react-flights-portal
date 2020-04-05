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
        pageSize: 10,
        pageIndex: 0,
        totalHits: 0,
        orderByField: "departure",
        sortDirection: "desc",
    };

    getpageRecords = () => {
        const allRecords = this.props.flightState.flights;
        this.setState({ totalHits: allRecords.length }, () => {
            this.setPageRecords(allRecords);
        });
    }

    setPageRecords = (allRecords) => {
        const totalHits = allRecords.length;
        const { pageSize, pageIndex, } = this.state;
        const firstIndex = pageIndex * pageSize;
        const lastIndex = ((pageIndex + 1) * pageSize) > totalHits ? totalHits : ((pageIndex + 1) * pageSize);
        const pageRecords = allRecords.slice(firstIndex, lastIndex);

        this.props.setPageRecords(pageRecords);
    }

    handlePageChange = page => {
        console.log(`page.selected:${page.selected}`)
        this.setState({ pageIndex: page.selected }, () => { this.getpageRecords(); });
    }

    handlePageSizeChange = value => {
        console.log(`pageIndex:${value};pageSize:${value}`)
        this.setState({ pageIndex: 0, pageSize: value }, () => { this.getpageRecords(); });
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
        const flights = this.props.flightState.flights;
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
            default:
                return sortedRecords;
        }
        if (this.state.sortDirection === 'asc') {
            sortedRecords = sortedRecords.reverse();
        }
        this.setPageRecords(sortedRecords);
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
        const { flights, pageRecords, isLoading } = this.props.flightState;

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
                                Class
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