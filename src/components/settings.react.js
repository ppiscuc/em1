var React = require('react/addons');
var Router = require('react-router');
var MemberStore = require('../stores/MemberStore');
var validator = require('validator');
var _ = require('underscore');
var MemberActions = require('../actions/MemberActions');

var Settings = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    console.log('getInitialState');
    return MemberStore.getState();
  },
  componentDidMount() {
    console.log('componentDidMount');
    React.findDOMNode(this.refs.church_nameInput).focus();
    MemberStore.listen(this._onChange);
  },
  componentDidUnmount() {
    console.log('componentDidUnmount');
    MemberStore.unlisten(this._onChange);
  },
  _onChange() {
    console.log('_onChange');
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
  handleSave() {
    console.log('handleSave', this.state.church_name, this.state.church_address);
    //let errors = this.validate();
    //this.setState({errors});
    let errors = {};
    if (_.isEmpty(errors)){
      console.log('handlesave ', this.state.church_name, this.state.church_address);
      MemberActions.onNewSettings(church_name, church_address);
    };
  },
  render: function() {
      return (
              <div>
                <h1>Settings</h1>
                <form className="form-horizontal">
                  <div className="form-group">
                      <label htmlFor='church_name' className="col-sm-4 control-label">Nume biserica</label>
                      <div className="col-sm-6">
                          <input type="text" className="form-control" name='church_name' ref='church_nameInput' placeholder='Nume biserica' valueLink={this.linkState('church_name')} />
                            <p className="error-message">{this.state.errors}</p>

                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="church_address" className="col-sm-4 control-label">Adresa</label>
                      <div className="col-sm-6">
                          <input type="text" className="form-control" name='church_address' ref='church_addressInput' placeholder="Adresa" valueLink={this.linkState('church_address')} />
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

export default Settings;
