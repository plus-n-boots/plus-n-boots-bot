import {initialTemplate, updateTemplate} from '../src/templates.js'

describe('initialTemplate', () => {
  it('should return a static markdown template', () => {
    initialTemplate().should.be.type('string')
  })
})

describe('updateTemplate', () => {
  describe('when the count is one and a single user is passed through', () => {
    it('should return a markdown template formatted for a single person', () => {
      updateTemplate(1, ['username']).should.containEql(`### 1 person has +1'd this issue.

###### That's you @username.`)
    })
  })

  describe('when the count is more than one and multiple users are passed through', () => {
    it('should return a markdown template formatted for multiple people', () => {
      updateTemplate(2, ['username-one', 'username-two']).should.containEql(`### 2 people have +1'd this issue.

###### They are @username-one, @username-two.`)
    })
  })
})
