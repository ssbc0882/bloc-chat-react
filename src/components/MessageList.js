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

        this.messagesRef = this.props.firebase.database().ref('message');
    }
    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ message: this.state.Messages.concat(message) })
        });
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ content: e.target.value });
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     if (this.state.message) {
    //         {
    //             console.log(this.props.currentRoom)
    //             this.messagesRef.push({
    //                 username: this.state.username,
    //                 content: this.state.content,
    //             })
    //             this.setState({ content: '' })
    //         }
    //     }
    // }

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

                        </div>
                    )
                    }
                </ul>
            </div >
        )
    }
}

export default MessageList;