import React, { Component } from "react";
import axios from "axios";
// function fetch() {
//     return new Promise(resolve => setTimeout(() => resolve(42), 1000));
//   }
  
//   function fetchAPI(param) {
//     // param is a highlighted word from the user before it clicked the button
//     console.log('heyyyyy')
//     return fetch("https://api.com/?param=" + param);
//   }

export default class Login extends Component {
    state = { result: null };

  login = (info,e) => {
    console.log("info is: " +info)
    var api = "http://localhost:3000/api/mail/login";
    //var token = "eyJraWQiOiJkZWZhdWx0LWdyYXZpdGVlLUFNLWtleSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJhNWYxNzM2Zi03ZDMxLTQyZmEtYjE3My02ZjdkMzEyMmZhNjciLCJhdWQiOiJka3VPbzMyOXUiLCJkb21haW4iOiJ0b29iYW1peCIsImlzcyI6Imh0dHA6Ly9ncmF2aXRlZS5hbSIsImV4cCI6MTU5NDA3MjczMiwiaWF0IjoxNTk0MDY1NTMyLCJqdGkiOiI3NTliN2RkYy1lODIzLTRhNGQtOWI3ZC1kY2U4MjMzYTRkYmMifQ.HenfYeyBJbY3xaz7jXskC82-rWjL9k72eEgRfhjK4eU";

    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization': `Bearer ${token}`
      },
      data: { "email": info.email , "password" :info.password}

    }
    axios(request)
      .then(Response => {
        console.log('hhhhhhhhhhhhhhhhhhhhhhhh')
        console.log(Response.data)
      }).catch(err => {
        console.log("here is what im rejecting:", err)
    })

    // fetch('http://localhost:3000/api/mail/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(info)
    //   }).then(response => {
    //     if (response.ok) {
    //       response.json().then(json => {
    //         console.log(json)
    //         // console.log(json);
    //         // state.token = json.token
    //         // console.log('now:')
    //         // console.log(state)
    //       });
    //     }
    // })
  }
    render() {
        return (
                <form>
                <h3>Login</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                    onChange={e => this.setState({ email: e.target.value }) } />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                    //value={this.state.value}
                    onChange={e => this.setState({ password: e.target.value }) }/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={e=>this.login(this.state,e)}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
           
        );
    }
}