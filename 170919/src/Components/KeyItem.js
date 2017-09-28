import React, { Component } from 'react';

class KeyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }
  render() {

    return (
      <li className="KeyItem">
        {this.props.keyItem.label}
      </li>
    );
  }
}

export default KeyItem;
