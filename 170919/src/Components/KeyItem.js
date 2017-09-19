import React, { Component } from 'react';

class KeyItem extends Component {
  render() {

    return (
      <li className="KeyItem">
        {this.props.keyItem.label}
      </li>
    );
  }
}

export default KeyItem;
