var PouchDB = require('pouchdb');
var MemberActions = require('../actions/MemberActions');

module.exports = {
  addMember: function(member) {
    wpouch.put(member, function(err,result){
      if (!err) {
        console.log('Added member successsfully.');
      }
    });
  },
  _allMembers: function() {
    wpouch.allDocs({include_docs: true, descending: true}, function(err, doc){
      return doc.rows;
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
  search: function(query) {
    var members = [];
    wpouch.allDocs({include_docs: true, descending: true})
    .then(function(result){
      members.push(result.rows);
    }).catch(function(err){
      console.log('error fetching docs');
    });
    MemberActions.membersUpdated({members});
  }
};
