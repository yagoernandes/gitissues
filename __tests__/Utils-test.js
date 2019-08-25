// const api = require('../store/api')
// const asyncStorage = require('../store/asyncStorage')
import api from '../store/api'
import storage from '../store/asyncStorage'

// api
test('addProject function exists in api.js', () => {
  expect(api.addProject).toBeDefined()
})

test('getIssues function exists in api.js', () => {
  expect(api.getIssues).toBeDefined()
})

//asyncStorage
test('get function exists in api.js', () => {
  expect(storage.get).toBeDefined()
})

test('set function exists in api.js', () => {
  expect(storage.set).toBeDefined()
})
