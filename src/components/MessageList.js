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
            newMessage: "",

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

    handleChange(event) {
        event.preventDefault();
        this.setState({
            content: event.target.value,
        });
    }

    createMessage(event) {
        event.preventDefault();

        this.messagesRef.push({
            username: this.props.user,
            content: this.state.content,
            sentAt: Date.now(this.props.firebase.database.ServerValue.TIMESTAMP),
            roomId: this.props.currentRoom.key,
        });
        console.log(this.state.content);
        console.log(this.props.currentRoom);
        this.setState({ content: '' });
    }


    render() {
        return (
            <div className="message-rooms">
                <h1 className="room-title">{this.props.currentRoom.name}</h1>

                <ul>
                    {this.state.message.filter(message => message.roomId === this.props.currentRoom.key).map((message, index) =>
                        <div key={index}>
                            <li>{message.username}</li>
                            <li>{message.content}</li>
                            <li>{message.sentAt}</li>
                        </div>)
                    }
                </ul>
                <form onSubmit={(event) => this.createMessage(event)}>
                    <label>Create Message:
                    <input type="text" value={this.state.content} placeholder="enter message" onChange={(event) => this.handleChange(event)} />
                    </label>
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default MessageList;