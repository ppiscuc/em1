var _ = require('underscore');
var fs = require('fs');
var PouchDB = require('pouchdb');
var MemberServerActions = require('../actions/MemberServerActions');

module.exports = {
  addMember: function(member) {
    wpouch.put(member, function(err,result){
      if (!err) {
        console.log('Added member successsfully.');
      }
    });
  },
  updateMember: function(updatedmember) {
    console.log('updating member with _id', updatedmember._id);
    wpouch.put(updatedmember, function(err, result){
      if (!err) {
        console.log('Edited member successsfully');
      }
    });
  },
  deleteMember: function(member) {
    wpouch.remove(member);
  },
  fetchAllMembers: function() {
    console.log("fetch all members again");
    var members = [];
    wpouch.allDocs({include_docs: true}, function(err, doc){
      if (err) {
        console.log('error fetching docs', err);
      }
      for (var i=0;i<doc.rows.length;i++) {
        members.push(doc.rows[i].doc);
      }
      console.log(members);
      //FIXME timer to simulate delay in loading of events
      //var stop = new Date().getTime();
      //while(new Date().getTime() < stop + 10000) {
      //    ;
      //  }
      MemberServerActions.onMembersUpdated({members});


    });
    if (members.length === 0) {
      console.log('no members yet');
    }
  },
  saveSettings: function(settings) {
   localStorage.setItem('settings', JSON.stringify(settings));
  },
  fetchSettings: function() {
    let settings = JSON.parse(localStorage.getItem('settings')) || {};
    MemberServerActions.onSettingsUpdated({settings});
},
  exportData: function(members) {
    let header = ['first_name',
                  'last_name',
                  'birth_date',
                  'gender',
                  'phone',
                  'mobile',
                  'address',
                  'city',
                  'email',
                  'baptised_date',
                  'baptised_church',
                  'membership_status',
                  'member_since',
                  'marital_status',
                  'details',
                  '_id',
                  '_rev'];
    let csvheader = header.join(',');
    let csv = '';
    csv += csvheader + '\r\n';
    _.each(members, function(member, i){
      console.log(i, member);
      let line = '';
      _.each(member, function(mvalue, mkey){
        console.log(mkey, mvalue);
          line += mvalue + ',';
      });
      line = line.slice(0, line.length - 1);
      csv += line + '\r\n';
    });
    console.log(csv);
  }
};
