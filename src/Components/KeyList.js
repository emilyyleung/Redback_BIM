import React, { Component } from 'react';
import KeyItem from './KeyItem'

class KeyList extends Component {
  render() {
    let keyItems;
  if(this.props.keyList){
    keyItems = this.props.keyList.map(keyItem => {
      // console.log(keyItem);
      return (
        <KeyItem key={keyItem.label} keyItem={keyItem} />
        // key={project.title}
      );
    });
  }

    // console.log(this.props.keyList); // KeyList in one array
    return (
      <div className="KeyList">
        <h3>My Keys</h3>
        {keyItems}
      </div>
    );
  }
}

export default KeyList;
