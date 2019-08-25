import React from 'react'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'
import renderer from 'react-test-renderer'
// import { render, fireEvent } from 'react-testing-library'
import HomeScreen from '../screens/HomeScreen'

jest.mock('expo', () => ({
  AppLoading: 'AppLoading'
}))

jest.mock('../navigation/AppNavigator', () => 'AppNavigator')

describe('HomeScreen', () => {
  jest.useFakeTimers()

  beforeEach(() => {
    NavigationTestUtils.resetInternalState()
  })

  it(`renders the home screen`, () => {
    const tree = renderer.create(<HomeScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })

})