import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {pointStyle} from './photoPoint.style.js';

export default class PhotoPoint extends Component {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
       <div style={pointStyle}>
          {this.props.text}
       </div>
    );
  }
}