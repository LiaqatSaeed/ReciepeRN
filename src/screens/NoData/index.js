//references Region
import React, { Component, useCallback } from 'react';
import { FlatList, Alert, Linking, Platform, } from 'react-native';
import { Container, Content, Form, View, Text, Button } from 'native-base';
import CstHeader from '../Headers';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation-drawer';
import CommonStyles, { DynamicP, DynamicM } from '../../components/Styles';
import { CBreadCrumb } from '../../components/Card';
import { CPCard } from '../../components/Card'
import { CFItem, CLogo, CFooter } from "../../components/Utilities";
import UserImg from "../ThumbNail";
import Icon from 'react-native-vector-icons/Entypo';




//endregion


class NoData extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            refreshing: false,
        };
    }

    async UNSAFE_componentWillMount() {
        
    }



    render() {
        return (
            <Container
                style={{
                    backgroundColor: 'white',
                }}>
                <CstHeader
                    isMenuRight={true}
                    OpenMenu={() => {
                        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                    }}
                    Screen={'Niazi Foods'}
                    isCart={true}
                    openCart={() => { }}
                />
                <Content style={[DynamicM(20, 0, 0, 0),]}

                    contentContainerStyle={{ justifyContent: "center", flex: 1 }}>
                    <View style={[CommonStyles.vhc, , DynamicP(0, 20, 0, 0)]}>
                        <Icon name="emoji-sad" 
                            style={[CommonStyles.textColor,]} size={120}> </Icon>
                        <View style={[{ flexDirection: "row" }, DynamicM(10, 0, 0, 0), CommonStyles.vhc]}>
                            <Icon name="warning"
                                style={CommonStyles.textColor} size={20}> </Icon>
                            <Text style={[{ fontSize: 15, }, CommonStyles.textColor]}>
                                There's some issue with loading the data...
                            </Text>
                        </View>

                    </View>



                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    // user: state.User.UserInfo
});

const mapDispatchToProps = dispatch => ({
    // getProduct: ProductId => dispatch(getProduct(ProductId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoData);
