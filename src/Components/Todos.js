import React, { Component } from 'react';
import TodoItem from './TodoItem';

class Todo extends Component {
  deleteTodo(id){
    this.props.onDeleteTodo(id);
  }

  render() {
    let todoItems;
    if(this.props.todos){
      todoItems = this.props.todos.map(todo => {
        //console.log(project);
        return (
          <TodoItem onDeleteTodo={this.deleteTodo.bind(this)} key={todo.title} todo={todo} />
        );
      });
    }
    return(
      <div className="Todos">
        <h3>Latest Todos</h3>
        {todoItems}
      </div>
    );
  }
}

// Projects.propTypes = {
//  projects: React.PropTypes.array,
//  onDelete: React.PropTypes.func
// }
// Above commented out lines of code is outdated to validate
export default Todo;
