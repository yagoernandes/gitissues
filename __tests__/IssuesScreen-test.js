import React from 'react'
import NavigationTestUtils from 'react-navigation/NavigationTestUtils'
import renderer from 'react-test-renderer'
// import { render, fireEvent } from 'react-testing-library'
import IssuesScreen from '../screens/IssuesScreen'

describe('IssuesScreen', () => {
  jest.useFakeTimers()

  it(`renders the issues screen`, () => {
    const fakeState = {
      state: {
        params: { id: 123123123, name: 'Test', login: 'testtt', avatar: 'url' }
      }
    }
    const tree = renderer
      .create(<IssuesScreen navigation={fakeState} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
