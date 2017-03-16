/**
 * Created by Denis on 16.03.2017.
 */
import React, { Component } from 'react';
import styles from './popup-code.scss';

export default class PopupCode extends Component {
  render() {
    this.i = 1;
    console.log(this.i);
    return (
      <div className={styles.popup_code}>
        <textarea cols="80" rows="9" className={styles.popup_code_text}>
          {this.props.currentURL}
        </textarea>
        <input type="button" className={styles.button} value="Copy in buffer" />
      </div>
    );
  }
}
