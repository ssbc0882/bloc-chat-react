import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomsName: ''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ newRoomsName: event.target.value });
    }

    createRoom(event) {
        event.preventDefault();

        this.roomsRef.push({ name: this.state.newRoomsName });
        this.setState({ newRoomsName: '' });
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room) })
        });
    }
    render() {
        return (
            <section id="roomList">
                <h1>Chat Rooms</h1>
                <ul>
                    {this.state.rooms.map((room, index) =>
                        <li key={index} onClick={() => this.props.setCurrentRoom(room)}> {room.name}</li>
                    )}
                </ul>
                <form onSubmit={(event) => this.createRoom(event)}>
                    <label>Create Room:
                    <input type="text" value={this.state.newRoomsName} placeholder="enter here" onChange={(event) => this.handleChange(event)} />
                    </label>
                    <button type="submit">Create Room</button>
                </form>
            </section>
        );
    }
}
export default RoomList;