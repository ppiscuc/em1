import PouchDB from 'pouchdb';

class Pdb {
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
allMembers(){
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
}

export default new Pdb();
