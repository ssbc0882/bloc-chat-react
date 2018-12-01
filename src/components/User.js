import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false
        }
    }

    userSignedIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.props.setUser(user);
                console.log(this.props.user)
            });
    }

    userSignedOut() {
        this.props.firebase.auth().signOut()
            .then((result) => {
                console.log("signed out successful");
                this.props.setUser(null);
            });
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            this.props.setUser(user);
        });
    }

    render() {
        return (
            <section className="user-display">
                <div className="user-displayName">{this.props.user ? this.props.user.displayName : " "} </div>
                <button className="sign-in-button" onClick={() => this.userSignedIn()}>Sign In</button>
                <button className="sign-out-button" onClick={() => this.userSignedOut()}>Sign Out</button>

            </section>

        )
    }


}

export default User;