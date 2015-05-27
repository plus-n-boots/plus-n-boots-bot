import cradle from 'cradle'

let couch = new(cradle.Connection)('https://plus-n-boots.iriscouch.com', 443)
let db = couch.database('issues')

/**
 * add intial data when issue is opened
 */
export function setData (repoName, issueId, issueData, action) {
  db[action](`issue:${repoName}_${issueId}`, issueData, (err, res) => {
    if (err) {
      console.log(err)
    }
  })
}

/**
 * get data for specific document
 */
export async function getData (repoName, issueId) {
  return await new Promise((resolve, reject) => {
    return db.get(`issue:${repoName}_${issueId}`, function (err, doc) {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}
