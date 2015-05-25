import request from 'request'
import {initialTemplate, updateTemplate} from './templates'

let data = {}

export default class {
  constructor (username, password) {
    this.username = username
    this.password = password
  }

  /**
   * create data structure
   */
  setupData (repoId, issueId) {
    data[repoId] = {}
    data[repoId][issueId] = {}
    data[repoId][issueId].count = 0
    data[repoId][issueId].users = []
    return data
  }
  /**
   * when an event is received
   */
  async onEvent (event) {
    if (event.issue && event.action === 'opened') {
      await this.commentIssue(event)
    }

    if (event.comment && this.isPlusOne(event.comment.body)) {
      await this.amendComment(event)
    }
  }

  /**
   * if the comment received is a +1
   */
  isPlusOne (comment) {
    switch (comment.trim()) {
      case '+1':
      case ':+1:':
      case ':thumbsup:':
        return true
    }
    return false
  }

  /**
   * handle sending requests back to github
   */
  async request (method, url, body) {
    return await new Promise((resolve, reject) => {
      return request({
        auth: {
          username: this.username,
          password: this.password
        },
        headers: {
          'User-Agent': 'plusnbot'
        },
        method: method,
        url: `https://api.github.com/${url}`,
        json: true,
        body: body
      }, (err, res, body) => {
        if (err) {
          reject(err)
        } else {
          resolve(body)
        }
      })
    })
  }

  /**
   * create the initial comment to be used
   */
  async commentIssue (event) {
    let data = this.setupData(event.repository.id, event.issue.id)
    let issue = data[event.repository.id][event.issue.id]
    let comment = await this.request('POST', `repos/${event.repository.full_name}/issues/${event.issue.number}/comments`, {
      body: initialTemplate(issue.count)
    })
    issue.commentId = comment.id
  }

  /**
   * delete the +1 comment
   */
  async deleteComment (event) {
    await this.request('DELETE', `repos/${event.repository.full_name}/issues/comments/${event.comment.id}`)
  }

  /**
   * update the initial comment with the new +1'er
   */
  async amendComment (event) {
    let deletedComment = await this.deleteComment(event)
    let issue = data[event.repository.id][event.issue.id]

    if (issue.users.indexOf(event.comment.user.login) === -1) {
      issue.users.push(event.comment.user.login)
      issue.count++
      let linkedUsers = issue.users.map(user => `@${user}`)
      let usersStr = linkedUsers.join(', ')
      await this.request('PATCH', `repos/${event.repository.full_name}/issues/comments/${issue.commentId}`, {
        body: updateTemplate(issue.count, usersStr)
      })
    }

  }

}
