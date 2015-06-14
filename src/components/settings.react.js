var React = require('react/addons');
var Router = require('react-router');
var MemberStore = require('../stores/MemberStore');
var validator = require('validator');
var fs = require('fs');
var path = require('path');
var MemberActions = require('../actions/MemberActions');
var babyparse = require('babyparse');
var shell = require('shell');

var remote = require('remote');

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
  validate: function() {
    let errors = {};
    if (!validator.isAlphaNumberic(this.state.church_name)) {
      errors.church_name = 'Valoarea trebuie sa fie alfanumerica';
    }
    if (!validator.isAlphaNumberic(this.state.church_address)) {
      errors.church_address = 'Valoarea trebuie sa fie alfanumerica';
    }
    return errors;

  },
  handleChange: function(e) {
    e.preventDefault();
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
  handleImport: function(e) {
    e.preventDefault();
    let that = this;
    let reader = new FileReader();
    let file = this.refs.file.getDOMNode().files[0];

    reader.onload = function(output) {
      let result = output.target.result;
      console.log(result);
      MemberActions.onImport(result);
    };
    reader.readAsText(file);

  },
  handleExport: function(e) {
    e.preventDefault();
    let members = MemberStore.all();
    let memberscsv = babyparse.unparse(members, {
      quotes: false,
      delimiter: ',',
      newline: '\r\n'
    });
    console.log(memberscsv);

    if (!memberscsv) {
      console.log('no members to download');
      return false;
    }
    let filePath = path.join(__dirname, '..', 'export.csv')
    //save it to a file
    fs.writeFile(filePath, memberscsv, function(err){
      if (err) {
        return console.log('file not written');
      }
      console.log('file saved');
      shell.openItem(filePath);
    });
  },
  render: function() {
      return (<div>
              <div className="settings-panel">
                <h3>Setari generale</h3>
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
                <div className="settings-panel">
                  <h3>Importa datele</h3>
                  <form className="form-horizontal" ref="form" enctype="multipart/form-data">
                    <div className="form-group">
                      <div className="col-sm-4"></div>
                      <div className="col-sm-6"><input type="file" ref="file" name="file"/></div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-4"></div>
                      <div className="col-sm-6"><button className="btn btn-action" type="submit" onClick={this.handleImport}>Upload</button></div>
                    </div>
                  </form>
                </div>
                <div className="settings-panel">
                  <h3>Exporta datele</h3>
                  <button className="btn btn-action" onClick={this.handleExport}> Exporta datele</button>
                </div>
              </div>
              );
  }
});

module.exports = Settings;
