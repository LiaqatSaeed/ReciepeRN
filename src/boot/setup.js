//region References
import React, {Component} from 'react';
import {Root, StyleProvider} from 'native-base';
import getTheme from '../../native-base-theme/components';
import variables from '../../native-base-theme/variables/material';
import {Provider} from 'react-redux';
// import StartedScreen from '../screens/GetStarted'
import {AppContainer, AuthContainer} from '../navigator';
import {connect} from 'react-redux';
import store from '../store';
import {getUserToken} from '../actions/UserActions';
//endregion

export default class Setup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      refreshing: false,
    };
  }


  render() {
    return (
      <Provider store={store}>
        <Root>
          <StyleProvider style={getTheme(variables)}>
            {/* <StartedScreen /> */}
            <AppContainer />
            
          </StyleProvider>
        </Root>
      </Provider>
    );
  }
}


//export default connect(mapStateToProps, mapDispatchToProps)(Setup);
