import React from 'react'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'
import renderer from 'react-test-renderer'
// import { render, fireEvent } from 'react-testing-library'
import HomeScreen from '../screens/HomeScreen'

describe('HomeScreen', () => {
  jest.useFakeTimers()

  it(`renders the home screen`, () => {
    const tree = renderer.create(<HomeScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
