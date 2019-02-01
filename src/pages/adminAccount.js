import * as React from "react";
// import { getValue } from '../constants/db'
// import Checkbox from '../components/Checkbox';
// import Helmet from 'helmet';
// import Layout from '../components/layout'
// import { Redirect } from 'react-router';
// import ApplicationBox from '../components/ApplicationBox';
import { withFirebase } from '../components/FirebaseContext';

class AdminAccount extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selected: 'newApplications',
    //         newApplications: [],
    //         approvedApplications: [],
    //         rejectedApplications: []
    //     }
    // }
    // componentDidMount() {
    //     let db = this.getDb();
    //     const applications = getValue('applications', db);
    //     let newApplicationArray = [];
    //     let approvedApplicationArray = [];
    //     let rejectedApplicationArray = [];
    //     for(application in applications) {
    //         let approved = application + "Approved";
    //         if(application.approved === true) {
    //             approvedApplicationArray.push(application);
    //         } else if(application.approved === false) {
    //             rejectedApplicationArray.push(application);
    //         } else {
    //             newApplicationArray.push(application);
    //         }
    //     }
    //     this.setState({newApplications: newApplicationArray, approvedApplications: approvedApplicationArray, rejectedApplications: rejectedApplicationArray}, ()=>console.log('admitAccount State',this.state))
    // }
    // getDb = () => this.props.firebase.database();
    // handleChange = e => {
    //     let { name, value } = e.target;
    //     this.setState({ [name]: value });
    // }
    // handleArrayChoice = (target) => {
    //     if(target === 'new'){
    //         this.setState({ selected: 'newApplications' })
    //     }
    //     if (target === 'approved') {
    //         this.setState({ selected: 'approvedApplications' })
    //     }
    //     if (target === 'rejected') {
    //         this.setState({ selected: 'rejectedApplications' })
    //     }
    // }
    // handleApprove = (array, target, i, approve) => {
    //     let applicationObject = this.state[array][target];
    //     applicationObject['approve'] = approve;
    //     let application = getValue('value', db);
    //     let year = application.key.slice(0,4)
    //     let oldArray = this.state[array];
    //     oldArray.splice(i,1);
    //     let newArray;
    //     if(approve) {
    //         newArray = this.state.approvedApplications;
    //     } else {
    //         newArray = this.state.rejectedApplications;
    //     }            
    //     newArray.push(applicationObject);
    //     let weekArray = []
    //     for(key in application) {
    //         if(key.indexOf("Week") !== -1) {
    //             weekArray.push(application[key]);
    //         }
    //     }
    //     weekArray.forEach((week, i)=> {
    //         let db = this.getDb();
    //         if(week) {
    //             let weekRef = getValue(`campTimes/year/${year}/${week}}`, db);
    //             let week = weekRef.once('value');
    //             let attending = weekRef.child('attending').once('value');
    //             let pending = weekRef.child('pending').once('value');
    //             console.log('attending', 'pending', attending, pending);
    //             if(approve  && array === "newApplications") {
    //                 weekRef.child('attending').set(attending +1);
    //                 weekRef.child('pending').set(pending - 1);
    //                 weekRef.child('approve').set(true);
    //             } else if (!approve && array === "newApplications") {
    //                 weekRef.child('pending').set(pending + 1);
    //                 weekRef.child('approve').set(false);
    //             } else if(approve && array === "rejectedApplications") {
    //                 weekRef.child('attending').set(attending + 1);
    //                 weekRef.child('approve').set(true);
    //             } else if(!approve && array === approvedApplications) {
    //                 weekRef.child('attending').set(attending -1);
    //                 weekRef.child('approve').set(false);
    //             }
    //         }

    //     })
    //     if(approved && array === "newApplications") {
    //         this.setState({ approvedApplications: newArray, newApplications: oldArray })
    //     } else if (!approved && array === "newApplications") {
    //         this.setState({ rejectedApplications: newArray, newApplications: oldArray })
    //     } else if(!approved) {
    //         this.setState({rejectedApplications: newArray, approvedApplications: oldArray})
    //     } else {
    //         this.setState({rejectedApplications: oldArray, approvedApplications: newArray})
    //     }

    // }
    render() {
        return(
        <div>To Do</div>
        )
    }
};



export default withFirebase(AdminAccount);

// (this.props.location.state && this.props.location.state.authenticated)?
//     <Layout>
//         <div id="main">
//             <div className="inner">
//                 <h2>Applications</h2>
//                 <Checkbox
//                     style={{ display: "inline-block" }}
//                     name="new"
//                     checked={this.state.selected === "newApplicationsArrays"}
//                     value={true}
//                     onClick={()=>this.handleArrayChoice('new')}
//                     onChange={()=>this.handleArrayChoice('new')}
//                 />
//                 <Checkbox
//                     style={{ display: "inline-block" }}
//                     name="approved"
//                     checked={this.state.selected === "approvedApplictionArrays"}
//                     value={true}
//                     onClick={() => this.handleArrayChoice('approved')}
//                     onChange={() => this.handleArrayChoice('approved')}
//                 />
//                 <Checkbox
//                     style={{ display: "inline-block" }}
//                     name="rejected"
//                     checked={this.state.selected === "rejectedApplicationArrays"}
//                     value={true}
//                     onClick={() => this.handleArrayChoice('rejected')}
//                     onChange={() => this.handleArrayChoice('rejected')}
//                 />
//             </div>
//             <div>
//                 {(this.state.selected === 'new' && this.state.newApplications.length > 1)?
//                 <div>
//                     this.state.newApplications.map((application, index) => {
//                         <ApplicationBox
//                             pending={true}
//                             i = {index}
//                             value={this.state.newApplications[application]['approved']}
//                             style={{display: "inline-block"}}
//                             onClick1={() => this.handleApprove('newApplications', application, i, true)}
//                             onChange1={() => this.handleApprove('newAppliactions', application, i, true)}
//                             firstName = {application.childFirstName}
//                             lastName = {application.childLastName}
//                             onClick2={()=> this.handleApprove('newApplications', application, i, false)}
//                             onClick2={() => this.handleApprove('newApplications', application, i, false)}
//                         />
//                     })
//                 </div>
//                 :(this.state.selected === 'approved' && this.state.approvedApplications.length > 1)?
//                 <div>
//                     this.state.approvedApplications.map((application, index) => {
//                         <ApplicationBox
//                             i = {index}
//                             approved={true}
//                             value={this.state.newApplications[application]['approved']}
//                             style={{ display: "inline-block" }}
//                             onClick1={() => this.handleApprove('approvedApplications', application, i, false)}
//                             onChange1={() => this.handleApprove('approvedApplications', application, i, false)}
//                             firstName={application.childFirstName}
//                             lastName={application.childLastName}
//                         />
//                     })
//                 </div>
//                 :this.state.rejectedApplications.length > 1?
//                 <div>
//                     this.state.rejectedApplications.map((application, index) => {
//                         <ApplicationBox
//                             approved={false}
//                             i = {index}
//                             value={this.state.newApplications[application]['approved']}
//                             style={{ display: "inline-block" }}
//                             onClick1={() => this.handleApprove('approvedApplications', application, i, true)}
//                             onChange1={() => this.handleApprove('approvedApplications', application, i, true)}
//                             firstName={application.childFirstName}
//                             lastName={application.childLastName}
//                         />
//                     })
//                 </div>
//                 :null}
//             </div>
//         </div>  
//                 </Layout>:*/}
//         <Redirect to="/"/>