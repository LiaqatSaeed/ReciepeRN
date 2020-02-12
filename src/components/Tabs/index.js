import React from 'react';
import {View} from 'react-native';
import {Tab, Tabs, ScrollableTab, Text} from 'native-base';
import CommonStyles, {DynamicM, DynamicP, DynamicHeight} from '../Styles';

//Product card
const CTabs = props => {
  
  return (
    <Tabs
      onChangeTab={(r)=>{
          
      }}
      
      tabBarUnderlineStyle={{borderBottomWidth: 3, borderBottomColor:'#3E83FF'}}
      renderTabBar={() => <ScrollableTab  style={{ backgroundColor: "#ccc" }} />}>
      {props.data.map(obj => (
        <Tab
          activeTabStyle={{backgroundColor: 'white'}}
          activeTextStyle={{color: '#3E83FF', fontWeight: '700'}}
          tabStyle={{backgroundColor: 'white'}}
          textStyle={{color: '#8193AE'}}
          
          heading={obj.Name}>
          <View style={{flex:1,backgroundColor:'red'}}>
            <Text>{obj.Name}</Text>
          </View>
        </Tab>
      ))}
    </Tabs>
  );
};

export {CTabs};
