var React = require('react');
var Router = require('react-router');
var MemberActions = require('../actions/MemberActions.js');

var MemberDetail = React.createClass({
    contextTypes: {
          router: React.PropTypes.func
    },
    handleSubmit: function(e) {
        //handle the submit of the form
        e.preventDefault();
        var member;
        member.first_name = this.refs.first_name.getDOMNode().value.trim();
        member.last_name = React.findDOMNode(this.refs.last_name).value.trim();
        member.birth_date = React.findDOMNode(this.refs.birth_date).value.trim();
        member.gender = 'masculin';
        if (React.findDOMNode(this.refs.genderfeminin).checked) {
            gender = 'feminin';
        }
        member.phone = React.findDOMNode(this.refs.phone).value.trim();
        member.mobile = React.findDOMNode(this.refs.mobile).value.trim();
        member.baptised_date = React.findDOMNode(this.refs.baptised_date).value.trim();
        member.baptised_church = React.findDOMNode(this.refs.baptised_church).value.trim();
        member.membership_status = React.findDOMNode(this.refs.membership_status).value.trim();
        member.member_since = React.findDOMNode(this.refs.member_since).value.trim();
        member.marital_status = React.findDOMNode(this.refs.marital_status).value.trim();
        member.details = React.findDOMNode(this.refs.details).value.trim();

        if (!member.first_name || !member.last_name || !member.birth_date || !member.gender || !member.status) {
            return;
        }
        MemberActions.update(member);
    },
    renderTextInput: function(id, label, placeholder, defaultValue) {
        return (
                <div className="form-group">
                    <label htmlFor={id} className="col-sm-4 control-label" >{label}</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id={id} ref={id} placeholder={placeholder} defaultValue={defaultValue}/>
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
                        <select className="form-control" id={id} ref={id}>
                            {options}
                        </select>
                    </div>
                </div>
                );
    },
    renderRadioInline: function(id, label, kwargs){
        var radios = kwargs.values.map(function(value){
            var defaultChecked = (value == kwargs.defaultCheckedValue);
            return (
                        <div className="radio" >
                        <label>
                        <input type="radio" ref={id+value} name={id} value={value} defaultChecked={defaultChecked} />
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
        //var memberId = this.context.router.getParams().memberId; FIXME we do not need this anymore
        var currentMember = this.props.curmember; //get memberData via props
        return (
                <div>
                    <p>MemberID: {memberId}</p>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        {this.renderTextInput('first_name', 'Prenume', currentMember.firstname)}
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
                                <input type="submit" value="Submit" />
                            </div>
                        </div>
                </form>
                </div>
                );
    }

});

module.exports = MemberDetail;
