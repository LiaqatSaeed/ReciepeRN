//region References
import React, { Component } from "react";
import { View } from "react-native";
import { Text, Thumbnail } from "native-base";
import { connect } from "react-redux";
//endregion

class Thumbs extends Component {
  constructor(props) {
    super(props);
  }

  _RenderContent() {
    return (
      <View
        style={{
          width: this.props.size,
          height: this.props.size,
          borderRadius: this.props.size / 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            this.props.UserInfo.UserImageColor == null || ""
              ? "#006666"
              : this.props.UserInfo.UserImageColor
        }}
      >
        <Text
          style={[{
            color: "white",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: this.props.fontSize !== undefined ? this.props.fontSize : 20,
          }]}
        >
          {`${this.props.UserInfo.FirstName[0]}${this.props.UserInfo.LastName[0]}`}
        </Text>
      </View>
    );
  }
  render() {
    return this._RenderContent();
  }
}

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Thumbs);
