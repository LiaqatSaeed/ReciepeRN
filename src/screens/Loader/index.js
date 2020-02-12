import React from 'react';
import {Alert
} from 'react-native';
import { connect } from 'react-redux';
import { getUserToken, getIsStarted, loading, getCmpSettings } from '../../actions/AsyncStorage';
import CommonStyles from './style';
import LoadingSc from './Loading';

class AuthLoadingScreen extends React.Component {
    static navigationOptions = {
        // header: null,
    };
    constructor(props) {
        
        super(props);
    }
    componentWillMount(){
        this.props.loading(true);  
    }
    componentDidMount() {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this.props.loading(true);
                this._bootstrapAsync();
            }
            else {
                this.props.navigation.navigate('OffLine');
            }
        })

    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = () => {

        this.props.getCmpSettings().then((res) => {
            
            if (res.CmpConfigs == null || res.CmpConfigs.themeColor == undefined || res.CmpConfigs.line != undefined) {
                this.props.loading(false);
                this.props.navigation.navigate('Started');
                
            }
            else {
                this.props.getIsStarted().then((res) => {
                    
                    if (res.isStarted == null) {
                        this.props.loading(false);
                        this.props.navigation.navigate('GetStarted');

                    }
                    else {

                        this._getApp();
                    }
                    // var isToken = this.props.token.token == null ?0: Object.keys(this.props.token.token).length; 
                    // this.props.navigation.navigate(isToken > 0 ? 'App' : 'Auth');
                })
                    .catch(error => {
                        
                        Toaster({ data: "Unable to process Your request Please contact your admin", type: "danger" })
                        this.props.loading(false);
                    })
            }
        }).catch((error) => {
            Toaster({ data: `error is ${error}`, type: "danger" })
            this.props.loading(false);
        })
    };

    _getApp() {
        this.props.getUserToken().then(() => {
            this.props.loading(true);
            
             setTimeout(()=>{
                if (this.props.token.token != null) {
                
                    
                    if (!isEmpty(this.props.token.token)) {
                        this.props.loading(false);
                        this.getUserData();
                    }
                    else {
                        Alert.alert(
                            'Empty token',
                            'Token is empty without Token cannot Authenticate User Please Restart Your App',
                            [
                              {text: 'Restart', onPress: () =>RNRestart.Restart()},
                              {text: 'Okay', onPress: () =>{}},
                            ],
                            
                          )
                    }
                
                

            } 
            else 
            {
                this.props.loading(false);
                this.props.navigation.navigate('Auth');
            }
              },100);
            
        })
            .catch(error => {
                Toaster({ data: "Unable to process Your request Please contact your admin", type: "danger" })
                
                this.props.loading(false);
                this.props.navigation.navigate('Auth');
            })

    }
    _errorHandler() {
        Toaster({ data: "Unable to process Your request Please contact your admin", type: "danger" })
        this.props.loading(false);
        this.props.removeIsStarted().then((res) => {
            this.props.removeCmpSettings().then(() => {
                this.props.navigation.navigate('Auth');
            }).catch((err) => {

            })

        }).catch((er) => {

        })

    }


    getUserData() {
        this.props.loading(true);
        this.props.GetUserData().then((res) => {
            if (res.type != "ERROR") {
                this.props.navigation.navigate('App');
            } else {
                Toaster({ data: "Unable to process request Please contact your admin", type: "danger" })
                this.props.loading(false);
            }

        }).catch(error => {
            Toaster({ data: "Unable to process Your request Please contact your admin", type: "danger" })
            this.props.loading(false);
        })
    }


    // Render any loading content that you like here
    render() {
        return (
            <LoadingSc />
        );
    }
}
const mapStateToProps = state => ({
    token: state.token,
    CmpConfigs: state.token.CmpConfigs
});


const mapDispatchToProps = dispatch => ({
    getUserToken: () => dispatch(getUserToken()),
    getIsStarted: () => dispatch(getIsStarted()),
    loading: (isLoading) => dispatch(loading(isLoading)),
    GetUserData: () => dispatch(GetUserData()),
    getCmpSettings: () => dispatch(getCmpSettings())
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);