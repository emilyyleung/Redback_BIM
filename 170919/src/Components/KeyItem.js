import React, { Component } from 'react';

class KeyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    console.log(this.props.keyItem.label);
    return (
      <li className="KeyItem">
        {this.props.keyItem.label.toString()}
      </li>
    );
  }
}

export default KeyItem;
