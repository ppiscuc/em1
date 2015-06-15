var React = require('react');
var Router = require('react-router');
var MemberActions = require('../actions/MemberActions.js');

var NewMember = React.createClass({
    mixins: [Router.State],
    handleSave: function(e) {
      console.log('handlesave');
        e.preventDefault();
        var newmember = {};
        newmember.first_name = this.refs.first_name.getDOMNode().value.trim();
        newmember.last_name = React.findDOMNode(this.refs.last_name).value.trim();
        newmember.birth_date = React.findDOMNode(this.refs.birth_date).value.trim();
        newmember.gender = 'masculin';
        if (React.findDOMNode(this.refs.genderfeminin).checked) {
            newmember.gender = 'feminin';
        }
        newmember.phone = React.findDOMNode(this.refs.phone).value.trim();
        newmember.mobile = React.findDOMNode(this.refs.mobile).value.trim();
        newmember.address = React.findDOMNode(this.refs.address).value.trim();
        newmember.city = React.findDOMNode(this.refs.city).value.trim();
        newmember.baptised_date = React.findDOMNode(this.refs.baptised_date).value.trim();
        newmember.baptised_church = React.findDOMNode(this.refs.baptised_church).value.trim();
        newmember.membership_status = React.findDOMNode(this.refs.membership_status).value.trim();
        newmember.member_since = React.findDOMNode(this.refs.member_since).value.trim();
        newmember.marital_status = React.findDOMNode(this.refs.marital_status).value.trim();
        newmember.details = React.findDOMNode(this.refs.details).value.trim();

        if (!newmember.first_name || !newmember.last_name || !newmember.birth_date || !newmember.gender || !newmember.membership_status) {
            return;
        }
        MemberActions.onCreate(newmember);
        //clean the fields
        React.findDOMNode(this.refs.first_name).value = '';
        React.findDOMNode(this.refs.last_name).value = '';
        React.findDOMNode(this.refs.birth_date).value = '';
        //React.findDOMNode(this.refs.gendermasculin).checked = true;
        React.findDOMNode(this.refs.phone).value = '';
        React.findDOMNode(this.refs.mobile).value = '';
        React.findDOMNode(this.refs.address).value = '';
        React.findDOMNode(this.refs.city).value = '';
        React.findDOMNode(this.refs.baptised_date).value = '';
        React.findDOMNode(this.refs.baptised_church).value = '';
        React.findDOMNode(this.refs.membership_status).value = '';
        React.findDOMNode(this.refs.member_since).value = '';
        React.findDOMNode(this.refs.marital_status).value = '';
        React.findDOMNode(this.refs.details).value = '';
    },
renderTextInput: function(id, label, placeholder) {
        return (
                <div className="form-group">
                    <label htmlFor={id} className="col-sm-4 control-label" >{label}</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control input-sm" id={id} ref={id} placeholder={placeholder} />
                    </div>
                </div>
                );
    },
    renderSelect: function(id, label, values) {
        var options = values.map(function(value){
            return (
                    <option value={value}>{value}</option>
                    );
        });
        return (
                <div className="form-group">
                    <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
                    <div className="col-sm-6">
                        <select className="form-control input-sm" id={id} ref={id}>
                            {options}
                        </select>
                    </div>
                </div>
                );
    },
    renderRadioInline: function(id, label, kwargs){
        var radios = kwargs.values.map(function(value){
            var defaultChecked = (value === kwargs.defaultCheckedValue);
            return (
                        <div className="radio" >
                        <label>
                        <input type="radio" ref={id + value} name={id} value={value} defaultChecked={defaultChecked} />
                        {value}
                        </label>
                        </div>
                    );
        });
        return (
                <div className="form-group">
                    <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
                    <div className="col-sm-6">
                        {radios}
                    </div>
                </div>
                );
    },
    render: function() {
        var that = this;
        return (
                <div>
                <h1>Adauga un nou membru</h1>
                <form className="form-horizontal">
                  {this.renderTextInput('first_name', 'Prenume')}
                  {this.renderTextInput('last_name', 'Nume')}
                  {this.renderTextInput('birth_date', 'Data nasterii', 'DD/MM/YYYY')}
                  {this.renderRadioInline('gender', 'Sex', {values: ['masculin', 'feminin'], defaultCheckedValue: 'masculin'})}
                  {this.renderTextInput('phone','Fix')}
                  {this.renderTextInput('mobile', 'Mobil')}
                  {this.renderTextInput('address', 'Adresa')}
                  {this.renderTextInput('city','Oras')}
                  {this.renderTextInput('email', 'Email', 'email@domain.com')}
                  {this.renderTextInput('baptised_date', 'Data botez', 'DD/MM/YYYY')}
                  {this.renderTextInput('baptised_church', 'Biserica botez')}
                  {this.renderTextInput('membership_status', 'Status')}
                  {this.renderTextInput('member_since', 'Membru de la', 'DD/MM/YYYY')}
                  {this.renderSelect('marital_status', 'Statut marital', ['casatorit', 'necasatorit', 'divortat', 'vaduv'])}
                  {this.renderTextInput('details', 'Detalii')}
                  <div className="form-group">
                      <div className="col-sm-4"></div>
                      <div className="col-sm-6">
                      <button className="btn btn-action" onClick={this.handleSave} type="submit">Adauga</button>
                      </div>
                  </div>
                </form>
                </div>
                );
    }
});

module.exports = NewMember;
