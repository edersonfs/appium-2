import React, { useEffect, Component } from 'react'
import { Alert, Platform, StyleSheet, Text, View, Button, StatusBar } from 'react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import appTheme from './Theme/custom-theme.json'
import customMapping from './Theme/custom-mapping.json'
import Navigator from './Navigator'

import useGlobal from './Store'

const theme = { ...lightTheme, ...appTheme }

const App = () => {
  // const [, actions] = useGlobal()

  // useEffect(() => {
  //   const initialLoad = async () => {
  //     await actions.loadContent()
  //   }
  //   initialLoad()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme} customMapping={customMapping}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <Navigator />
      </ApplicationProvider>
    </>
  )
}

export default App
