import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomsName: '',
            roomNameEdit: ''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ newRoomsName: event.target.value });
    }

    handleEdit(event) {
        this.setState({ roomNameEdit: event.target.value });
    }

    createRoom(event) {
        event.preventDefault();

        this.roomsRef.push({ name: this.state.newRoomsName });
        this.setState({ newRoomsName: '' });
    }

    deleteRoom(key) {
        this.setState({ rooms: this.state.rooms.filter((thisRoom) => thisRoom.key !== key) })
        this.roomsRef.child(key).remove();
    }

    editRoomName(event) {
        event.preventDefault();
        const roomKey = this.props.currentRoom.key;
        const nameRef = this.props.firebase.database().ref('rooms').child(roomKey);
        nameRef.set({ name: this.state.roomNameEdit });
        console.log(this.state.roomNameEdit);
        document.getElementById("edit-rooms").reset();
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room) })
        });
        this.roomsRef.on('child_removed', snapshot => {
            this.setState({ rooms: this.state.rooms.filter(room => room.key !== snapshot.key) })
        });
        this.roomsRef.on('child_changed', snapshot => {
            const changedRoom = snapshot.val();
            changedRoom.key = snapshot.key;
            const newArray = this.state.rooms;
            for (let i = 0; i < newArray.length; i++) {
                if (newArray[i].key === this.props.currentRoom.key) {
                    newArray[i] = changedRoom;
                }
            }
            this.setState({ rooms: newArray });
        });
    }

    render() {
        return (
            <section id="roomList">
                <h1>Chat Rooms</h1>
                <ul>
                    {this.state.rooms.map((room, index) =>
                        <li key={index} onClick={() => this.props.setCurrentRoom(room)}>   {room.name} <button id="delete-room" onClick={(event) => this.deleteRoom(room.key)}>Delete</button></li>

                    )}
                </ul>

                <form onSubmit={(event) => this.createRoom(event)}>
                    <label>Create Room:
                    <input type="text" value={this.state.newRoomsName} placeholder="enter here" onChange={(event) => this.handleChange(event)} />
                    </label>
                    <button type="submit">Create Room</button>
                </form>
                <form id="edit-rooms" onSubmit={(event) => this.editRoomName(event)} >
                    <label> Edit Room Name </label>
                    <input type="text" onChange={(event) => this.handleEdit(event)} />
                    <input type="submit" />
                </form>

            </section>
        );
    }
}
export default RoomList;