/**
 * Created by Denis on 15.03.2017.
 */
import React, { Component, PropTypes } from 'react';
import navTools from './navigation-tools.scss';
import TransitionToSqlViewer from '../../libs/transition-to-sql-viewer';

export default class NavigationTools extends Component {
  static get propTypes() {
    return {
      currentURL: PropTypes.string.isRequired,
      openPopup: PropTypes.func.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.openSqlViewer = this.openSqlViewer.bind(this);
    this.popupOpenWindow = this.popupOpenWindow.bind(this);
    this.uriParsed = {};
  }
  componentWillMount() {
    this.styleZindex = {
      zIndex: 9999,
    };
  }
  openSqlViewer(e) {
    e.preventDefault();
    this.transition = new TransitionToSqlViewer(this.props.currentURL);
    this.uriParsed = this.transition.getLinkToSqlViewer();
    document.location.href = this.uriParsed;
  }
  popupOpenWindow(e) {
    e.preventDefault();
    this.props.openPopup();
  }
  render() {
    return (
      <div className={navTools.tools_popup} style={this.styleZindex}>
        <ul className={navTools.tools__items}>
          <li className={navTools.tools__item}>
            <a
              href="1" className={navTools.tools__link} title="Get tile URL"
              onClick={this.popupOpenWindow}
            >
              Get tile URL
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
