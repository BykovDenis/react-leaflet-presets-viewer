/**
 * Created by Denis on 15.03.2017.
 */
import React, { Component, PropTypes } from 'react';
import navTools from './navigation-tools.scss';
import TransitionToSqlViewer from '../../libs/transition-to-sql-viewer';

export default class NavigationTools extends Component {
  static get propTypes() {
    return {
      currentURL: PropTypes.string.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.openSqlViewer = this.openSqlViewer.bind(this);
    this.uriParsed = {};
  }
  componentWillMount() {
    this.styleZindex = {
      zIndex: 9999,
    };
  }
  enabledPopupCode(e) {
    e.preventDefault();
    const popup = document.getElementById('popup_code');
    if (popup) {
      if (popup.style.display === 'none') {
        popup.style.display = 'flex';
        popup.style.zIndex = '9999';
      } else {
        popup.style.display = 'none';
      }
    }
  }
  openSqlViewer(e) {
    e.preventDefault();
    this.transition = new TransitionToSqlViewer(this.props.currentURL);
    this.uriParsed = this.transition.getLinkToSqlViewer();
    console.log(this.uriParsed);
    document.location.href = this.uriParsed;
  }
  render() {
    return (
      <div className={navTools.tools_popup} style={this.styleZindex}>
        <ul className={navTools.tools__items}>
          <li className={navTools.tools__item}>
            <a
              href="1" className={navTools.tools__link} title="Get Code"
              onClick={this.enabledPopupCode}
            >
              Get Code
            </a>
          </li>
          <li className={navTools.tools__item}>
            <a
              href="2" className={navTools.tools__link} title="Edit in sql-viewer"
              onClick={this.openSqlViewer}
            >
              Edit in sql-viewer
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
