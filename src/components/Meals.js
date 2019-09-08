import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class Meals extends Component {


  render() {
    const {schedule} = this.props
    var list = Object.keys(schedule).map(function (key) {
      return <div key={key}>
        {
          schedule[key].map((hacker) =>
            <li key={hacker} className="morning">Breakfast for {hacker} on {key}</li>
          )
        }

        {
          schedule[key].map((hacker) =>
            <li key={hacker} className="afternoon">Lunch for {hacker} on {key}</li>
          )
        }

        {
          schedule[key].map((hacker) =>
            <li key={hacker} className="night">Dinner for {hacker} on {key}</li>
          )
        }
      </div>
    });
    return (<div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
      <ol id="list">
        {list}
      </ol>
    </div>)
  }
}

export default Meals;
