/**
 * Check the equality of array
 * The order of the elements ignored
 * ? Example: [1,2] and [2,1] => those are equal
 * ? Example: [1,2] and [1,2,3] => those aren't equal
 * 
 * @param {any[]} arr - first array
 * @param {any} brr - second array
 * @returns {Boolean} is the arrays are equal
 */
function isArrayEqual(arr, brr) {
  // check the equality of arrays
  const sameLength = arr.length === brr.length
  if (!sameLength) return false

  // check every element of an array
  for (const a of arr) {
    // compare the element by another array
    if (!brr.includes(a)) return false
  }

  return true
}

/**
 * Check does the array have duplication element
 * Support array element
 * ? Example: [[1,2],[2,5],[1,2]] => true
 * ? Example: [[1,2],[5,4],[2,1]] => false
 * 
 * @param {any[]} arrs - array to be checked
 * @returns {Boolean} does the array have duplication element
 */
function checkElementDuplication(arrs) {
  for (const arr of arrs) {
    if (arrs.filter(data => (JSON.stringify(data) === JSON.stringify(arr))).length >= 2)
      return true
  }
  return false
}

/**
 * Mix element of the arrays into a single nested array
 * ? Example: [1,2] and [2,3] => [[1,2],[2,3]]
 * 
 * @param {any[]} arrs - array to be mixed
 * @returns {any[]} result of mixed array
 */
function mixArrayElement(...arrs) {
  let results = arrs[0]
  for (let i = 1; i < arrs.length; i++) {
    results = results.map((val, j) => {
      let value = typeof val === 'object' ? val : [val]
      // concat element
      return [...value, arrs[i][j]]
    })
  }
  return results
}

/**
 * Get all possible array element combination
 * ? Example: [1,2,3] => [[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
 * ? Example: [1,2] => [[1],[2],[1,2]]
 * 
 * TODO: need improvement
 *
 * 
 * @param {any[]} arr 
 * @returns {any[]} result of combination element with length (2^n - 1)
 */
function combineArrayElement(arr) {
  const maxElm = Math.pow(2, arr.length) - 1 // (2^n - 1)
  let result = arr.map(data => ([data])) // default result

  for (const x of arr) { // x: number
    for (const y of result) { // y: array of number
      if (!y.includes(x)) {
        // if the result already exceed the maximum combination
        if (result.length >= maxElm) return result
        // create possible combination
        const newCombination = [x, ...y]
        // check does the combination already exist
        if (!result.find(data => isArrayEqual(data, newCombination))) {
          // if the combination doesn't exist
          // push to the result array
          result.push(newCombination)
        }
      }
    }
  }

  return result
}

/**
 * Main solution function
 * 
 * @param {any[]} relations - relation document data
 * @returns {Number} number of candidate keys
 */
function solution(relations) {
  let relation = {}
  // map relations data into object of array
  for (const i in relations[0]) {
    relation[i] = relations.map(data => data[i])
  }

  // get all possible combination
  const combinedElm = combineArrayElement(Object.keys(relation))

  let total = 0 // the number of candidate keys
  let usedKeys = [] // used key (need to skip the checking)
  for (const keys of combinedElm) {
    // if the candidate key's already used
    if (!keys.some(key => usedKeys.includes(key))) {
      const multiArray = keys.map(key => relation[key])
      const mixedArray = mixArrayElement(...multiArray)
      if (!checkElementDuplication(mixedArray)) {
        usedKeys.push(...keys)
        total++
      }
    }
  }

  return total
}

console.log(solution([
  ["100", "ryan", "music", "2"],
  ["200", "apeach", "math", "2"],
  ["300", "tube", "computer", "3"],
  ["400", "con", "computer", "4"],
  ["500", "muzi", "music", "3"],
  ["600", "apeach", "music", "2"]
]))

// Time Complexity: O(n^4)
// Which n is the number an element in a array record
