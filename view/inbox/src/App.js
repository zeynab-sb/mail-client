import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

var loginInfo = {
  email: "",
  password: "",
  token: "",
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    // var api = "http://localhost:3000/api/mail/login";
    var api = "http://192.168.96.191:3000/api/user/login";
    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
      },
      // data: { "email": loginInfo.email, "password": loginInfo.password }
      data: { "username": loginInfo.email, "password": loginInfo.password }
    }
    axios(request)
      .then(response => {
        console.log(response.data)
        loginInfo.token = response.data.token;
        console.log('loginIngo', JSON.stringify(loginInfo))
        this.forceUpdate();
      }).catch(error => {
        alert("Wrong password")
        window.location.reload(false);
      })

  }

  render() {
    if (loginInfo.token != "") {
      return (
        <div>
          <NavigationBar title="Étoile Email Manager" user={loginInfo.email} />
          <MainContainer />
        </div>
      )
    } else {
      return (
        <div>
          <NavigationBar title="Étoile Email Manager" user={loginInfo.email} />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Login onClick={this.login.bind(this)} />
            </div>
          </div>
        </div>
      )
    }
  }

}


class NavigationBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <img className="nav-logo" src="https://image.flaticon.com/icons/svg/262/262544.svg" width="36" height="36" />
        <dev className="navbar-brand">{this.props.title}</dev>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" >{this.props.user} <span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

class MailboxLabels extends React.Component {
  // Fetch number of emails in each one and get it to me. 

  static defaultProps = {
    labels: [{
      id: 1,
      name: 'Inbox',
      emailNumber: 4
    },
    {
      id: 2,
      name: 'Drafts',
      emailNumber: 12
    }, {
      id: 3,
      name: 'Sent',
      emailNumber: 9
    }, {
      id: 4,
      name: 'Trash',
      emailNumber: 12
    }]
  };

  render() {
    return (
      <ul className="list-group">
        {/* Iterate to create labels from the props */}
        {this.props.labels.map((label) => (
          <MailboxItem
            key={label.id}
            id={label.id}
            label={label}
            onClick={this.props.onLabelClick} />
        ))}
      </ul>
    )
  }
}


class MailboxItem extends React.Component {
  // Labels that we cvreate in Mail Boxes
  handleMailboxClick() {
    console.log('handleClick ' + this.props.id);
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <li className="list-group-item justify-content-between" onClick={this.handleMailboxClick.bind(this)}>
        {this.props.label.name}
        <span className="badge badge-default badge-pill">{this.props.label.emailNumber}</span>
      </li>
    )
  }
}


class EmailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      clicked: false,
      selectedEmail: null
    }
  }

  componentDidMount() {
    var api = "http://192.168.96.191:3000/api/service/getServicesByUser";
    var token = "eyJraWQiOiJkZWZhdWx0LWdyYXZpdGVlLUFNLWtleSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiJhNWYxNzM2Zi03ZDMxLTQyZmEtYjE3My02ZjdkMzEyMmZhNjciLCJhdWQiOiJka3VPbzMyOXUiLCJkb21haW4iOiJ0b29iYW1peCIsImlzcyI6Imh0dHA6Ly9ncmF2aXRlZS5hbSIsImV4cCI6MTU5NDA3MjczMiwiaWF0IjoxNTk0MDY1NTMyLCJqdGkiOiI3NTliN2RkYy1lODIzLTRhNGQtOWI3ZC1kY2U4MjMzYTRkYmMifQ.HenfYeyBJbY3xaz7jXskC82-rWjL9k72eEgRfhjK4eU";

    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: { "name": "DNS" }

    }
    axios(request)
      .then(res => {

        const persons = res.data.results;
        this.state.results = persons;
        console.log('I have the api results', this.state.results)
      })
  };

  handleEmailClick = (id) => {

    console.log('this is clicked....', id)
    console.log('results', this.state.results)
    for (var email of this.props.emails) {
      if (email.id == id)
        this.state.selectedEmail = email;
    }
    this.state.clicked = true;
    this.forceUpdate();
  };

  render() {
    if (this.state.clicked == true) {
      console.log('herreee', this.state.clicked);
      this.state.clicked = false;
      console.log('herreee222', this.state.selectedEmail);
      console.log('emmmaailill', this.state.results)
      return (
        <p className="center">{this.state.results[0].domain_name}</p>
      )

    } else {
      console.log('herreee nott');
      return (
        <div>
          <div className="list-group">
            {/* EmailItem creation: */}
            {this.props.emails.map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                handleEmailClick={this.handleEmailClick} />
            ))}
          </div>
        </div>
      )
    }
  }
}


class EmailItem extends React.Component {
  // The methods in the previos Class should be moved to here
  handleEmailClick() {
    this.props.handleEmailClick(this.props.email.id);
  }

