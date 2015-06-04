import db from './index'

/**
 * add intial data when issue is opened
 */
export function set (repoName, issueId, issueData, action) {
  let response
  db[action](`issue:${repoName}_${issueId}`, issueData, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      response = res
    }
  })
  return response
}

/**
 * get data for specific document
 */
export async function get (repoName, issueId) {
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
