class User{

  constructor( db, name, password, imageUrl = "", friendList = [], recieved_requests = [], sent_requests = []){

    this.name = name;
    this.password = password;
    this.friendList = friendList;
    this.recieved_requests = recieved_requests;
    this.sent_requests = sent_requests;
    this.imageUrl = imageUrl;

    this.db = db;

  }

  updateUser(){

    this.db.set(this.name, this)

  }

  addFriend( friend ){

    this.friendList.push( friend );
    this.updateUser()
    return this;

  }

  changeName( newName ){

    this.name = newName;
    this.updateUser()
    return this;

  }

  removeFriend( friend ){

    this.friendList.splice( this.friendList.indexOf( this.friendList.find( friend_ => friend_ == friend ) ), 1 );
    this.updateUser()
    return this;

  }

  changePassword( newVal ){

    this.password = newVal;
    this.updateUser();
    return this;

  }

  addSentRequest( new_request ){

    this.sent_requests.push( new_request );
    this.updateUser();
    return this;

  }

  removeSentRequest( request ){

    this.sent_requests.splice( this.sent_requests.indexOf( request ), 1 );

  }

  changeImageUrl( new_Url ){

    this.imageUrl = new_Url;
    
  }
  
}



module.exports = {

  User,

};