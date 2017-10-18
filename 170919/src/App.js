import React, { Component } from 'react';
import './App.css';

// import * as THREE from 'three';
import * as helpers from './util/helpers.js';
import FluxViewport from 'flux-viewport/dist/flux-viewport.common.js';
import $ from 'jquery';

import Button from './Button';
import Dropdown from './Dropdown';
import Projects from './Components/Projects';
import KeyList from './Components/KeyList';
import DataTable from './Components/DataTable';

const config = {
  url: window.location.href,
  flux_url: 'https://flux.io', // flux url
  flux_client_id: 'b99a9013-2742-4900-b52d-21ceb4b0b920' // your app's client id
}
const sphere = {"origin":[0,0,0],"primitive":"sphere","radius":5};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      projects: [],
      keys: [],
      data: sphere.radius,
      dataThree: '',
      image: '',
      text: 'Example text value',
      dataTableKeys: []
    };

    this.projectMap = {};
    this.keyMap = {};
    helpers.init(config).then((loggedIn) => {
      this.setState({loggedIn: loggedIn});
      if (loggedIn) {
        helpers.initCreate();
        helpers.getProjects().then((projects)=>{
          this.projectMap = {};
          for (let i=0;i<projects.entities.length;i++) {
            this.projectMap[projects.entities[i].id] = projects.entities[i];
          }
          this.setState({
            projects: projects.entities
          });
        });
      }
    });
  }

  handleSubmitUpdate(event){
    alert('This was submitted:' + this.state.value);
    event.preventDefault();
  }


  setViewport(div)
  {
    if (div == null || this.viewportDiv != null) return;
    this.viewportDiv = div;
    this.div = div;

    // Set up the FluxViewport in it's container
    var token = helpers.getFluxToken();
    this.vp = new FluxViewport(this.div, {
      projectId: this.project.id,
      token: token,
      selection: FluxViewport.getSelectionModes().CLICK
    });
    // var sphere = JSON.parse(this.state.data);
    // this.updateViewport(sphere);

    //

    this.vp.addEventListener(FluxViewport.getChangeEvent(), function(e) {
      var selectedGeometry = e.selection;
      // console.log(e.selection)
      for(this.x in selectedGeometry) {
        var selectedGeometryObject = selectedGeometry[this.x];
      }
      if(selectedGeometryObject !== null && selectedGeometryObject !== undefined) {
        // console.log(selectedGeometryObject);
        // console.log(JSON.stringify(selectedGeometryObject.userData.data));

        // EXTRACT VALUE FOR HTML HEADER.
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var myData = JSON.parse("[" + JSON.stringify(selectedGeometryObject.userData.data) + "]" );

        var col=[];

        for(var i in myData){
            // var key = i;
            var val = myData[i];
            for(var j in val){
                var sub_key = j;
                var sub_val = val[j];
                col.push(sub_key);

                // console.log(sub_key);
                console.log(sub_val);
                // console.log(col);
            }
        }

        var dataTableKeys = col;
        // console.log(dataTableKeys);

        //
        // function toArray(myDataSet) {
        //   var colValue = [];
        //   for (const prop in myDataSet) {
        //     const value = myDataSet[prop];
        //     if (typeof value === 'object') {
        //       colValue.push(toArray(value));
        //     } else {
        //       colValue.push(value);
        //     }
        //   }
        //   return colValue;
        // }
        //
        // console.log(toArray(myData));



        // var col = [];
        // for (var i = 0; i < myData.length; i++) {
        //     for (var key in myData[i]) {
        //         if (col.indexOf(key) === -1) {
        //             col.push(key);
        //         }
        //     }
        // }
        //
        // // CREATE DYNAMIC TABLE.
        // var table = document.createElement("table");
        //
        // // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        //
        // var tr = table.insertRow(-1);                   // TABLE ROW.
        //
        // for (var i = 0; i < col.length; i++) {
        //     var th = document.createElement("th");      // TABLE HEADER.
        //     th.innerHTML = col[i];
        //     tr.appendChild(th);
        // }
        //
        // // ADD JSON DATA TO THE TABLE AS ROWS.
        // for (var i = 0; i < myData.length; i++) {
        //
        //     tr = table.insertRow(-1);
        //
        //     for (var j = 0; j < col.length; j++) {
        //         var tabCell = tr.insertCell(-1);
        //         tabCell.innerHTML = myData[i][col[j]];
        //     }
        // }
        //
        // // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        // var divContainer = document.getElementById("showData");
        // divContainer.innerHTML = "";
        // divContainer.appendChild(table);


        // console.log(myData);
      } else {
        console.log("Nothing")
        $( "#showData" ).empty();
      }
    });
}

  updateViewport(json) {
    var data = json;
    if (!FluxViewport.isKnownGeom(json)) {
      data = null;
    }

    this.vp.setGeometryEntity(data).then((result)=>{
      this.vp.focus();

      // this.vp._renderer._scene
      this.setState({dataThree: JSON.stringify(result.getObject())});
    });
  }
  _onLogin() {
      // don't need to update state since page changes and state will refresh on load
      helpers.login();
  }

  _onLogout() {
      helpers.logout();
      this.setState({loggedIn: false});
  }

  _selectProject(sel) {
    this.project = this.projectMap[sel.value];
    helpers.getCells(this.project).then((cells)=>{
      this.keyMap = {};
      for (let i=0;i<cells.entities.length;i++) {
        this.keyMap[cells.entities[i].id] = cells.entities[i];
      }
      this.setState({
        keys: cells.entities.map((cell)=>{cell.name=cell.label; return cell;})
      });
    });
  }

  _stashValue() {
    if (this.value == null || this.value.constructor !== Array) return;
    this.entityMap = {};
    for (let i=0;i<this.value.length;i++) {
      var value = this.value[i];
      if (value == null || value.id == null) continue;
      this.entityMap[value.id] = value;
    }
  }

  _keyChange(sel){
    this.key = this.keyMap[sel.value];
    this.setState({
      "data": "Loading..."
    });

    var c = $('#console')

    var notificationHandler = function(msg) {
      return c.val(c.val()  + msg.type + ": " + msg.body.label + "\n")
    }
    helpers.createWebSocket(this.project, notificationHandler);
    helpers.getValue(this.project, this.key).then((cell)=>{
      this.value = cell.value;
      this.updateViewport(this.value);
      this.setState({
        "data": JSON.stringify(this.value)
      });
    });
    // console.log(this.state.data)
  }

  _getOptions() {
    if (this.state.loggedIn) {
      return (<div className="options">
        <Button label="Logout" callback={()=>{this._onLogout()}}></Button>
        <Dropdown hint="select project" callback={(e)=>{this._selectProject(e.currentTarget)}} items={this.state.projects}></Dropdown>
        <Dropdown hint="select key" callback={(e)=>{this._keyChange(e.currentTarget)}} items={this.state.keys}></Dropdown>
      </div>);
    } else {
      return (
        <div className="options">
          <Button label="Login" callback={()=>{this._onLogin()}}></Button>
        </div>);
    }
  }

  _getContent() {
    if (this.project != null) {
      return (
        <div className="content">
          <div className="viewport" ref={this.setViewport.bind(this)} ></div>
        </div>
        );
    } else {
      return <div className="content"></div>
    }
  }
  // Function to update react state to match what is in the text box
  // Prevents clobbering of user input by react
  _handleDataChange(e) {
    this.setState({data: e.target.value});
    console.log("Something happened")
  }

  keyChange(event)  {
    // console.log(event.target.value)
    this.setState({value:event.target.value});
  }

  updateKey(e){
    if(this.project != null || this.state.value != null) {
      e.preventDefault();
      console.log(this.state.data);
      console.log(this.project.id);
      console.log(this.state.value);
      console.log(this.key.id);
      this.setState({
        "data": "Loading..."
      });
      helpers.updateCellValue(this.project, this.key, parseInt(this.state.value)).then((cell)=>{
        this.setState.value = cell.value;
        this.updateViewport(this.value);
        this.setState({
          "data": parseInt(this.state.value)
        });
    });
  }
}

