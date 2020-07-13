import React, { Component } from 'react';
import axios from 'axios';
import SunEditor from 'suneditor-react/webpack.config';
import 'suneditor/dist/css/suneditor.min.css';
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

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   login() {
//     var api = "http://192.168.112.243:3001/api/mail/login";
//     // var api = "http://192.168.96.191:3000/api/user/login";
//     var request = {
//       method: 'post',
//       url: api,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: { "email": loginInfo.email, "password": loginInfo.password }
//       // data: { "username": loginInfo.email, "password": loginInfo.password }
//     }
//     axios(request)
//       .then(response => {
//         console.log(response.data)
//         loginInfo.token = response.data.token;
//         console.log('loginIngo', JSON.stringify(loginInfo))
//         this.forceUpdate();
//       }).catch(error => {
//         console.log('error', error)
//         alert("Wrong password")
//         window.location.reload(false);
//       })

//   }
//   updateMe() {
//     console.log('updating meeee')
//     this.forceUpdate();
//   }
//   render() {
//     if (loginInfo.token != "") {
//       return (
//         <div>
//           <NavigationBar title="Étoile Email Manager" user={loginInfo.email} />
//           <MainContainer onClick={this.updateMe.bind(this)} />
//         </div>
//       )
//     } else {
//       return (
//         <div>
//           <NavigationBar title="Étoile Email Manager" user={loginInfo.email} />
//           <div className="auth-wrapper">
//             <div className="auth-inner">
//               <Login onClick={this.login.bind(this)} />
//             </div>
//           </div>
//         </div>
//       )
//     }
//   }
// }

// class NavigationBar extends React.Component {
//   render() {
//     return (
//       <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
//         <img className="nav-logo" src="https://image.flaticon.com/icons/svg/262/262544.svg" width="36" height="36" />
//         <dev className="navbar-brand">{this.props.title}</dev>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">

//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item active">
//               <a className="nav-link" >{this.props.user} <span className="sr-only">(current)</span></a>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     )
//   }
// }

// class MailboxLabels extends React.Component {
//   // Fetch number of emails in each one and get it to me. 

//   static defaultProps = {
//     labels: [{
//       id: 1,
//       name: 'Inbox',
//       emailNumber: 4
//     },
//     {
//       id: 2,
//       name: 'Sent',
//       emailNumber: 12
//     }]
//   };


//   render() {
//     return (
//       <ul className="list-group">
//         {/* Iterate to create labels from the props */}
//         {this.props.labels.map((label) => (
//           <MailboxItem
//             key={label.id}
//             id={label.id}
//             label={label}
//             onClick={this.props.onChangeMailbox.bind(this)} />
//         ))}
//       </ul>
//     )
//   }
// }

// class MailboxItem extends React.Component {
//   handleMailboxClick() {
//     console.log('handleClick ' + this.props.id);
//     this.props.onClick(this.props.id);
//     this.forceUpdate();
//   }

//   render() {
//     return (
//       <li className="list-group-item justify-content-between" onClick={this.handleMailboxClick.bind(this)}>
//         {this.props.label.name}
//         <span className="badge badge-default badge-pill">{this.props.label.emailNumber}</span>
//       </li>
//     )
//   }
// }

// class EmailList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       results: [],
//       clicked: false,
//       backClicked: false,
//       deleteClicked: false,
//       selectedEmail: null, 
//       mailboxID: 1
//     }
//   }

//   handleBackClick() {
//     this.state.backClicked = true;
//     this.state.clicked = false;
//     this.forceUpdate();
//   }

//   handleDeleteClick() {

//   }

//   handleEmailClick = (id) => {
//     this.state.mailboxID = id;
//     console.log('this is clicked....', id)
//     console.log('porpse', this.props.emails)
//     for (var email of this.props.emails) {
//       if (email) {
//         if (email.id == id)
//           this.state.selectedEmail = email;
//       }
//     }
//     this.state.clicked = true;
//     this.forceUpdate();
//   };

//   render() {
//     if (this.state.clicked == true && this.state.backClicked == false) {
//       console.log('herreee', this.state.clicked);
//       this.state.clicked = false;


//       console.log('herreee222', this.state.selectedEmail);
//       console.log('emmmaailill', this.state.results)

//       return (
//         <div className="modal-footer">
//           <button type="button" className="btn btn-danger more" onClick={this.handleDeleteClick.bind(this)}>Delete</button>
//           <button type="button" className="btn btn-outline-info more" onClick={this.handleBackClick.bind(this)}>Back</button>
//           <p>{this.props.email.text}</p>
//         </div>
//       )

//     } else {
//       this.state.backClicked = true;
//       if(this.state.mailboxID == 1){
//         return (
//           <div>
//             <div className="list-group">
//               {/* EmailItem creation: */}
//               {this.props.emails.filter(e => e.labelId & e.labelId == this.state.mailboxID).map((email) => (
//                 <EmailItem
//                   key={email.id}
//                   email={email}
//                   handleEmailClick={this.handleEmailClick} />
//               ))}
//             </div>
//           </div>
//         )
//       }else{
//         return (
//           <div>
//             <div className="list-group">
//               {/* EmailItem creation: */}
//               {this.props.emails.map((email) => (
//                 <EmailItem
//                   key={email.id}
//                   email={email}
//                   handleEmailClick={this.handleEmailClick} />
//               ))}
//             </div>
//           </div>
//         )
//       }

//     }
//   }
// }

// class EmailItem extends React.Component {
//   handleEmailClick() {
//     this.props.handleEmailClick(this.props.email.id);
//     this.forceUpdate();
//   }

//   render() {
//     return (
//       <li className="list-group-item d-flex justify-content-start" onClick={this.handleEmailClick.bind(this)}>
//         <div className="checkbox">
//           <input type="checkbox" />
//         </div>

//           &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
//         <span className="name">{this.props.email.from}</span>
//         <span>{this.props.email.subject}</span>

//         <span className="ml-auto p-2">
//           <span className="badge badge-default badge-pill">{this.props.email.time}</span>
//         </span>
//       </li>

//     )
//   }
// }

// class EmptyBox extends React.Component {
//   render() {
//     var html = `<h1 style="font-family:verdana;">This is a heading</h1>
//     <p style="font-family:courier;">This is a paragraph.</p>`
//     // var html = 'hello'
//     console.log('state', this.props)
//     return (
//       <td dangerouslySetInnerHTML={{ __html: html }} />

//     )
//   }
// }

// class LoadingBox extends React.Component {
//   render() {
//     return (<p>Please Be Patient ... </p>)
//   }
// }

// class MainContainer extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedLabel: 1,
//       inboxCount: -1,
//       sentCount: -1,
//       mailCount: 0,
//       fetchedInbox: false,
//       fetchedSent: false
//     }

//   }

//   handleChangeMailbox(labelId) {
//     console.log('Label clicked: ' + labelId);
//     // this.setState({ selectedLabel: labelId });
//     this.state.selectedLabel = labelId;
//   }

//   handleUpdateMe() {
//     this.props.onClick();
//   }

//   componentWillMount() {

//   }

//   static defaultProps = {
//     emails: [
//       // {
//       //   id: 0,
//       //   labelId: 1,
//       //   from: 'Mike James',
//       //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       //   time: "11:15"
//       // },
//       // {
//       //   id: 1,
//       //   labelId: 1,
//       //   from: 'Emma Thompson',
//       //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       //   time: "22:08"
//       // },
//       // {
//       //   id: 2,
//       //   labelId: 1,
//       //   from: 'Olivia Jefferson',
//       //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       //   time: "19:12"
//       // },
//       // {
//       //   id: 3,
//       //   labelId: 1,
//       //   from: 'Mike Conley',
//       //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       //   time: "18:35"
//       // },
//       // {
//       //   id: 4,
//       //   labelId: 2,
//       //   from: 'Emily Iverson',
//       //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       //   time: "14:05"
//       // },
//       // {
//       //   id: 5,
//       //   labelId: 3,
//       //   from: 'Michael Neal',
//       //   subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       //   time: "14:05"
//       // }
//     ]
//   };

//   synceMailbox() {
//     // var emails = [];
//     // this.setState({ fetchedSent: false, fetchedInbox: false })
//     // this.state.fetchedInbox = false;
//     // this.state.fetchedSent = false;
//     console.log('fetching inboxxx')

//     var apiInbox = "http://192.168.112.243:3001/api/mail/showInbox";
//     var apiSent = "http://192.168.112.243:3001/api/mail/getSentItems";

//     var requestInbox = {
//       method: 'get',
//       url: apiInbox,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${loginInfo.token}`
//       }
//     }

//     var requestSent = {
//       method: 'get',
//       url: apiSent,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${loginInfo.token}`
//       }
//     }

//     axios(requestInbox)
//       .then(responseInbox => {
//         // this.setState({ mailCount: response.data.length })
//         var count = 0;
//         console.log('resonse', responseInbox)
//         for (var mail of responseInbox.data) {
//           console.log('adding mail to props', count + 1)
//           mail.labelId = 1;
//           mail.id = count + 1;
//           this.props.emails.push(mail)
//           // emails.push(mail)
//           count++
//           if (count == responseInbox.data.length) {
//             // this.setState({ fetchedInbox: true })
//             this.state.fetchedInbox = true;
//             console.log('set state ture in inbox ->', this.state.fetchedInbox, this.state.fetchedSent)

//             axios(requestSent)
//               .then(responseSent => {
//                 //this.setState({ sentCount: response.data.length })

//                 console.log('resonse', responseSent)
//                 for (var mail of responseSent.data) {
//                   console.log('adding sent to props', count + 1)
//                   mail.labelId = 2;
//                   mail.id = count + 1;
//                   console.log('thois is sent mail adding to props', mail)
//                   this.props.emails.push(mail)
//                   count++
//                   if (count == (responseInbox.data.length + responseSent.data.length)) {
//                     this.state.fetchedSent = true;

//                     // this.setState({ fetchedSent: true })
//                     console.log('set state ture in sent ->', this.state.fetchedInbox, this.state.fetchedSent)
//                     if (this.state.fetchedInbox && this.state.fetchedSent) {
//                       this.setState({ "mailCount": count })
//                       console.log('now render again')
//                       this.forceUpdate();
//                     }

//                   }
//                 }
//               }).catch(error => {
//                 console.log(error)
//               })


//             // if (this.state.fetchedInbox && this.state.fetchedSent) {
//             //   console.log('now render again inbox')
//             //   this.forceUpdate();
//             // }

//           }
//         }
//       }).catch(error => {
//         console.log(error)
//       })

//   }


//   render() {
//     console.log("props: ", this.props);
//     //console.log("this is-> ", this.props.emails[0].labelId);

//     let content = null;
//     if (this.state.fetchedInbox && this.state.fetchedSent) {

//       const filteredEmails = this.props.emails.filter(e => e.labelId & e.labelId == this.state.selectedLabel);

//       if (filteredEmails.length = this.state.mailCount) {
//         //content = <EmailList emails={filteredEmails} />;
//         content = <EmailList emails={this.props.emails} />;

//       } else {
//         content = <EmptyBox />;
//       }
//     }
//     else {
//       this.synceMailbox();
//       content = <LoadingBox />
//     }
//     return (
//       <div className="container">
//         <ComposeMail onClick={this.handleUpdateMe.bind(this)} />
//         <hr />
//         <div className="row">
//           <div className="col-12 col-sm-12 col-md-3 col-lg-2">
//             <MailboxLabels onChangeMailbox={this.handleChangeMailbox.bind(this)} />
//           </div>
//           <div className="col-12 col-sm-12 col-md-9 col-lg-10">
//             {content}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// class ComposeMail extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       clicked: false,
//       recipient: [],
//       subject: "",
//       text: "",
//     }
//   }

//   handleLabelClick() {
//     //   this.state.clicked = true
//     // this.forceUpdate();
//     this.setState({ clicked: true })
//   }

//   handleCloseClick() {
//     console.log('Close Click')
//     this.state.clicked = false
//     this.forceUpdate();
//   }

//   handleSendClick(event) {
//     event.target.setAttribute("disabled", true);
//     console.log('clicked Send')
//     var api = "http://192.168.112.243:3001/api/mail/sendEmail";

//     var request = {
//       method: 'post',
//       url: api,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${loginInfo.token}`
//       },
//       data: { "receivers": this.state.recipient, "subject": this.state.subject, "text": this.state.text }

//     }
//     axios(request)
//       .then(response => {
//         console.log('this is token', response.data.results)
//         this.state.clicked = false
//         alert("Email Sent")
//         this.props.onClick()
//       }).catch(error => {
//         console.log("error", error)
//         alert("Try Again")
//       })
//   }


//   render() {
//     var that = this;
//     if (this.state.clicked) {
//       return (
//         <div className="modal-fade">
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h3 className="modal-title">Compose Email</h3>
//               </div>


//               <div className="modal-body">
//                 <p>One fine body&hellip;</p>
//               </div>

//               <div className="modal-footer">
//                 <button type="button" className="btn btn-outline-danger more" data-dismiss="modal" onClick={this.handleCloseClick.bind(this)}>Disgard</button>
//                 <button type="button" className="btn btn-outline-info more"
//                   onClick={event => { this.handleSendClick(event) }}
//                 >Send</button>

//               </div>
//             </div>
//           </div>
//         </div>

//       )
//     } else {
//       return (
//         <div className="row">
//           <div className="col-12">
//             {/* <div className="btn btn-info btn-block" onClick={this.handleLabelClick.bind(this)} > */}
//             <div className="btn btn-info btn-block more" data-toggle="modal" data-target="#myModal" onClick={this.handleLabelClick.bind(this)} >

//               <i className="fa fa-edit"></i> Compose
//             </div>

//           </div>
//         </div>
//       )
//     }
//   }
// }

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: ""
//     }
//   }

//   handleSubmitClick(event) {
//     event.target.setAttribute("disabled", true);
//     console.log("Handling Submit...")
//     this.props.onClick();
//   }
//   render() {
//     return (

//       <form>
//         <h3>Étoile Email Manager</h3>
//         <div className="form-group">
//           <label>Email address</label>
//           {/* <input type="email" className="form-control col-xs-4" placeholder="Enter email"
//             onChange={e => this.setState({ email: e.target.value })} /> */}
//           <input type="text" className="form-control col-xs-4" placeholder="Enter email"
//             onChange={e => loginInfo.email = e.target.value} />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           {/* <input type="password" className="form-control" placeholder="Enter password"
//             onChange={e => this.setState({ password: e.target.value })} /> */}

//           <input type="text" className="form-control" placeholder="Enter password"
//             onChange={e => loginInfo.password = e.target.value} />
//         </div>
//         <button type="button" className="btn btn-info btn-block more" onClick={event => { this.handleSubmitClick(event) }}>Login</button>
//       </form>

//     );
//   }
// }



class App extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    var api = "http://192.168.112.243:3001/api/mail/login";
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
  componentWillMount() {
    this.syncMailCount();
  }
  syncMailCount() {
    var apiUnseen = 'http://192.168.112.243:3001/api/mail/numberOfUnseen';

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
      <ul className="list-group">
        {this.props.labels.map((label) => (
          <MailboxItem
            key={label.id}
            id={label.id}
            label={label}
            onClick={this.props.onChangeMailbox.bind(this)} />
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
    this.forceUpdate();
  }

  handleDeleteClick(event) {

    event.target.setAttribute("disabled", true);
    console.log('clicked Send')
    console.log(this.state.selectedEmail.id)
    var api = "http://localhost:3001/api/mail/deleteEmail";

    var request = {
      method: 'post',
      url: api,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginInfo.token}`
      },
      data: { "id": this.state.selectedEmail.id }

    }
    axios(request)
      .then(response => {
        console.log('this is response', response.data)
        this.state.clicked = false
        alert("Email Deleted")
        this.props.onClick()
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
        console.log('this is in if for check email')
        if (email.id == id) {
          console.log('this is in if for select email', email)
          this.state.selectedEmail = email
          this.state.clicked = true;
          console.log('this is the whole state', this.state)
          this.forceUpdate();
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
          <div className="list-group">
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
  handleEmailClick() {
    this.props.handleEmailClick(this.props.email.id);
    // this.forceUpdate();
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
    return (<p>Please Be Patient ... </p>)
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
    this.props.onClick();
  }

  synceMailbox() {
    console.log('am I being called??????')
    var array = 0;
    var length = this.props.emails.length;
    console.log('1array', array, 'len', length)
    if (length == 0) {

    } else {

      for (var mail of this.props.emails) {

        console.log('2array', array, 'len', length)
        this.props.emails.pop();
        console.log('3array', array, 'len', length)
        array++
      }
    }

    if (array == length) {

      console.log('sync mailbox')
      var apiInbox = "http://192.168.112.243:3001/api/mail/showInbox";
      var apiSent = "http://192.168.112.243:3001/api/mail/getSentItems";

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


              // if (this.state.fetchedInbox && this.state.fetchedSent) {
              //   console.log('now render again inbox')
              //   this.forceUpdate();
              // }

            }
          }
        }).catch(error => {
          console.log(error)
        })

    } else {
      array++;
    }

  }

  componentWillMount() {
    this.synceMailbox();
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



  render() {
    let content = null;
    if (this.state.fetchedInbox && this.state.fetchedSent) {
      console.log('this is state value of mailbox', this.state.selectedLabel)
      var filteredEmails; //= this.props.emails.filter(e => e.labelId & e.labelId == this.state.selectedLabel);
      if (this.state.selectedLabel == 1) {
        this.synceMailbox()
        filteredEmails = this.props.emails.filter(e => e.labelId & e.labelId == 1);
        console.log('sellect inbox', filteredEmails)
      } else if (this.state.selectedLabel == 3) {
        this.synceMailbox()
        filteredEmails = this.props.emails.filter(e => e.labelId & e.labelId == 3);
        console.log('seleeecctt sent', filteredEmails)
      }

      if (filteredEmails.length = this.state.mailCount) {
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
    //   this.state.clicked = true
    // this.forceUpdate();
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
    var api = "http://192.168.112.243:3001/api/mail/sendEmail";

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
        // console.log('this is token', response.data.results)
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
    this.state.text = "<p>" + text + "</p>"
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
                    {/* <SunEditor /> */}
                  </p>
                </p>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-danger more" data-dismiss="modal" onClick={this.handleCloseClick.bind(this)}>Disgard</button>
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