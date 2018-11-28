import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: [],
            username: "",
            content: "",
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: "",


        };

        this.messagesRef = this.props.firebase.database().ref('Messages');
    }
    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ message: this.state.message.concat(message) })
        });
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ content: e.target.value });
    }


    render() {
        console.log(this.props.currentRoom)
        return (
            <div className="message-rooms">
                <h1 className="room-title">{this.props.currentRoom.name}</h1>

                <ul>
                    {this.state.message.filter(message => message.roomId === this.props.currentRoom.key).map((message, index) =>
                        <div key={index}>
                            <li>{message.username}</li>
                            <li>{message.content}</li>
                            <li>{message.sentAt}</li>
                            <li>{message.roomId}</li>
                        </div>)
                    }
                </ul>
            </div>
        );
    }
}

export default MessageList;