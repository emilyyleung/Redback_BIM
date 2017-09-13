import React, { Component } from 'react';

class TodoItem extends Component {
  deleteTodo(id) {
    //console.log('test');
    this.props.onDeleteTodo(id);
  }

  render() {
    //console.log(this.props);
    return (
      <li className="Todo">
        {this.props.todo.title} <a href="#!" onClick={this.deleteTodo.bind(this, this.props.todo.id)}>X</a>
      </li>
    );
  }
}

// ProjectItem.propTypes = {
//  project: React.PropTypes.array,
//  onDelete: React.PropTypes.func
// }
// Above commented out lines of code is outdated to validate

export default TodoItem;
