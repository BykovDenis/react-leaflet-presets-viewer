/**
 * Created by Denis on 15.03.2017.
 */
import React, { Component } from 'react';
import navTools from './navigation-tools.scss';

export default class NavigationTools extends Component {
  render() {
    this.i = 1;
    console.log(this.i);
    return (
      <div className={navTools.navigation_tools}>
        <div>
          <a href="2">
            Get link with code
          </a>
        </div>
        <div>
          <a href="2">
            View in Sql-viewer
          </a>
        </div>
      </div>
    );
  }
}
