var _ = require('underscore');
var fs = require('fs');
var PouchDB = require('pouchdb');
var babyparse = require('babyparse');
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
    console.log('fetch all members again');
    var members = [];
    wpouch.allDocs({include_docs: true}, function(err, doc){
      if (err) {
        console.log('error fetching docs', err);
      }
      for (var i = 0; i < doc.rows.length; i++) {
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
  onImport: function(csvinput) {
    let results = babyparse.parse(csvinput, {
      header: true,
      dynamicTyping: true
    });
    if (results.errors.message) {
      console.log(results.errors);
    } else {
      let members = results.data;
      console.log(members);
      MemberServerActions.onMembersUpdated({members});
    }

  }

  };
