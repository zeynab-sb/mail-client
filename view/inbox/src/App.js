import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
import 'suneditor/dist/css/suneditor.min.css'
// import 'suneditor/assets/css/suneditor.css'
// import 'suneditor/assets/css/suneditor-contents.css'
import suneditor from 'suneditor'
// import {Editor, EditorState} from 'draft-js';
// import SunEditor from 'suneditor-react';

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
    var api = "http://192.168.112.243:3001/api/mail/login";
    // var api = "http://192.168.96.191:3000/api/user/login";
    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { "email": loginInfo.email, "password": loginInfo.password }
      // data: { "username": loginInfo.email, "password": loginInfo.password }
    }
    axios(request)
      .then(response => {
        console.log(response.data)
        loginInfo.token = response.data.token;
        console.log('loginIngo', JSON.stringify(loginInfo))
        this.forceUpdate();
      }).catch(error => {
        console.log('error', error)
        alert("Wrong password")
        window.location.reload(false);
      })

  }
  updateMe() {
    console.log('updating meeee')
    this.forceUpdate();
  }
  render() {
    if (loginInfo.token != "") {
      return (
        <div>
          <NavigationBar title="Étoile Email Manager" user={loginInfo.email} />
          <MainContainer onClick={this.updateMe.bind(this)} />
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
      name: 'Sent',
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
          <span className="badge badge-default badge-pill">{this.props.email.time}</span>
        </span>
      </li>

    )
  }
}

class EmptyBox extends React.Component {
  render() {
    var html = `<h1 style="font-family:verdana;">This is a heading</h1>
    <p style="font-family:courier;">This is a paragraph.</p>`
    // var html = 'hello'
    console.log('state', this.props)
    return (
      <td dangerouslySetInnerHTML={{ __html: html }} />

    )
  }
}

