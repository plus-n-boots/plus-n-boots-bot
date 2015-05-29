let intro = `###### plus-n-boots here, I'll be helping keep track of +1's for this issue.

###### To add your support just leave a comment saying +1 or :+1: and I'll handle the rest.

----------

`

let outro = `
----------

###### Want my help in your organisation or repository? Check out my [getting started guide]() for details.

###### Did I do something wrong? Something I could do better? Head over to my [repository]() to tell me about it.

`
/**
 * the initial template to render
 */
export function initialTemplate () {
  let body = `### No +1's for this issue just yet.`
  let comment = intro + body + outro
  return comment
}

/**
 * the updated template to render each time a new +1 is received
 */
export function updateTemplate (count, users) {
  let peoplePlural = count === 1 ? 'person has' : 'people have'
  let listPlural = count === 1 ? 'That\'s you' : 'They are'
  let body = `### ${count} ${peoplePlural} +1'd this issue.

###### ${listPlural} ${users}`
  let comment = intro + body + outro
  return comment
}