handleSubmitKey(e) {
  console.log(this.refs.keyItem.value);
  if(this.refs.keyItem.value === ''){
    alert('Key is required');
  } else {
    this.setState({newKey:{
      keyItem: this.refs.keyItem.value
    }}, function(){
       console.log(this.state.newKey);
       helpers.createCell(this.project, this.refs.keyItem.value)
    });
  }
   e.preventDefault();
}

UpdateDataTable(e){
  e.preventDefault();
  console.log('Updated')
}

  render() {
    // console.log(this.state.data); // value of initial state
    // console.log(this.state.value); // value of slider

    // console.log(this.key); // Obtains the key
    // console.log(this.project); // Obtains the key

    // console.log(this.state.keys);

    return (
      <div className="App">
          {this._getOptions()}
          {this._getContent()}
          <div className="info">
            <Projects projects={this.state.projects} />
            <hr/>
            <KeyList test="Hello World" keyList={this.state.keys} keyData={this.state.data} />
            <hr />

            <DataTable test="Hello World" dataTableList={this.state.attributeName} dataTableValue={this.state.message} />

            <div className="DataTable">
              <br/>
              <div className="UpdateDataTable">
                <form onSubmit={this.UpdateDataTable.bind(this)} >
                  <div className="UpdateDataTable">
                    <input type="submit" value="Update" onClick={this.UpdateDataTable.bind(this)} />
                  </div>
                </form>
              </div>
            </div>

            <hr />

            <h3>Data Table</h3>
            <div id="showData" className="showDataTable" ></div>

            <hr/>

            <div className="AddKey">
              <form onSubmit={this.handleSubmitKey.bind(this)} >
                <h3>Add Key</h3>
                <div className="create">
                  <input type="text" ref="keyItem" />
                  <input type="submit" value="Create Key" onClick={this.handleSubmitKey.bind(this)} />
                </div>
              </form>
            </div>
            <hr />
            <h3>Update Key</h3>
            <strong>Current Value of key:</strong> {this.state.data}

            <form>
              <input
                style={{ width: 250}}
                id="key_slider"
                type="range"
                min="0" max="100"
                step="1"
                defaultValue={this.state.data}
                onChange={this.keyChange.bind(this)}
                ref={(input) => this.input = input}
              />
              <strong>New Value to submit:</strong> {this.state.value}
              <br/>
              <br/>
              <input type="submit" value="Submit" onClick={this.updateKey.bind(this)} />
            </form>

            <hr/>

            <div id="notifications">
              <h3>Update Log</h3>
              <textarea id="console" className="fields" type="text" onChange={(e)=>{this._handleDataChange(e)}} value={this.notificationHandler} ref={(area)=>{this._comment = area;}} name="Data" ></textarea>
            </div>

          </div>
      </div>
    );
  }
}

export default App;
