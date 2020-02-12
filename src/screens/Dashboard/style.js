const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const TabsSize = deviceWidth > 480 ? deviceWidth /3.5:100;
export default{
    TabsContainer:{
      flexDirection: 'row', 
      flexDirection: 'row', 
      marginTop: 40, 
      flexWrap: 'wrap', 
      alignItems: 'center', 
      flex: 1, 
      justifyContent: 'center'
    },
    TabsBtn:{
      width: TabsSize,
      height: TabsSize, 
      backgroundColor: 'rgba(236, 244, 251, 1)', 
      borderRadius: TabsSize/2, 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    ComingSoon:{
      justifyContent:'center',alignItems:'center',backgroundColor:'rgba(230, 230, 230, 0.8)',position:'absolute',top:0,left:0,zIndex:2
    },
    ComingSoonTxt:{
      fontWeight:'600',fontSize:18,textAlign:'center'
    },
}