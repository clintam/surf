const bluebird = require('bluebird')

const promisesById = {}

bluebird.config({
  cancellation: true
})

const scheduleJob = (id, delay) => {
  cancelJob(id)
  const promise = bluebird.delay(delay)
  promisesById[id] = promise
  console.log(`Scheduled job for ${id} in ${delay} ms`)
  return promise
}

const cancelJob = (id) => {
  const oldPromise = promisesById[id]
  if (oldPromise) {
    console.log(`canceling old job for ${id}`)
    oldPromise.cancel()
    return true
  }
  return false
}

module.exports = {cancelJob, scheduleJob}
