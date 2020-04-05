import React from "react";
import {
    Grid, TextField, withStyles, Button,
} from "@material-ui/core";
import { Actions, } from '../redux';
import { connect } from "react-redux";
// import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = () => {

}

class FlightSearchImp extends React.Component {

    state = {
        classType: '',
        departure: '',
        arrival: '',
        departureTime: new Date('2014-08-18T21:11:54'),
        arrivalTime: new Date('2014-08-18T21:11:54')
    };

    handleFlightSearch = () => {
        const { classType, departure, arrival, departureTime, arrivalTime } = this.state;
        this.props.fetchFlightAsyn(departure, arrival, departureTime, arrivalTime, classType);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // console.log(`${e.target.name}:${e.target.value}`)
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container justify="flex-start" alignItems='center' direction='row' className={classes.searchMargin} >
                <Grid item xs={6} sm={4} md={2}>
                    <TextField
                        id="departure"
                        name="departure"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.departure}
                        // error={ErrorMsgKey !== ''}
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="FROM"
                        // label={ErrorMsgKey ? ErrorMsgKey : "FROM"}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <TextField
                        id="arrival"
                        name="arrival"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                        value={this.state.arrival}
                        // error={ErrorMsgKey !== ''}
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="TO"
                        // label={ErrorMsgKey ? ErrorMsgKey : "FROM"}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            id="departure"
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            label="Departure Date"
                            value={this.state.departureTime}
                            onChange={(date) => this.setState({ departureTime: date })}
                            KeyboardButtonProps={{
                                'aria-label': 'Departure Date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="arrivalTime"
                            label="Arrival Date"
                            value={this.state.arrivalTime}
                            onChange={(date) => this.setState({ arrivalTime: date })}
                            KeyboardButtonProps={{
                                'aria-label': 'Arrival Date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6} sm={4} md={2}>
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="classType">Class</InputLabel>
                        <Select
                            fullWidth
                            native
                            value={this.state.classType}
                            onChange={this.handleChange}
                            inputProps={{ id: 'classType', name: 'classType' }}
                        >
                            <option aria-label="None" value="" />
                            <option value="cheap">Economy</option>
                            <option value="business">Business</option>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={4} md={2} >
                    <Button variant="contained" color="primary" onClick={this.handleFlightSearch} >
                        Search Flights
                    </Button>
                </Grid>
            </Grid >
        );
    }
}

const mapStateToProps = state => ({
    flightState: state.flightState
});

const mapDispatchToProps = dispatch => ({
    fetchFlightAsyn: (departure, arrival, departureTime, arrivalTime, classType) =>
        dispatch(Actions.fetchFlightAsyn(departure, arrival, departureTime, arrivalTime, classType))
});

export const FlightSearch = connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(FlightSearchImp));
