this.vp.addEventListener(FluxViewport.getChangeEvent(), function(e) {
  var ObjectMap = getSelection(this.projectId, this.selection);

  console.log(ObjectMap);

//

this.vp.addEventListener(FluxViewport.getChangeEvent(), function(e) {
  var ObjectMap = getSelection(this.projectId, this.selection);

  console.log(ObjectMap);
  // if(FluxViewport.getEvents().SELECT === e.event) {
  //   console.log(e.event)
  // }
})

//

this.vp.addEventListener(FluxViewport.getChangeEvent(), function(e) {
  // if(FluxViewport.getEvents().SELECT) {
  //   var selection = this.vp.getSelection(selection);
  //   console.log(selection)
  // };
  if(FluxViewport.getEvents().SELECT === e.event){

    console.log();
  }
});
