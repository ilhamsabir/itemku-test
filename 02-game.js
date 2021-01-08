/**
 * Get list of stage with highest failure rate
 * 
 * @param {Number} n - total of the stage
 * @param {Number[]} users - reached stage of every user (element must be in range 1 - N + 1)
 * @return {Number[]} number of stage which is sorting by the highest failure rate
 */
function solution(n, users) {
  // failures rate each stages
  // ? format: [[stage, failure_rate], ....]
  let failures = []
  let totalOfUser = users.length

  // map user stage into object ({ [stage]: total_of_user_in_the_stage })
  users = users.reduce((acc, val) => ({
    ...acc,
    [val]: (acc[val] || 0) + 1
  }), {})
  
  for (let stage = 1; stage <= n; stage++) {
    // total of failure users in the stage
    let rateOfFailure = 0
    // total of user in the current stage (default to 0)
    let totalOfUserInStage = users[stage] || 0
    
    rateOfFailure = totalOfUserInStage / totalOfUser
    // decrease the total of users in the list
    totalOfUser -= totalOfUserInStage

    failures.push([stage, rateOfFailure])
  }

  // sort stage by the highest failure rate
  failures = failures.sort((a, b) => {
    const result = b[1] - a[1]
    // if the stages have the same failure rate, sort it escendingly by number of stage
    if (result === 0) return a[0] - b[0]
    return result 
  })

  // map and return only the number of stage
  return failures.map(([stage]) => stage)
}

console.log(solution(5, [2,1,2,6,2,4,3,3])) // [ 3, 4, 2, 1, 5 ]
console.log(solution(4, [4,4,4,4,4])) // [ 4, 1, 2, 3 ]
