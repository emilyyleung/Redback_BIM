import React, { Component } from 'react';
import uuid from 'uuid';

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: {}
    }
  }

  handleSubmitTodo(e) {
    if(this.refs.titleoftodo.value === '') {
      alert('Todo is required');
    } else {
      this.setState({newTodo:{
        id: uuid.v4(),
        title: this.refs.titleoftodo.value,
      }}, function() {
        //console.log(this.state);
        this.props.addTodo(this.state.newTodo);
      });
    };
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Add Todo</h3>
        <form onSubmit={this.handleSubmitTodo.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" ref="titleoftodo" />
          </div>
          <br />
          <input type="submit" value="Submit Todo" />
        </form>
      </div>
    );
  }
}

// AddProject.propTypes = {
//  categories: React.PropTypes.array,
//  addProject: React.PropTypes.func
// }
// Above commented out lines of code is outdated to validate

export default AddTodo;
