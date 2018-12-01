import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCAF1_XhXUmLPV-zAFtHMuqzwnfC69d4Yg",
  authDomain: "bloc-chat-70769.firebaseapp.com",
  databaseURL: "https://bloc-chat-70769.firebaseio.com",
  projectId: "bloc-chat-70769",
  storageBucket: "bloc-chat-70769.appspot.com",
  messagingSenderId: "567430956432"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRoom: '',
      user: null
    }
  }
  setCurrentRoom(room) {
    console.log(room.key)
    this.setState({ currentRoom: room })
  }

  setUser(user) {
    if (user === null) {
      return this.setState({ user: "Guest" })
    } else {
      return this.setState({ user: user.displayName })
    }
  }

  render() {
    return (
      <div className="App">

        <header>
          <h1>Chat</h1>
        </header>
        <main>
          <RoomList firebase={firebase} setCurrentRoom={(room) => this.setCurrentRoom(room)} />
          <MessageList firebase={firebase} currentRoom={this.state.currentRoom} />
          <div className="display-user">
            <h3>{this.state.user}</h3>
          </div>
          <User firebase={firebase} setUser={(user) => this.setUser(user)} user={this.state.user} />
        </main>
      </div>
    );
  }
}

export default App;
