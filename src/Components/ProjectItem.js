import React, { Component } from 'react';

class ProjectItem extends Component {
  render() {
    return (
      <li className="Project">
        <strong>{this.props.project.name}</strong> - By {this.props.project.creatorName}
      </li>
    );
  }
}

export default ProjectItem;
