this.vp.addEventListener(FluxViewport.getChangeEvent(), function(e) {
  var selectedGeometry = e.selection;
  // console.log(e.selection)
  for(this.x in selectedGeometry) {
    var selectedGeometryObject = selectedGeometry[this.x];
  }
  if(selectedGeometryObject !== null && selectedGeometryObject !== undefined) {
    // console.log(selectedGeometryObject);
    // console.log(JSON.stringify(selectedGeometryObject.userData.data));

    // var myData = JSON.parse("[" + JSON.stringify(selectedGeometryObject.userData.data) + "]" );
    var myData = JSON.parse(JSON.stringify(selectedGeometryObject.userData.data));

    var col=[];

    for(var i in myData){
        // var key = i;
        var val = myData[i];
        for(var j in val){
            var sub_key = j;
            var sub_val = val[j];
            col.push(sub_key);
            // console.log(sub_key);
            // console.log(sub_val);
            // console.log(col);
        }
    }

    var dataTableList = col;

    console.log(JSON.stringify(myData))

    // console.log(JSON.stringify(myData))

    var col = [];
    for (var i = 0; i < myData.length; i++) {
        for (var key in myData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myData[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);


    // console.log(myData);
  } else {
    console.log("Nothing")
    $( "#showData" ).empty();
  }
});
}
