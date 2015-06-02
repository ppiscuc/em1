import PouchDB from 'pouchdb';
import MemberActions from '../actions/MemberActions';

class PouchUtil {
  constructor () {
    console.log('storage constructor');
    this.db = new PouchDB('members');
}
addMember (member) {
  this.db.put(member, function(err,result){
    if (!err) {
      console.log('Added member successsfully.');
    }
  });
}
_allMembers(){
    this.db.AllDocs({include_docs: true, descending: true}, function(err, doc){
      return doc.rows;
    });
}
updateMember(updatedmember) {
    console.log('updating member with _id', updatedmember._id);
    this.db.put(updatedmember, function(err, result){
      if (!err) {
        console.log('Edited member successsfully');
      }
    });
}
deleteMember(member) {
    this.db.remove(member);
}
getAllMembers() {
  let members = this._allMembers();
  MemberActions.membersUpdated({members});
}
}

export default new PouchUtil();
