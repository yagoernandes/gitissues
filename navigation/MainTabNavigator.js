import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator
} from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import IssuesScreen from '../screens/IssuesScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
})

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
)

HomeStack.navigationOptions = {
  title: 'GitIssues'
}

HomeStack.path = ''

const IssuesStack = createStackNavigator(
  {
    Issues: IssuesScreen
  },
  config
)

IssuesStack.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('headerTitle'),
})

IssuesStack.path = ''

const navigator = createStackNavigator({
  HomeStack,
  IssuesStack
})

navigator.path = ''

export default navigator
