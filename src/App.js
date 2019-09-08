import React, {Component} from 'react';
import Bookings from './components/Bookings';
import Meals from './components/Meals';
import Error from './components/Error';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hackers: [],
      dates: [],
      invalidHackers: [],
      schedule: {}
    };

    this.handleGuestInfo = this.handleGuestInfo.bind(this);
    this.handleDateInfo = this.handleDateInfo.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
  }

  handleGuestInfo(hackers) {
    this.setState({hackers})
  }

  handleDateInfo(dates) {
    this.setState({dates})
  }

  handleButtonClicked() {
    this.generateMeals();
  }

  generateMeals() {
    let hackers = this.state.hackers;
    let dateRange = this.state.dates;
    let invalidHackers = [];
    let scheduleData = [];
    if (hackers.length === dateRange.length) {
      for (let i = 0; i < hackers.length; i++) {
        if (this.isDateInvalid(dateRange[i])) {
          let startDay = dateRange[i].split(" to ")[0];
          let endDay = dateRange[i].split(" to ")[1];

          let noOfDays = this.getDifferenceInDays(startDay, endDay);
          for (let j = 0; j < noOfDays.length; j++) {
            scheduleData.push({
              name: hackers[i],
              date: noOfDays[j]
            });
          }
        } else {
          invalidHackers.push(hackers[i]);
        }
      }
    }

    let sortedData = this.sortByDate(scheduleData, 'date');

    let finalSchedule = sortedData.reduce(function (result, userDetails) {
      result[userDetails.date] = result[userDetails.date] || [];
      result[userDetails.date].push(userDetails.name);
      return result;
    }, Object.create(null));

    this.setState({
      schedule: finalSchedule,
      invalidHackers
    });
  }

  sortByDate(array, key) {
    return array.sort(function (a, b) {
      return new Date(a[key]) - new Date(b[key]);
    });
  }

  isDateInvalid(date) {
    let dateChecker = /^(?:(19|20)[0-9]{2})[-.](0[1-9]|1[012])[-.](0[1-9]|1[0-9]|2[0-9]|[12][0-9]|3[01])$/; //YYYY/MM-DD format
    return (dateChecker.test(date.split(" to ")[0]) &&
      dateChecker.test(date.split(" to ")[1])) && (new Date(date.split(" to ")[1]) >= new Date(date.split(" to ")[0]));
  }

  getDifferenceInDays(startDate, endDate) {
    let dateArray = [];

    let currentDate = new Date(startDate);
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    currentDate = [year, month, day].join("-");

    let endOfDate = new Date(endDate);
    let endDay = endOfDate.getDate();
    let endMonth = endOfDate.getMonth() + 1;
    let endYear = endOfDate.getFullYear();
    endOfDate = [endYear, endMonth, endDay].join("-");

    let todayDate = new Date(currentDate);
    while (new Date(todayDate).getTime() <= new Date(endOfDate).getTime()) {
      let formatTodayDate =
        new Date(todayDate).getFullYear() +
        "-" +
        (new Date(todayDate).getMonth() + 1) +
        "-" +
        (new Date(todayDate).getDate());
      dateArray.push(formatTodayDate);
      todayDate = new Date(todayDate).setDate(
        new Date(todayDate).getDate() + 1
      );
    }
    return dateArray;
  }

  render() {
    return (<div className="container-fluid">
      <center>
        <h2>Hacker Hostel</h2>
      </center>
      <div className="container">
        <Bookings handleGuestInfo={this.handleGuestInfo} handleDateInfo={this.handleDateInfo}
                  handleButtonClicked={this.handleButtonClicked}/>
        <Error invalidHackers={this.state.invalidHackers}/>
        <Meals schedule={this.state.schedule}/>
      </div>
    </div>);
  }
}

export default App;