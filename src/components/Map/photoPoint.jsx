import React, {PropTypes, Component} from 'react';
import {apiServer} from 'app/constants';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {pointStyle} from './photoPoint.style.js';

export default class PhotoPoint extends Component {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.string,
    url: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  handleClick(url) {
    return function() {
      window.open(url);
    }
  }

  render() {
    return (
       <div 
          onClick={this.handleClick(apiServer + this.props.url)}
          style={pointStyle}
          >
         <a href={apiServer + this.props.url} target="_blank">
          {this.props.text}
         </a>
       </div>
    );
  }
}