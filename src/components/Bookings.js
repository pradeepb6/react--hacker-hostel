import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Bookings extends Component {

  constructor(props) {
    super(props);
  }

  handleGuestInfo(e) {
    if (e.target.value) {
      const hackers = e.target.value.split('\n');
      this.props.handleGuestInfo(hackers)
    }
  }

  handleDateInfo(e) {
    if (e.target.value) {
      const dates = e.target.value.split('\n');
      this.props.handleDateInfo(dates)
    }
  }

  render() {
    return (
      <div className="row">
        <TextField
          name="hackers"
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the hacker list (one hacker per line)"
          onChange={this.handleGuestInfo.bind(this)}
        />
        <TextField
          name="dates"
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the date range for each hacker's stay (one range per line)"
          onChange={this.handleDateInfo.bind(this)}
        />
        <Button variant="outlined" color="primary" className="block-center" onClick={this.props.handleButtonClicked}>Get
          Meals Schedule</Button>
      </div>);
  }
}

export default Bookings;