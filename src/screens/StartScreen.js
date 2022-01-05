import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Message from '../components/Message'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      {/* <Logo /> */}
      <Header>Welcome to Wheebox</Header>
      <Paragraph>
        The easiest way to conduct online assessment
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Register
      </Button>
    </Background>
  )
}
