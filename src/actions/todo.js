var alt = require('../alt');
//es6
//class FoodActions {
// update Location(city) {
//  this.dispatch(city)
//  }
//  }
//  var foodActions = alt.createActions(FoodActions)
var foodActions = alt.createActions({
  addItem: function(item){
      this.dispath(item);//send data to dispatcher, 1 argument only
}
});
