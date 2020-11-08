import React from "react";
import {withRouter, Link} from 'react-router-dom'

class ViewProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userId: this.props?.location?.state?.id,
        name: "",
        age: "null",
        bio: "",
        gender: "Female",
        genderPreference: "Female",
        education: "",
        interests: "",
        error: "",
        maxDistance: 10,
      };
    }
    componentDidMount(){
      console.log("fetch profile", this.state.userId)
      const myRequest = new Request('http://127.0.0.1:5000/viewprofile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"userId": this.state.userId}),
        });
    fetch(myRequest)
        .then(response => response.json())
        .then(res => 
                this.setState({
                    name: res.name,
                    age: res.age, 
                    bio: res.bio,
                    gender: res.gender,
                    genderPreference: res.genderPreference,
                    education: res.education, 
                    interests: res.interests,
                    maxDistance: res.maxDistance,
                })
        ).catch((error) => {
            console.error(error)
        })
        console.log(this.state)
      }

    render() {
      return (
        <div className="Profile">
          <form id="profileForm">
            <h1>View My Profile</h1>
            <Link to={{pathname: '/main', state: {id: this.state.userId}}}>Back to Swiping!</Link>
            <Link to={{pathname: '/editprofile', state: {id: this.state.userId}}}>Edit Profile</Link>
            <p>Name:</p>

            {this.state.name}

            <p>Age:</p>

            {this.state.age}

            <p>Your Gender:</p>

            <select
              name = "gender"
              value = {this.state.gender}
            >
              <option value="Female">Female</option>
              <option value ="Male">Male</option>
              <option value ="Both">Both</option>
            </select>

            <p>Your Preferred Gender for friends:</p>
            <select
              name = "genderPreference"
              value = {this.state.genderPreference}
            >
              <option value="Female">Female</option>
              <option value ="Male">Male</option>
              <option value ="Both">Both</option>
            </select>

            <p>Education/Work:</p>
            {this.state.education}

            <p>Your interests:</p>
            {this.state.interests}

            <p>Bio:</p>
            {this.state.bio}

            <p>Max Distance:</p>
            <input type="range" name="maxDistance" value = {this.state.maxDistance} min="1" max="99999"/>
            <text>{this.state.maxDistance}KM</text><br></br>
          </form>
          <text>{this.state.error}</text>
        </div>
      );
  };
}
export default withRouter(ViewProfile);
