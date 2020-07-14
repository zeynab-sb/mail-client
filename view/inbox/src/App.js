import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SunEditor, { buttonList } from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';


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
    var api = "http://localhost:3001/api/mail/login";
    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { "email": loginInfo.email, "password": loginInfo.password }
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

  updateApp() {
    console.log('updating app')
    this.forceUpdate();
  }

  render() {
    if (loginInfo.token != "") {
      return (
        <div>
          <NavigationBar title="Étoile Email Manager" user={loginInfo.email} />
          <MainContainer onClick={this.updateApp.bind(this)} />
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
  constructor(props) {
    super(props);
    this.state = {
      inboxCount: 0,
      sentCount: 0
    }
  }
  componentWillUpdate() {
    this.syncMailCount();
  }
  componentWillMount() {
    this.syncMailCount();
  }

  syncMailCount() {
    var apiUnseen = 'http://localhost:3001/api/mail/numberOfUnseen';
    var requestUnseen = {
      method: 'get',
      url: apiUnseen,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginInfo.token}`
      }
    }

    axios(requestUnseen)
      .then(responseUnseen => {
        this.setState({ inboxCount: responseUnseen.data.number_of_unseen })
        for (var label of this.props.labels) {
          if (label.id == 1) {
            var index = this.props.labels.indexOf(label);
            var newLable = {
              id: 1,
              name: 'Inbox',
              emailNumber: responseUnseen.data.number_of_unseen
            }
            if (index !== -1) {
              this.props.labels[index] = newLable;
            }
          }
        }
      }).catch(error => {

      })
  }

  static defaultProps = {
    labels: [{
      id: 1,
      name: 'Inbox',
      emailNumber: 0
    },
    {
      id: 3,
      name: 'Sent',
    }]
  };


  render() {
    return (
      <ul className="list-group more">
        {this.props.labels.map((label) => (
          <MailboxItem
            key={label.id}
            id={label.id}
            label={label}
            onClick={this.props.onChangeMailbox.bind(this)}
          // onUpdate={this.props.onClick.bind(this)}
          />
        ))}
      </ul>
    )
  }
}

class MailboxItem extends React.Component {
  handleMailboxClick() {
    console.log('handleClick ' + this.props.id);
    this.props.onClick(this.props.id);
    // this.props.onUpdate()
  }

  render() {
    if (this.props.label.emailNumber) {
      return (

        <li className="list-group-item justify-content-between" onClick={this.handleMailboxClick.bind(this)}>
          {this.props.label.name}
          <span className="badge badge-info badge-pill">{this.props.label.emailNumber}</span>
        </li>
      )
    }
    else {
      return (

        <li className="list-group-item justify-content-between" onClick={this.handleMailboxClick.bind(this)}>
          {this.props.label.name}

        </li>
      )
    }

  }
}

class EmailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      clicked: false,
      backClicked: false,
      deleteClicked: false,
      selectedEmail: null,
      mailboxID: 1
    }
  }

  handleBackClick() {
    console.log('set back to true')
    this.state.backClicked = true;
    this.state.clicked = false;
    this.props.onSync();
    this.forceUpdate();
  }

  handleDeleteClick(event) {

    event.target.setAttribute("disabled", true);
    console.log('clicked Send')
    console.log(this.state.selectedEmail.mailID)
    var api = "http://localhost:3001/api/mail/deleteEmail";

    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginInfo.token}`
      },
      data: { "id": this.state.selectedEmail.mailID }

    }
    axios(request)
      .then(response => {
        console.log('this is response', response.data)
        this.state.deleteClicked = false;
        this.state.clicked = false
        // this.props.onClick();
        this.props.onSync();
        this.forceUpdate();
        alert("Email Deleted")
      }).catch(error => {
        console.log("error", error)
        alert("Try Again")
      })


  }

  handleEmailClick(id) {
    this.state.backClicked = false;
    console.log('this is clicked....', id)
    console.log('porpse', this.props.emails)
    for (var email of this.props.emails) {
      console.log('this is in the for')
      if (email) {
        if (email.id == id) {
          console.log('this is in if for select email', email)
          var api = "http://localhost:3001/api/mail/markUnseenAsSeen";
          var request = {
            method: 'post',
            url: api,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${loginInfo.token}`
            },
            data: { "id": email.mailID }

          }
          this.state.selectedEmail = email
          this.state.clicked = true;
          axios(request)
            .then(response => {
              console.log('this is response', response.data)
              console.log('this is email', email)

              console.log('this is the whole state', this.state)
              // this.props.onClick();
              this.forceUpdate();
            }).catch(error => {
              console.log("error", error)
              alert("Try Again")
            })
        }
      }
    }
    // this.state.clicked = true;
    // this.forceUpdate();
  };

  render() {
    if (this.state.clicked == true && this.state.backClicked == false) {
      console.log('herreee', this.state.clicked);
      this.state.clicked = false;
      console.log('herreee222', this.state.selectedEmail);
      console.log('emmmaailill', this.state.results)

      return (
        <div>
          <p>
            <h style={{ color: 'btn-inf9', fontWeight: 'bold' }}> To: </h>
            <h>{this.state.selectedEmail.to}</h>
          </p>
          <p>
            <h style={{ color: 'btn-inf9', fontWeight: 'bold' }}>Subject: </h>
            <h>{this.state.selectedEmail.subject}</h>
          </p>
          <p>
            <h style={{ color: 'btn-inf9', fontWeight: 'bold' }}>Text: </h>
            <d dangerouslySetInnerHTML={{ __html: this.state.selectedEmail.text }} />
          </p>
          <h>
            <p>
              <h style={{ color: 'btn-inf9', fontWeight: 'bold' }}>Date: </h>
              <h>{this.state.selectedEmail.date}</h>
            </p>
            <button type="button" className="btn btn-danger more" onClick={this.handleDeleteClick.bind(this)}>Delete</button>
          </h>
          <h>
            <button type="button" className="btn btn-outline-info more" onClick={this.handleBackClick.bind(this)}>Back</button>
          </h>

        </div>
      )

    } else {

      return (

        <div>
          <div className="list-group more">
            {/* EmailItem creation: */}
            {this.props.emails.map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                handleEmailClick={this.handleEmailClick.bind(this)} />
            ))}
          </div>
        </div>
      )
      // } else {
      //   return (
      //     <div>
      //       <div className="list-group">
      //         {/* EmailItem creation: */}
      //         {this.props.emails.filter(e => e.labelId & e.labelId == this.state.selectedLabel).map((email) => (
      //           <EmailItem
      //             key={email.id}
      //             email={email}
      //             handleEmailClick={this.handleEmailClick} />
      //         ))}
      //       </div>
      //     </div>
      //   )
      // }

    }
  }
}

class EmailItem extends React.Component {
  handleEmailClick(event) {
    event.target.setAttribute("disabled", true);

    this.props.handleEmailClick(this.props.email.id);
    // this.forceUpdate();
  }

  render() {
    var label_one = (this.props.email.labelId == 1) ? "From: " : "To: ";
    var label_two = (this.props.email.labelId == 1) ? this.props.email.from.split('<')[0] : this.props.email.to[0];

    if (this.props.email.seen) {
      return (
        <li className="list-group-item d-flex" onClick={(event) => { this.handleEmailClick(event) }}>

          <div className="col-4">{label_one}{label_two}</div>
          <div classNamess="col-8">Subject: {this.props.email.subject}</div>

          <span className="ml-auto p-2">
            <span className="badge badge-default badge-pill">{this.props.email.date}</span>
          </span>


        </li>

      )
    } else {
      return (
        <li className="list-group-item d-flex  list-group-item-info" onClick={this.handleEmailClick.bind(this)}>

          <div className="col-4">{label_one}{label_two}</div>
          <div classNamess="col-8">Subject: {this.props.email.subject}</div>

          <span className="ml-auto p-2">
            <span className="badge badge-default badge-pill">{this.props.email.date}</span>
          </span>
        </li >

      )
    }

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
    return (<center>  <i className="fa fa-refresh" ></i><h5>Please Be Patient</h5>  <i className="fa fa-refresh" ></i></center>)
  }
}

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLabel: 1,
      inboxCount: -1,
      sentCount: -1,
      mailCount: 0,
      fetchedInbox: false,
      fetchedSent: false
    }

  }

  handleChangeMailbox(labelId) {
    console.log('Label clicked: ' + labelId);
    this.setState({ selectedLabel: labelId });
    // this.state.selectedLabel = labelId;

  }

  handleUpdateMe() {
    // this.emptyEmailArray();
    this.props.onClick();
  }

  emptyEmailArray() {
    this.state.fetchedInbox = false;
    this.setState({ fetchedSent: false });

    var length = this.props.emails.length
    console.log('length', length, this.props.emails)
    var count = 0
    if (length != 0) {
      console.log('legn -- >>', length)
      this.props.emails.splice(0, length);
      console.log('syncing again')
      this.props.onClick();
      this.syncMailbox();

    }
  }

  syncMailbox() {
    console.log('sync mailbox')

    var apiInbox = "http://localhost:3001/api/mail/showInbox";
    var apiSent = "http://localhost:3001/api/mail/getSentItems";

    var requestInbox = {
      method: 'get',
      url: apiInbox,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginInfo.token}`
      }
    }

    var requestSent = {
      method: 'get',
      url: apiSent,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginInfo.token}`
      }
    }

    axios(requestInbox)
      .then(responseInbox => {
        var count = 0;
        console.log('resonse', responseInbox)
        for (var mail of responseInbox.data) {
          console.log('adding mail to props', count + 1)
          mail.labelId = 1;
          mail.mailID = mail.id
          mail.id = count + 1;

          this.props.emails.push(mail)
          count++
          if (count == responseInbox.data.length) {

            this.state.fetchedInbox = true;
            console.log('set state ture in inbox ->', this.state.fetchedInbox, this.state.fetchedSent)
            axios(requestSent)
              .then(responseSent => {
                console.log('resonse', responseSent)
                for (var mail of responseSent.data) {
                  console.log('adding sent to props', count + 1)
                  mail.labelId = 3;
                  mail.seen = true;
                  mail.mailID = mail.id
                  mail.id = count + 1;

                  console.log('thois is sent mail adding to props', mail)
                  this.props.emails.push(mail)
                  count++
                  if (count == (responseInbox.data.length + responseSent.data.length)) {
                    this.state.fetchedSent = true;
                    console.log('set state ture in sent ->', this.state.fetchedInbox, this.state.fetchedSent)
                    if (this.state.fetchedInbox && this.state.fetchedSent) {
                      console.log('now render again')
                      this.setState({ "mailCount": count })
                      this.forceUpdate();
                    }
                  }
                }
              }).catch(error => {
                console.log(error)
              })
          }
        }
      }).catch(error => {
        console.log(error)
      })

  }

  componentWillMount() {
    this.syncMailbox();
  }

  static defaultProps = {
    emails: []
  };



  render() {
    let content = null;
    if (this.state.fetchedInbox && this.state.fetchedSent) {
      var emails = this.props.emails;
      console.log('this is state value of mailbox', this.state.selectedLabel)
      var filteredEmails;
      if (this.state.selectedLabel == 1) {
        filteredEmails = emails.filter(e => e.labelId & e.labelId == 1);
        console.log('sellect inbox', filteredEmails)
      } else if (this.state.selectedLabel == 3) {
        filteredEmails = emails.filter(e => e.labelId & e.labelId == 3);
        console.log('seleeecctt sent', filteredEmails)
      }

      if (filteredEmails.length = this.state.mailCount) {
        content = <EmailList emails={filteredEmails} onClick={this.emptyEmailArray.bind(this)} onSync={this.emptyEmailArray.bind(this)} />;
      } else {
        content = <EmptyBox />;
      }
    }
    else {
      content = <LoadingBox />
    }
    return (
      <div className="container">

        <SyncMail onSync={this.emptyEmailArray.bind(this)} />
        <ComposeMail onClick={this.handleUpdateMe.bind(this)} onSync={this.emptyEmailArray.bind(this)} />
        <hr />
        <div className="row">
          <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <MailboxLabels onChangeMailbox={this.handleChangeMailbox.bind(this)} />

          </div>
          <div className="col-12 col-sm-12 col-md-9 col-lg-10">
            {content}
          </div>
        </div>
      </div>
    )
  }
}

class SyncMail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    }
  }

  handleSyncClick() {
    this.props.onSync()
  }

  render() {
    return (
      <div className="btn-primary btn pull-left col-1 more" data-toggle="modal" data-target="#myModal" onClick={this.handleSyncClick.bind(this)} >
        <i className="fa fa-refresh" ></i>
      </div>

    )

  }

}

class ComposeMail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      recipient: [],
      subject: "",
      text: "",
    }
  }

  handleLabelClick() {
    this.setState({ clicked: true })
  }

  handleCloseClick() {
    console.log('Close Click')
    this.state.clicked = false
    this.forceUpdate();
  }

  handleSendClick(event) {
    event.target.setAttribute("disabled", true);
    console.log('clicked Send')
    var api = "http://localhost:3001/api/mail/sendEmail";

    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginInfo.token}`
      },
      data: { "receivers": this.state.recipient, "subject": this.state.subject, "text": this.state.text }

    }
    axios(request)
      .then(response => {
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

  handleText(text) {
    this.state.text = "<p>" + text + "</p> <hr></p>Sent from Etoile Email Manager<p>"
  }


  render() {
    var that = this;
    if (this.state.clicked) {
      return (
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
                    <input type="text" name="text" style={{ width: "390px", height: "90px", fontSize: 15 }} onChange={e => { this.handleText(e.target.value) }} />

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
            <div className="btn btn-info btn-block more pull-right col-13" data-toggle="modal" data-target="#myModal" onClick={this.handleLabelClick.bind(this)} >

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
          <input type="email" className="form-control col-xs-4" placeholder="Enter email"
            onChange={e => loginInfo.email = e.target.value} />
        </div>
        <div className="form-group">
          <label>Password</label>

          <input type="password" className="form-control" placeholder="Enter password"
            onChange={e => loginInfo.password = e.target.value} />
        </div>
        <button type="button" className="btn btn-info btn-block more" onClick={event => { this.handleSubmitClick(event) }}>Login</button>
      </form>

    );
  }
}





export default App;