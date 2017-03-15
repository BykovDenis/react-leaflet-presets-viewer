/**
 * Created by Denis on 15.03.2017.
 */
import React, {Component} from 'react';

export default class NavigationTools extends Component {
  render() {
    const navTools = require('./navigation-tools.scss');
    return (
      <div className={navTools.navigation_tools}>
        <div>
          <a href='2'>
            Get link with code
          </a>
        </div>
        <div>
          <a href='2'>
            View in Sql-viewer
          </a>
        </div>
      </div>
    );
  }
}