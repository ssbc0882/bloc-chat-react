import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      currentRoom: ''
    }
  }
  setCurrentRoom(room) {
    console.log(room.key)
    this.setState({ currentRoom: room })
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
        </main>
      </div>
    );
  }
}

export default App;
