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
      <div className={navTools.tools}>
        <ul className={navTools.tools__items}>
          <li className={navTools.tools__item}>
            <a href="1" className={navTools.tools__link} title="Get Code">Get Code</a>
          </li>
          <li className={navTools.tools__item}>
            <a href="2" className={navTools.tools__link} title="Edit in sql-viewer">
              Edit in sql-viewer
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
