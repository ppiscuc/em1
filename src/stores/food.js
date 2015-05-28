var alt=require('alt');
//class LocationStore {
//  constructor() {
//    this.bindAction(locationActions.updateLocation, this.onUpdateLocation)
// 
//    this.city = 'Denver'
//    this.country = 'US'
//  }
// 
//  onUpdateLocation(obj) {
//    var { city, country } = obj
//    this.city = city
//    this.country = country
//  }
//}
// 
//var locationStore = alt.createStore(LocationStore)
var FoodStore = alt.createStore({
  displayName: 'FoodStore',
  bindListeners: {
    addItem: foodActions.addItem //bind the dispatcher with the action
  },
  state: {
    foods: [],
  },
  addItem: function(item) {
    var foods = this.state.foods;
    foods.push(item);
    this.setState({
      foods: foods
    });  
});
