var React = require('react/addons');
var Router = require('react-router');
var MemberStore = require('../stores/MemberStore');
var validator = require('validator');
var _ = require('underscore');
var MemberActions = require('../actions/MemberActions');

var Settings = React.createClass({
  getInitialState: function() {
    return MemberStore.getState();
  },
  componentDidMount: function() {
    MemberStore.listen(this.update);
    MemberActions.fetchSettings();
  },
  componentWillUnmount: function() {
    MemberStore.unlisten(this.update);
  },
  update() {
    this.setState(MemberStore.getState());
  },
  validate () {
    let errors = {};
    if (!validator.isAlphaNumberic(this.state.church_name)) {
      errors.church_name = "Valoarea trebuie sa fie alfanumerica";
    }
    if (!validator.isAlphaNumberic(this.state.church_address)) {
      errors.church_address = "Valoarea trebuie sa fie alfanumerica";
    }
    return errors;

  },
  handleChange: function(e) {
    var that = this;
    if (e.target === this.refs.church_name.getDOMNode()) {
      that.setState({
        church_name: e.target.value
      });
    } else if (e.target === this.refs.church_address.getDOMNode()) {
        that.setState({
          church_address: e.target.value
        });
      }
  },
  handleSave: function(e) {
    e.preventDefault();
    let settings = {
      church_name: this.state.church_name,
      church_address: this.state.church_address
    };
    console.log('handleSave', settings);
    //let errors = this.validate();
    //this.setState({errors});
      MemberActions.onNewSettings({settings});
  },
  render: function() {
      return (
              <div>
                <h1>Settings</h1>
                <form className="form-horizontal">
                  <div className="form-group">
                      <label htmlFor='church_name' className="col-sm-4 control-label">Nume biserica</label>
                      <div className="col-sm-6">
                          <input type="text" className="form-control" name='church_name' ref='church_name' placeholder='Nume biserica' value={this.state.church_name} onChange={this.handleChange} />
                            <p className="error-message">{this.state.errors}</p>

                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="church_address" className="col-sm-4 control-label">Adresa</label>
                      <div className="col-sm-6">
                          <input type="text" className="form-control" name='church_address' ref='church_address' placeholder="Adresa" value={this.state.church_address} onChange={this.handleChange} />
                            <p className="error-message">{this.state.errors}</p>

                      </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-6">
                      <button className="btn btn-action" disabled={this.props.loading} onClick={this.handleSave} type="submit">Save</button>
                    </div>
                  </div>
                </form>
                </div>
              );
  }
});

module.exports = Settings;
