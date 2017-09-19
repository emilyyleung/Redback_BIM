import React, { Component } from 'react';

class AddKey extends Component {
  constructor() {
    super();
    this.state = {
      newKey: {}
    }
  }

  handleSubmitKey(e) {
    // console.log(this.refs.keyItem.value);
    if(this.refs.keyItem.value == ''){
      alert('Key is required');
    } else {
      this.setState({newKey:{
        keyItem: this.refs.keyItem.value
      }}, function(){
          // console.log(this.state);
          this.props.addKey(this.state.newKey);
      });
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className="AddKey">
        <form onSubmit={this.handleSubmitKey.bind(this)} >
          <h3>Add Key</h3>
          <div className="create">
            <input type="text" ref="keyItem" />
            <input type="submit" value="Create Key" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddKey;
