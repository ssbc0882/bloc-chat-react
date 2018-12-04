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

    const showMessages = this.state.currentRoom;

    return (
      <div className="App">

        <header>
          <h1>Chat</h1>
          <h2>{this.state.user}</h2>
          <User firebase={firebase} setUser={(user) => this.setUser(user)} user={this.state.user} />
        </header>
        <main>
          <aside>
            <RoomList firebase={firebase} setCurrentRoom={(room) => this.setCurrentRoom(room)} />
          </aside>

          {showMessages ?
            <MessageList firebase={firebase} currentRoom={this.state.currentRoom} user={this.state.user} />
            : (null)}

        </main>
      </div>
    );
  }
}

export default App;
