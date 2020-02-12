import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { Input } from 'native-base';

export default class CInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
      this._keyboardDidShow(e),
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e =>
      this._keyboardDidHide(e),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.onKeyBoardChange(true);
  };
  onKeyBoardChange = val => {
    if (this.state !== null) {
      if (this.state.isVisible !== val) {
        this.setState(
          {
            isVisible: val,
          },
          () => this.props.KeyboardCallback(val),
        );
      }
    }
  };

  _keyboardDidHide = () => {
    this.onKeyBoardChange(false);
  };

  render() {
    return (
      <Input
        style={this.props.style != undefined ? this.props.style : {}}
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        
        keyboardType={this.props.keyboardType !== undefined ?  this.props.keyboardType :'default'}
        placeholderTextColor={this.props.placeholderTextColor !== undefined ? this.props.placeholderTextColor : {}}
        secureTextEntry={this.props.security !== undefined ? true : false}
        onChangeText={val => this.props.onSubmitEditing(val)}
        onSubmitEditing={() => {
          Keyboard.dismiss();
          this.props.onSubmitEditing();
        }}
      />
    );
  }
}