  render() {
    return (
      <li className="list-group-item d-flex justify-content-start" onClick={this.handleEmailClick.bind(this)}>
        <div className="checkbox">
          <input type="checkbox" />
        </div>

          &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
        <span className="name">{this.props.email.from}</span>
        <span>{this.props.email.subject}</span>

        <span className="ml-auto p-2">
          {/* if(this.props.email.attachment){
            <span className="fa fa-paperclip">&nbsp;&nbsp;</span>
          } */}
          <span className="badge badge-default badge-pill">{this.props.email.time}</span>
        </span>
      </li>

    )
  }
}


class EmptyBox extends React.Component {
  render() {
    console.log('state', this.props)
    return (
      <p className="center">The email box is empty {this.props.id}</p>
    )
  }
}


class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLabel: 1
    }
  }

  handleLabelClick(labelId) {
    console.log('Label clicked: ' + labelId);
    this.setState({
      selectedLabel: labelId
    });
  }


  static defaultProps = {
    emails: [
      {
        id: 0,
        labelId: 1,
        from: 'Mike James',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "11:15"
      },
      {
        id: 1,
        labelId: 1,
        from: 'Emma Thompson',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "22:08"
      },
      {
        id: 2,
        labelId: 1,
        from: 'Olivia Jefferson',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "19:12"
      },
      {
        id: 3,
        labelId: 1,
        from: 'Mike Conley',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "18:35"
      },
      {
        id: 4,
        labelId: 2,
        from: 'Emily Iverson',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "14:05"
      },
      {
        id: 5,
        labelId: 3,
        from: 'Michael Neal',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "14:05"
      }
    ]

  };


  render() {
    console.log("props: ", this.props);
    console.log("this is-> ", this.props.emails[0].labelId);
    const filteredEmails = this.props.emails.filter(e => e.labelId & e.labelId == this.state.selectedLabel);

    let content = null;
    if (filteredEmails.length > 0) {
      content = <EmailList emails={filteredEmails} />;
    } else {
      content = <EmptyBox />;
    }

    return (
      <div className="container">
        <ComposeMail />
        <hr />
        <div className="row">
          <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <MailboxLabels onLabelClick={this.handleLabelClick.bind(this)} />
          </div>
          <div className="col-12 col-sm-12 col-md-9 col-lg-10">
            {content}
          </div>
        </div>
      </div>
    )
  }
}

class ComposeMail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  handleLabelClick() {
    console.log('heeereee vhaniginf button')
    this.state.clicked = true
    loginInfo.email = "yo ha ha ha";

    //console.log('heeereee button', loginInfo)

    this.forceUpdate();
  }


  render() {
    if (this.state.clicked) {

      return (<div>this is going to work!!!</div>)
    } else {
      //      console.log('heeereee nooottt button', loginInfo)
      return (
        <div className="row">
          <div className="col-12">
            {/* <div className="btn btn-info btn-block" onClick={this.handleLabelClick.bind(this)} > */}
            <div className="btn btn-info btn-block more" onClick={this.handleLabelClick.bind(this)} >

              <i className="fa fa-edit"></i> Compose
            </div>

          </div>
        </div>
      )
    }
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  // login () {
  //   console.log("state: ", JSON.stringify(this.state))
  //   // var api = "http://localhost:3000/api/mail/login";
  //   var api = "http://192.168.96.191:3000/api/user/login";
  //   var request = {
  //     method: 'post',
  //     url: api,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data: { "username": this.state.email, "password": this.state.password }
  //   }
  //   axios(request)
  //     .then(response => {
  //       console.log('hhhhhhhhhhhhhhhhhhhhhhhh')
  //       console.log(response.data)
  //       loginInfo.email = this.state.email;
  //       loginInfo.token = response.data.token;
  //       console.log('loginIngo', JSON.stringify(loginInfo))
  //     }).catch(err => {

  //       console.log(JSON.stringify(loginInfo))
  //       console.log("here is what im rejecting:", err)
  //     })
  // }

  handleSubmitClick() {
    console.log("Handling Submit...")
    this.props.onClick();
  }
  render() {
    return (

      <form>
        <h3>Étoile Email Manager</h3>
        <div className="form-group">
          <label>Email address</label>
          {/* <input type="email" className="form-control col-xs-4" placeholder="Enter email"
            onChange={e => this.setState({ email: e.target.value })} /> */}
          <input type="text" className="form-control col-xs-4" placeholder="Enter email"
            onChange={e => loginInfo.email = e.target.value} />
        </div>
        <div className="form-group">
          <label>Password</label>
          {/* <input type="password" className="form-control" placeholder="Enter password"
            onChange={e => this.setState({ password: e.target.value })} /> */}

          <input type="text" className="form-control" placeholder="Enter password"
            onChange={e => loginInfo.password = e.target.value} />
        </div>
        <button type="button" className="btn btn-info btn-block more" onClick={this.handleSubmitClick.bind(this)}>Submit</button>
      </form>

    );
  }
}

export default App;