class LoadingBox extends React.Component {
  render() {
    return (<p>Loading ... </p>)
  }
}

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLabel: 1,
      inboxCount: -1,
      sentCount: -1,
      fethInbox: false
    }
  }

  handleLabelClick(labelId) {
    console.log('Label clicked: ' + labelId);
    this.setState({
      selectedLabel: labelId
    });
  }

  handleUpdateMe() {
    this.props.onClick();
  }

  static defaultProps = {
    emails: [
      // {
      //   id: 0,
      //   labelId: 1,
      //   from: 'Mike James',
      //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   time: "11:15"
      // },
      // {
      //   id: 1,
      //   labelId: 1,
      //   from: 'Emma Thompson',
      //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   time: "22:08"
      // },
      // {
      //   id: 2,
      //   labelId: 1,
      //   from: 'Olivia Jefferson',
      //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   time: "19:12"
      // },
      // {
      //   id: 3,
      //   labelId: 1,
      //   from: 'Mike Conley',
      //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   time: "18:35"
      // },
      // {
      //   id: 4,
      //   labelId: 2,
      //   from: 'Emily Iverson',
      //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   time: "14:05"
      // },
      // {
      //   id: 5,
      //   labelId: 3,
      //   from: 'Michael Neal',
      //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   time: "14:05"
      // }
    ]

  };

  synceMailbox() {

    console.log('fetching inboxxx')
    var api = "http://192.168.112.243:3001/api/mail/showInbox";
    var request = {
      method: 'get',
      url: api,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginInfo.token}`
      }
    }
    if (this.state.mailCount != this.props.emails.length) {
      axios(request)
        .then(response => {
          this.setState({ mailCount: response.data.length })
          var count = 0;
          console.log('resonse', response)
          if (this.state.mailCount != this.props.emails.length) {

            for (var mail of response.data) {
              mail.labelId = 1;
              this.props.emails.push(mail)
              count++
              if (count == response.data.length) {
                console.log('fetched alll')
                this.setState({ fethInbox: true })
                this.forceUpdate();
              }
            }
          }

        }).catch(error => {
          console.log(error)
        })
    }
  }


  render() {
    this.synceMailbox();
    console.log("props: ", this.props);
    //console.log("this is-> ", this.props.emails[0].labelId);

    let content = null;
    if (this.state.fethInbox) {
      const filteredEmails = this.props.emails.filter(e => e.labelId & e.labelId == this.state.selectedLabel);

      if (filteredEmails.length > 0) {
        content = <EmailList emails={filteredEmails} />;
      } else {
        content = <EmptyBox />;
      }
    }
    else {

      content = <LoadingBox />

    }
    return (
      <div className="container">
        <ComposeMail onClick={this.handleUpdateMe.bind(this)} />
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
      clicked: false,
      recipient: "shaghayeghtavakoli2@gmail.com",
      subject: "Send From UI",
      text: "<p>This is a test</p>",

    }
  }

  handleLabelClick() {
    this.state.clicked = true
    this.forceUpdate();
  }

  handleCloseClick() {
    console.log('Close Click')
    this.state.clicked = false
    this.forceUpdate();
  }

  handleSendClick(event) {
    event.target.setAttribute("disabled", true);
    console.log('clicked Send')
    var api = "http://192.168.112.243:3001/api/mail/sendEmail";

    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginInfo.token}`
      },
      data: { "receivers": [this.state.recipient], "subject": this.state.subject, "text": this.state.text }

    }
    axios(request)
      .then(response => {
        console.log('this is token', response.data.results)
        this.state.clicked = false
        alert("Email Sent")
        this.props.onClick()
      }).catch(error => {
        console.log("error", error)
        alert("Try Again")
      })
  }

  handleRecipients(recipients) {
    this.state.recipient = []
    this.state.recipient = recipients.split(',')
    console.log(this.state.recipient)
  }

  handleText(text){
    this.state.text = "<p>"+text+"</p>"
  }


  render() {
    var that = this;
    if (this.state.clicked) {
      // return (
      //   <div>
      //     <form>
      //     <p>
      //       <h>To</h>
      //       <input type="text" name="to" style={{ width: "390px", fontSize: 15 }} onChange={e => { this.handleTos(e.target.value) }} />
      //     </p>
      //     </form>
          
      //   </div>
      // )

      //   console.log('clickeeeeeeeeeeeeeeeeed')
        return (
        //   <div>
        //   <suneditor/>
        // </div>
           <div className="modal-fade">
            <div className="modal-dialog modal-lg"> 
              <div className="modal-content">
                 <div className="modal-header">
                  <h3 className="modal-title">Compose Email</h3>
                </div> 
                 <div className="modal-body">
                   <p>
                  <p>
                    <p>To</p>
                    <input type="text" name="to" style={{ width: "390px", fontSize: 15 }} onChange={e => { this.handleRecipients(e.target.value) }} />
                  </p>
                  <p>
                    <p>Subject</p>
                    <input type="text" name="subject" style={{ width: "390px", fontSize: 15 }} onChange={e => { this.state.subject = e.target.value }} />
                  </p>
                  <p>
                    <p>Text</p>
                    <input type="text" name="text" style={{ width: "390px", height: "90px" , fontSize: 15 }} onChange={e => { this.handleText(e.target.value) }} />
                    {/* <SunEditor /> */}
                  </p>
                  </p>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-danger more" data-dismiss="modal" onClick={this.handleCloseClick.bind(this)}>Discard</button>
                  <button type="button" className="btn btn-outline-info more"
                    onClick={event => { this.handleSendClick(event) }}
                  >Send</button>
                </div> 
               </div> 
            </div>
          </div>

       )
    } else {
      return (
        <div className="row">
          <div className="col-12">
            {/* <div className="btn btn-info btn-block" onClick={this.handleLabelClick.bind(this)} > */}
            <div className="btn btn-info btn-block more" data-toggle="modal" data-target="#myModal" onClick={this.handleLabelClick.bind(this)} >

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

  handleSubmitClick(event) {
    event.target.setAttribute("disabled", true);
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
        <button type="button" className="btn btn-info btn-block more" onClick={event => { this.handleSubmitClick(event) }}>Login</button>
      </form>

    );
  }
}

export default App;


