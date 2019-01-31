import * as React from "react";
import { db } from '../firebase';
import Checkbox from '../components/Checkbox';
import ApplicationBox from '../components/ApplicationBox';
class AdminApplicationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            selected: 'pending',
            pendingApplications: [],
            approvedApplications: [],
            rejectedApplications: []
        }
    }
    componentDidMount () {
        let newState = this.props.location.state;
        for(let key in newState) {
            this.setState({[key]: [newState[key]]})
        }
        this.getValue('applications');
        console.log(this.state);
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = e => {
        e.preventDefault();
    }
    getApplications = () => {
        let applications;
        db.getValue('applications').then(snapshot => {
            applications = snapshot.val();
            let pendingApplicationArray = [];
            let approvedApplicationArray = [];
            let rejectedApplicationArray = [];
            for (let application in applications) {
                console.log(application);
                if (application.approved === true) {
                   approvedApplicationArray.push(applications[application]);
                } else if (application.approved === false) {
                    rejectedApplicationArray.push(applications[application]);
                } else {
                    pendingApplicationArray.push(applications[application]);
                }
            }
            console.log(applications, 'applications')
            this.setState({ pendingApplications: pendingApplicationArray, approvedApplications: approvedApplicationArray, rejectedApplications: rejectedApplicationArray }, () => console.log('adminAccount State', this.state))
        });
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleArrayChoice = (target) => {
        if (target === 'pending') {
            this.setState({ selected: 'pendingApplications' })
        }
        if (target === 'approved') {
            this.setState({ selected: 'approvedApplications' })
        }
        if (target === 'rejected') {
            this.setState({ selected: 'rejectedApplications' })
        }
    }
    handleApprove = (array, target, i, approve) => {
        let ref = 'applications/' + target;
        console.log(ref);
        let applicationObject = this.state[array][i];
        applicationObject['approve'] = approve;
        let application = db.getValue(ref).then(application => {
            console.log('application', application)
            let year = application.key.slice(0, 4);
            let oldArray = this.state[array];
            oldArray.splice(i, 1);
            let newArray;
            if (approve) {
                newArray = this.state.approvedApplications;
            } else {
                newArray = this.state.rejectedApplications;
            }
            newArray.push(applicationObject);
            let weekArray = []
            for (let key in application) {
                if (key.indexOf("Week") !== -1) {
                    weekArray.push({[key]: application[key]});
                }
            }
            weekArray.forEach((week, i) => {
                console.log('week', week)
                let value = Object.values(week)[0];
                let key = Object.keys(week)[0]
                if (value) {
                    let refAddress = `campTimes/year/${year}/${key}`;
                    console.log(refAddress);
                    let weekRef = db.getValue(refAddress).then(week=> {
                        let available = week.available;
                        let pending = week.pending;
                        console.log('available', 'pending', available, pending);
                        if (approve && array === "pendingApplications") {
                            db.changeTargetChild(refAddress, 'available', available - 1).then(()=> {
                                db.changeTargetChild(refAddress, 'pending', available - 1).then(()=>{
                                    db.changeTargetChild(ref, 'approve', true).then(() => {
                                        this.setState({ approvedApplications: newArray, pendingApplications: oldArray })
                                    });
                                })
                            })
                        } else if (!approve && array === "pendingApplications") {
                            db.changeTargetChild(refAddress, 'pending', pending - 1).then(() => {
                                db.changeTargetChild(ref, 'approve', true).then(() => {
                                    this.setState({ rejectedApplications: newArray, pendingApplications: oldArray }, () => console.log('handle approve state', this.state))
                                });
                            })
                        } else if (approve && array === "rejectedApplications") {
                            db.changeTargetChild(refAddress, 'available', available - 1).then(() => {
                                db.changeTargetChild(ref, 'approve', true).then(() => {
                                    this.setState({ rejectedApplications: oldArray, pendingApplications: newArray }, ()=>console.log('handle approve state', this.state))
                                });
                            })
                        } else if (!approve && array === approvedApplications) {
                            db.changeTargetChild(refAddress, 'available', available + 1).then(() => {
                                db.changeTargetChild(refAddress, 'approve', false).then(() => {
                                    this.setState({ rejectedApplications: newArray, pendingApplications: oldArray }, () => console.log('handle approve state', this.state))
                                });
                            })
                        }
                        console.log('app week array', weekArray);
                        
                    })
                }
            })
        })
    }
    render() {
        return (
            <div>
                <div id="main">
                    <h2>Applications</h2>
                    <div>
                        <Checkbox
                            style={{ display: "inline-block" }}
                            name="pending"
                            checked={this.state.selected === "pendingApplications"}
                            value={true}
                            onClick={() => this.handleArrayChoice('pending')}
                            onChange={() => this.handleArrayChoice('pending')}
                            text="Pending Applications"
                        />
                        <Checkbox
                            style={{ display: "inline-block" }}
                            name="approved"
                            checked={this.state.selected === "approvedApplications"}
                            value={true}
                            onClick={() => this.handleArrayChoice('approved')}
                            onChange={() => this.handleArrayChoice('approved')}
                            text="Approved Applications"
                        />
                        <Checkbox
                            style={{ display: "inline-block" }}
                            name="rejected"
                            checked={this.state.selected === "rejectedApplications"}
                            value={true}
                            onClick={() => this.handleArrayChoice('rejected')}
                            onChange={() => this.handleArrayChoice('rejected')}
                            text="Rejected Applications"
                        />
                        <ul className="noBullets">
                        {
                            (this.state.selected === 'pending' && this.state.pendingApplications.length > 0)?
                                this.state.pendingApplications.map((application, i) =>  
                                    <ApplicationBox
                                        key={i}
                                        pending={true}
                                        i={i}
                                        value={'pending'}
                                        style={{ display: "inline-block" }}
                                        onClick1={() =>  this.handleApprove('pendingApplications', application.key, i, true)}
                                        onChange1={() => this.handleApprove('pendingApplications', application, i, true)}
                                        firstName={application.childFirstName}
                                        lastName={application.childLastName}
                                        checked={this.state.approvedApplications.indexOf(application) > 0}
                                        checked2={this.state.rejectedApplications.indexOf(application) > 0}
                                        onClick2={() => this.handleApprove('pendingApplications', application.key, i, false)}
                                        onChange2={() => this.handleApprove('pendingApplications', application.key, i, false)}
                                    />
                                )
                        : (this.state.selected === 'approved' && this.state.approvedApplications.length > 0 && Array.isArray(this.state.approvedApplications)) ?
                                this.state.approvedApplications.map((application, i) => 
                                        <ApplicationBox
                                            key={i}
                                            i={i}
                                            approved={true}
                                            value={true}
                                            style={{ display: "inline-block" }}
                                            onClick1={() => this.handleApprove('approvedApplications', application, i, false)}
                                            onChange1={() => this.handleApprove('approvedApplications', application, i, false)}
                                            firstName={application.childFirstName}
                                            lastName={application.childLastName}
                                        />
                                )
                        : this.state.rejectedApplications.length > 0 && Array.isArray(this.state.rejectedApplications)?
                                this.state.rejectedApplications.map((application, i) => 
                                    <ApplicationBox
                                        key={i}
                                        approved={false}
                                        i={i}
                                        value={false}
                                        style={{ display: "inline-block" }}
                                        onClick1={() => this.handleApprove('approvedApplications', application, i, true)}
                                        onChange1={() => this.handleApprove('approvedApplications', application, i, true)}
                                        firstName={application.childFirstName}
                                        lastName={application.childLastName}
                                    />
                                )
                        :null
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};   


export default AdminApplicationView
