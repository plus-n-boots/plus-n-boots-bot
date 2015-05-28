let intro = `###### plusn bot here, I'll be helping keep track of +1's for this issue.

###### To add your support leave a comment saying +1 or :+1: and I'll handle the rest.

----------

`

let outro = `
----------

###### Want your own plusn bot? Check our the [getting started guide]() for details on how to get up and running.

###### Got some feedback or a feature request? Head over to the [plusn bot repository]() to raise an issue.

`
/**
 * the initial template to render
 */
export function initialTemplate () {
  let body = `### There are no +1's for this issue yet.`
  let comment = intro + body + outro
  return comment
}

/**
 * the updated template to render each time a new +1 is received
 */
export function updateTemplate (count, users) {
  let peoplePlural = count === 1 ? 'person has' : 'people have'
  let body = `### ${count} ${peoplePlural} +1'd this issue.

###### They are ${users}`
  let comment = intro + body + outro
  return comment
}
