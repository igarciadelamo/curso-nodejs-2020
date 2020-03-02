const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('event', function(){
    console.log('Event processed');
})

emitter.emit('event')
emitter.emit('event')
emitter.emit('event')


emitter.on('eventWithArgs', function(arg) {
    console.log('Event processed with id ' + arg.id + ' -> ' + arg.where);
})

emitter.emit('eventWithArgs', {id: 12, where: 'Mad'})
emitter.emit('eventWithArgs', {id: 14, where: 'Bar'})

emitter.on('eventWithArgs2', arg =>
    console.log('Event processed with id ' + arg.id + ' -> ' + arg.where)
)

emitter.emit('eventWithArgs2', {id: 18, where: 'Mad'})
emitter.emit('eventWithArgs2', {id: 19, where: 'Bar'})