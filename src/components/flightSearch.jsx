import React from "react";
import {
    Grid, TextField, withStyles, Button, createStyles
} from "@material-ui/core";
import { Actions, } from '../redux';
import { connect } from "react-redux";
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = (theme) => createStyles({
    formControl: {
        width: '180px',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    classType: {
        marginBottom: '-7px'
    },
    searchButton: {
        marginBottom: -theme.spacing(2)
    }
});

class FlightSearchImp extends React.Component {

    state = {
        classType: '',
        departure: '',
        arrival: '',
        departureTime: null,
        arrivalTime: null
    };

    handleFlightSearch = () => {
        this.props.dispatch(Actions.resetFlights());

        const { classType, departure, arrival, departureTime, arrivalTime } = this.state;

        if (classType === "Business") {
            this.props.dispatch(Actions.fetchBusinessFlightsAsyn(departure, arrival, departureTime, arrivalTime))
                .then(() => this.setPageRecords())
        } else if (classType === "Economy") {
            this.props.dispatch(Actions.fetchEconomyFlightsAsyn(departure, arrival, departureTime, arrivalTime))
                .then(() => this.setPageRecords());
        } else {
            this.props.dispatch(Actions.fetchAllFlightsAsyn(departure, arrival, departureTime, arrivalTime))
                .then(() => this.setPageRecords());
        }
    }

    handleChange = (e) => {
        const type = e.target.type;
        this.setState({ [e.target.name]: e.target.value }, () => {
            if (type === "select-one") {
                this.handleFlightSearch();
            }
        })
    }

    setPageRecords = () => {
        const { pageSize, flights } = this.props.flightState;
        const pageRecords = flights.length > pageSize ? flights.slice(0, pageSize) : flights;
        if (pageRecords.length > 0)
            this.props.dispatch(Actions.setPageRecords(pageRecords));
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="flex-start" alignItems='center' direction='row'>
                <Grid item >
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="departure"
                            name="departure"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.departure}
                            InputLabelProps={{
                                shrink: true
                            }}
                            label="FROM"
                            autoFocus
                        />
                    </FormControl>
                </Grid>
                <Grid item >
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="arrival"
                            name="arrival"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={this.state.arrival}
                            InputLabelProps={{
                                shrink: true
                            }}
                            label="TO"
                            autoFocus
                        />
                    </FormControl>
                </Grid>
                <Grid item >
                    <FormControl className={classes.formControl}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                id="departureTime"
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                label="Departure Date"
                                value={this.state.departureTime}
                                onChange={(date) => this.setState({ departureTime: date })}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                </Grid>
                <Grid item >
                    <FormControl className={classes.formControl}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="arrivalTime"
                                label="Arrival Date"
                                value={this.state.arrivalTime}
                                onChange={(date) => this.setState({ arrivalTime: date })}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                </Grid>
                <Grid item >
                    <FormControl className={clsx(classes.formControl, classes.classType)}>
                        <InputLabel htmlFor="classType">Class</InputLabel>
                        <Select
                            fullWidth
                            native
                            value={this.state.classType}
                            onChange={this.handleChange}
                            inputProps={{ id: 'classType', name: 'classType' }}
                        >
                            <option aria-label="None" value="" />
                            <option value="Economy">Economy</option>
                            <option value="Business">Business</option>
                        </Select>
                    </FormControl>
                </Grid >
                <Grid item className={classes.searchButton}>
                    <Button variant="contained" color="primary" onClick={this.handleFlightSearch} >
                        Search
                    </Button>
                </Grid>
            </Grid >
        );
    }
}

const mapStateToProps = state => ({
    flightState: state.flightState
});

export const FlightSearch = connect(
    mapStateToProps
)(withStyles(styles)(FlightSearchImp));
