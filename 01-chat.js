/**
 * Possible command
 * Case sensitive disable
 */
const ENUM_COMMAND = {
  ENTER: "enter",
  LEAVE: "leave",
  CHANGE: "change"
}

/**
 * Simple switch helper
 * 
 * @param {any} value - value to compare
 * @param {Object} statement - object of statement (key as val, value as callback)
 * @param {Function|undefined} defaultCallback - default execution when none mathes
 * @return {void}
 */
function simpleSwitch(value, statement, defaultCallback) {
  statement[value]
    ? statement[value]()
    : defaultCallback && defaultCallback()
}

/**
 * Main solution function
 * 
 * @param {String[]} records - chat input
 * @returns {String[]}
 */
function solution(records) {
  let users = {} // users in the chat { [id]: name }
  let answers = [] // output results
  let activities = [] // detail chat activities (id, command)

  /**
   * Get user detail by user id
   * 
   * @param {String} userId - user id to get
   * @returns {Object} user data
   */
  const getUser = (userId) => {
    return { id: userId, name: users[userId] }
  }

  /**
   * Insert new user to user list
   * Replace if exists
   * 
   * @param {Object} newUser - user data to add
   * @param {String} newUser.id - user id
   * @param {String} newUser.name - user name
   * @returns {void}
   */
  const insertUser = (newUser) => {
    users = {
      ...users,
      [newUser.id]: newUser.name
    }
  }

  /**
   * Remove user by user id
   * 
   * @param {String} userId - user id to remove
   * @returns {void}
   */
  const removeUser = (userId) => {
    delete users[userId]
  }

  // build detail activities
  records.forEach(record => {
    // split string by space
    const [command, userId, info] = record.split(" ")
    activities.push({ userId, command })

    // conditional process by command
    // convert command string into lowercase to disable case sensitive
    simpleSwitch(command.toLowerCase(), {
      // insert new user on enter
      [ENUM_COMMAND.ENTER]: () => insertUser({ id: userId, name: info }),
      // remove user on enter
      [ENUM_COMMAND.LEAVE]: () => removeUser(userId),
      // insert or replace user on change
      [ENUM_COMMAND.CHANGE]: () => insertUser({ id: userId, name: info })
    })
  })

  // build readable chat message
  activities.forEach(activity => {
    // conditional process by command
    // create output message
    simpleSwitch(activity.command.toLowerCase(), {
      [ENUM_COMMAND.ENTER]: () => answers.push(`${getUser(activity.userId).name} came in`),
      [ENUM_COMMAND.LEAVE]: () => answers.push(`${getUser(activity.userId).name} has left`)
    })
  })

  return answers
}

console.log(solution([
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid1234",
  "Enter uid1234 Prodo",
  "Change uid4567 Ryan"
])) // [ 'Prodo came in', 'Ryan came in', 'Prodo has left', 'Prodo came in' ]
