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
