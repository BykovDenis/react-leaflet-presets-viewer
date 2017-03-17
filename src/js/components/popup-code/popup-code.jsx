/**
 * Created by Denis on 16.03.2017.
 */
import React, { Component, PropTypes } from 'react';
import styles from './popup-code.scss';

export default class PopupCode extends Component {
  static get propTypes() {
    return {
      currentURL: PropTypes.string.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.getCopyCodeInBuffer = this.getCopyCodeInBuffer.bind(this);
    this.popupCloseWindow = this.popupCloseWindow.bind(this);
  }
  componentWillMount() {
    this.popupSyle = {
      display: 'none'
    };
  }
  componentWillReceiveProps() {
  }
  getCopyCodeInBuffer() {
    try {
      this.code.select();
      document.execCommand('copy');
    } catch (e) {
      console.log(`Ошибка копирования ${e.errLogToConsole}`);
    }
  }
  popupCloseWindow(e) {
    e.preventDefault();
    this.popup.style.display = 'none';
  }
  render() {
    return (
      <div
        id="popup_code" className={styles.popup_code}
        style={this.popupSyle} ref={(popup) => { this.popup = popup; }}
      >
        <a href="1" className={styles.popup_code_close} onClick={this.popupCloseWindow} > X </a>
        <textarea
          id="popup_code_text" cols="80" rows="9" className={styles.popup_code_text}
          value={this.props.currentURL} ref={(code) => { this.code = code; }}
          defaultValue={this.props.currentURL} onChange={this.componentWillReceiveProps}
        />
        <input
          type="button" className={styles.button}
          onClick={this.getCopyCodeInBuffer} value="Copy in buffer"
        />
      </div>
    );
  }
}
