const http = require('axios')
const {textProcessor} = require('./textProcessor')

const computePredictions = (rawInput, predictionModelPromise) => {
  const input = rawInput.map(textProcessor)
  const predictHost = `${process.env.PREDICTOR_HOST || 'localhost'}:${process.env.PREDICTOR_PORT || '8081'}`
  const url = `http://${predictHost}/predict`
  return Promise.all([
    predictionModelPromise,
    http.post(url, {inputs: input})
  ])
    .then(results => {
      const predictionModel = results[0]
      const predictionResults = results[1].data.result
      return predictionResults.map(i => predictionModel.keys[i])
    })
}

module.exports = {computePredictions}
