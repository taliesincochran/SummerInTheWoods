import React from 'react';
import { getFirebase } from './index';

const defaultContextValue = {
  data: {
  },
  firebase: {
  },
  setData: () => {
  },
};

const firebase = React.createContext(defaultContextValue);

export class FirebaseProvider extends React.Component {
  constructor(props) {
    super(props);
    this._initFirebase = false;
    this.setData = this.setData.bind(this);
    this.state = {
      set: this.setData,
      data: {},
      firebase: {}
    };
  }
  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '', });
    }, 100);
    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);
      firebase.getCalendar().then(data => {
        this.setState({firebase, data}) 
      })
    });
  }
  setData (newData) {
    console.log('set data called', newData)
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }
  render() {
    return (
    <firebase.Provider
      value={{
        state: this.state,
        setData: this.setData,
        firebase: this.firebase,
        calendarData: this.calendarData
      }}
    >
      {this.props.children}
    </firebase.Provider>
    )}
};
export const withFirebase = Component => props => {
  return (
  <firebase.Consumer>
    {firebase => {
      return (
        <Component {...props} firebase={firebase} />
      )}}
  </firebase.Consumer>
)};

export default firebase;
