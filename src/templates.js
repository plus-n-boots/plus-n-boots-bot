import dedent from 'dedent'
import {botUsername} from './config'

let intro = dedent`
  ###### ${botUsername} here, I'll be helping keep track of +1's for this issue.

  ###### To add your support just leave a comment saying +1 or :+1: and I'll handle the rest.

  ----------
`

let outro = dedent`
  ----------

  ###### Want my help in your organisation or repository? Check out my [getting started guide](https://github.com/plus-n-boots/plus-n-boots-bot#background) for details.

  ###### Did I do something wrong? Something I could do better? Head over to my [repository](https://github.com/plus-n-boots/plus-n-boots-bot/issues) to tell me about it.
`

/**
 * format array of users to add @ in front of username and convert to string to
 * write to issue comment
 */
let formatUsers = function formatUsersFn (users) {
  let linkedUsers = users.map(user => `@${user}`)
  let usersStr = linkedUsers.join(', ')
  return usersStr
}

/**
 * the initial template to render
 */
export function initialTemplate () {
  let body = `### No +1's for this issue just yet.`
  let comment = intro + '\n\n' + body + '\n\n' + outro
  return comment
}

/**
 * the updated template to render each time a new +1 is received
 */
export function updateTemplate (count, users) {
  let formattedUsers = formatUsers(users)
  let peoplePlural = count === 1 ? 'person has' : 'people have'
  let listPlural = count === 1 ? 'That\'s you' : 'They are'
  let body = dedent`### ${count} ${peoplePlural} +1'd this issue.

                    ###### ${listPlural} ${formattedUsers}.`
  let comment = intro + '\n\n' + body + '\n\n' + outro
  return comment
}
