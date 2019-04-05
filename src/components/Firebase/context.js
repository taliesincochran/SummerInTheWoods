import React from 'react';

const defaultContextValue = {
  data: {
    // set your initial data shape here
    isMenuVisible: false,
    loading: 'is-loading',
    auth: null,
    date: '',
    month: '',
    year: '',
    yearsArray: [],
    rawCampTimes: [],
    campTimes: [],
    localTimezoneOffset: 4,
    userAccount: '',
    firebase: null
  },
  set: () => { },
}

const { Provider, Consumer } = React.createContext(defaultContextValue)
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);
class withFirebase extends React.Component {
  constructor() {
    super()

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultContextValue,
      set: this.setData,
    }
  }

  setData(newData) {
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }

}
export default FirebaseContext;
