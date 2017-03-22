/**
 * Created by Denis on 16.03.2017.
 */
import React, { Component, PropTypes } from 'react';
import styles from './popup-code.scss';

export default class PopupCode extends Component {
  static get propTypes() {
    return {
      currentURL: PropTypes.string.isRequired,
      popupVisible: PropTypes.bool.isRequired,
      popupDisable: PropTypes.func.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.getCopyCodeInBuffer = this.getCopyCodeInBuffer.bind(this);
    this.popupCloseWindow = this.popupCloseWindow.bind(this);
    this.popupStyle = {
      display: 'none',
      zIndex: 9999
    };
  }
  getCopyCodeInBuffer() {
    try {
      this.code.select();
      document.execCommand('copy');
      this.props.popupDisable();
    } catch (e) {
      console.log(`Ошибка копирования ${e.errLogToConsole}`);
    }
  }
  popupCloseWindow(e) {
    e.preventDefault();
    this.props.popupDisable();
  }
  render() {
    this.popupStyle = {
      display: this.props.popupVisible || 'none',
      zIndex: 9999
    };
    return (
      <div
        id="popup_code" className={styles.popup_code}
        style={this.popupStyle} ref={(popup) => { this.popup = popup; }}
      >
        <a href="1" className={styles.popup_code_close} onClick={this.popupCloseWindow} > X </a>
        <textarea
          id="popup_code_text" cols="80" rows="9" className={styles.popup_code_text}
          ref={(code) => { this.code = code; }}
          defaultValue={this.props.currentURL} onChange={this.componentWillReceiveProps}
        />
        <div>
          Important! You need to&nbsp;
            <a href="http://home.owm.io/api_keys" target="_blank">
              get API key
            </a>
             &nbsp;and replace &APPID= <b>APIKEY</b> with your personal one
        </div>
        <button
          type="button" className={styles.button}
          onClick={this.getCopyCodeInBuffer}
        >
          Copy in buffer
        </button>
      </div>
    );
  }
}
