import React, { Component } from 'react';
import InlineEdit from 'react-edit-inline';

class AttributeItem extends Component {
    dataChanged(data) {
        // data = { description: "New validated text comes here" }
        // Update your model from here
        // console.log(data)
        this.setState({...data})
    }

    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }

    render() {
      // console.log(this.props)
        return (
          <div className="DataTableItem">
            <span>{this.props.test}: </span>
            <InlineEdit
              validate={this.customValidateText}
              activeClassName="editing"
              text={this.props.test}
              paramName="message"
              change={this.dataChanged.bind(this)}
              style={{
                backgroundColor: 'lightgrey',
                minWidth: 150,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0
              }}
            />
        </div>
      );
    }
}

export default AttributeItem;
