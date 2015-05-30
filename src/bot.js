import request from 'request'
import {initialTemplate, updateTemplate} from './templates'
import {set, get} from './store'

export default class {
  constructor (username, password) {
    this.username = username
    this.password = password
  }

  /**
   * when an event is received
   */
  async onEvent (event) {
    if (event.issue && event.action === 'opened') {
      try {
        await this.commentIssue(event)
      } catch (err) {
        console.log(err)
      }
    }

    if (event.comment && this.isPlusOne(event.comment.body)) {
      try {
        await this.amendComment(event)
      } catch (err) {
        console.log(err)
      }
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
          'User-Agent': this.username
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
    let comment = await this.request('POST', `repos/${event.repository.full_name}/issues/${event.issue.number}/comments`, {
      body: initialTemplate()
    })

    let issue = {
      initialComment: comment.id,
      count: 0,
      users: []
    }

    set(event.repository.full_name, event.issue.number, issue, 'save')
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
    await this.deleteComment(event)
    let issue = await get(event.repository.full_name, event.issue.number)

    if (issue.users.indexOf(event.comment.user.login) === -1) {
      issue.users.push(event.comment.user.login)
      issue.count++
      let linkedUsers = issue.users.map(user => `@${user}`)
      let usersStr = linkedUsers.join(', ')
      await this.request('PATCH', `repos/${event.repository.full_name}/issues/comments/${issue.initialComment}`, {
        body: updateTemplate(issue.count, usersStr)
      })
      set(event.repository.full_name, event.issue.number, issue, 'merge')
    }
  }

}
