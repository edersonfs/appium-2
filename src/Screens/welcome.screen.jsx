import React, { useEffect } from 'react'
import { BackHandler, Alert, Platform, StyleSheet, Text, View, Button, StatusBar } from 'react-native'
// import { Text } from '@ui-kitten/components'

import useGlobal from '../Store'

// import { language } from '../Languages'

// import textStyle from '../Styles/text.style'

// import Base from '../Components/Layout/base.component'
// import BaseButton from '../Components/Layout/baseButton.component'

const WelcomeScreen = ({ handlers }) => {
  const [state] = useGlobal()
  const { content } = state
  // const { loginRegister } = content
  // const { button } = language
  // const { baseWhite, titleWhite } = textStyle

  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });

  return (
    <>
    <View style={styles.container}>
        <Text style={styles.welcome} accessible={true} accessibilityLabel="welcome-message">Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button onPress={() => {
          Alert.alert('Você apertou o botão');
        }} title="Pressione" color="#000000" accessibilityLabel="press-button"/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default WelcomeScreen
