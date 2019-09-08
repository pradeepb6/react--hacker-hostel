import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class Error extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.invalidHackers.map(invalidHacker => {
      return (<div key={invalidHacker} className="col-xs-12 col-sm-12 col-md-12 col-lg-12 error">
        <div id="list">
          <div className="error-msg">
            <i className="fa fa-times-circle" />
            <p>Error! No menu generated for {invalidHacker}</p>
          </div>
        </div>
      </div>)
    });
  }

};

export default Error;
