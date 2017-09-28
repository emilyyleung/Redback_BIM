import React, { Component } from 'react';

class KeySlider extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.data)
    this.state = ({value:JSON.parse(this.props.data)});
  }

  componentWillUpdate(){

    this.setState({value:JSON.parse(this.props.data)})
  }


  // getInitialState() {
  //   this.setState({value:this.props.data});
  // }

  keyChange(event)  {
    console.log(event.target.value)
    this.setState({value:event.target.value});
  }

  var radius = {this.state.value};
  render() {
    // console.log(this.props.data);
    // console.log(this.state.value);
    // console.log(this.props)
    console.log(parseInt(this.state.value))
    return (
      <div>
      <input
        style={{ width: 250}}
        id="key_slider"
        type="range"
        min="0" max="50"
        step="1"
        defaultValue=({radius})
        onChange={this.keyChange.bind(this)}
        ref={(input) => this.input = input}
      />
      // <KeySlider className="slider" test="hello world" data={this.state.data} /> sits in App.js
      </div>
    );
  }
}

export default KeySlider;
