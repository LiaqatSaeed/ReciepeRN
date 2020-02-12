import React from 'react';
import {
  ActivityIndicator,
  Modal,
  View,
  Text
} from 'react-native';
import { Image, StyleSheet } from "react-native";
import CommonStyles from './style';
import { connect } from 'react-redux';
import { loading } from '../../actions/AsyncStorage';

class LoadingSc extends React.Component {
  // Render any loading content that you like here
  render() {
    return (
      // <View style={[styles.container, {backgroundColor:'white' }]}>
      //     {/* <ActivityIndicator /> */}
      //     {/* <Image resizeMode="contain"
      //         style={[styles.imgResponsive,{height: 200, width: 200}]}
      //         source={require('../../../assets/Loader.gif')}

      //         resizeMode='contain'
      //     /> */}
      //     {/* <AnimatedEllipsis numberOfDots={4}
      //         animationDelay={150}
      //         style={{
      //             color: 'red',
      //             fontSize: 72,
      //         }}
      //     />
      //     <StatusBar barStyle="default" /> */}

      // <Spinner style={styles.spinner}  size={100} type={'Wave'} color={'#0070d2'}/>

      // </View>

      <Modal animationType="fade"
      transparent={true} onRequestClose={() => null} visible={this.props.loading}>
        <View  style={{ flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center',opacity:0.3}}>

        </View>
        <View style={[styles.fullHeight,styles.fullWidth,{flex:1,justifyContent:'center',alignItems:'center', position:'absolute',top:0,left:0 }]}>
          <View style={{ borderRadius: 10, padding: 25,justifyContent:'center',alignItems:'center' }}>
          
            <ActivityIndicator size="large"  color='white'/>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  token: state.loading,
});


const mapDispatchToProps = dispatch => ({
  loading: (isLoading) => dispatch(loading(isLoading))
});


export default connect(mapStateToProps, mapDispatchToProps)(LoadingSc);