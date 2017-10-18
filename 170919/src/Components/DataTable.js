import React, { Component } from 'react';
import DataTableItem from './DataTableItem';

class DataTable extends Component {
  render() {
    let dataTableItems;
    if(this.props.dataTableList){
      dataTableItems = this.props.dataTable.map(dataTableItem => {
        // console.log("Yes")
        return (
          <DataTableItem key={dataTableItem} dataTableItem={dataTableItem} />
        );
      });
    }
    return (
      <div className="DataTable">
        <h2>Attributes</h2>
        <DataTableItem />
      </div>
    );
  }
}

export default DataTable;
