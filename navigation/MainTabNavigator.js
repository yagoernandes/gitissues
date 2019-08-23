import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import IssuesScreen from '../screens/IssuesScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
)

HomeStack.navigationOptions = {
  title: 'GitIssues',
}

HomeStack.path = ''

const LinksStack = createStackNavigator(
  {
    Links: IssuesScreen,
  },
  config
)

LinksStack.navigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params.name}`,
})

LinksStack.path = ''

const tabNavigator = createStackNavigator({
  HomeStack,
  LinksStack,
})

tabNavigator.path = ''

export default tabNavigator
