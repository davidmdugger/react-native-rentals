/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from "react-native";
import axios from "axios";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  state = {
    test: "",
    properties: [],
    text: ""
  };

  componentDidMount() {
    this.fetchText();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  fetchText = () => {
    axios
      .get("http://localhost:8000/api/properties")
      .then(res =>
        this.setState({
          properties: res.data
        })
      )
      .catch(err => console.log("err: ", err));
  };

  saveProperty = () => {
    const propertyData = {
      name: "Property 3",
      img:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Captain_Moses_Collyer_House.jpg/780px-Captain_Moses_Collyer_House.jpg"
    };
    axios
      .post("http://localhost:8000/api/properties", propertyData)
      .then(res => {
        this.setState({
          properties: res.data
        });
      })
      .catch(err => console.log(err));
  };

  renderText = () => {
    const { test } = this.state;

    return test.length > 0 && <Text>{this.state.test}</Text>;
  };

  onChange = text => this.setState({ text });

  render() {
    return (
      <View style={styles.container}>
        {this.renderText()}
        <TextInput
          style={{
            height: 40,
            width: "100%",
            borderColor: "gray",
            borderWidth: 1
          }}
          onChangeText={this.onChange}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
