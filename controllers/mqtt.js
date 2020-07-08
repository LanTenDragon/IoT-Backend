const mqtt = require('mqtt')
const Logger = require('../logger')
const Power = require('../models/power')
const MqttClient = mqtt.connect('mqtt://localhost:1883')

MqttClient.subscribe('socket/+/+/power', function (err) {
  if (!err) {
    Logger('Subscribed to socket power tree topic')
  }
})

MqttClient.on('message', function (topic, message) {
  const POJO = JSON.parse(message.toString())
  const powerObject = new Power({ amount: POJO.power, belongsTo: POJO.id })
  powerObject.save(function (err) {
    if (err) Logger(err.stack)
  })
})
