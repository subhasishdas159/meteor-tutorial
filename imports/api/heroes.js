import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Mongo } from 'meteor/mongo'

export const Heroes =  new Mongo.Collection('heroes')

if(Meteor.isServer) {
	Meteor.publish('publishedHeroes', function() {
		return Heroes.find({})
	})
}

Meteor.methods({

	'heroes.insert'(name) {
		check(name, String)

		if(!this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		Heroes.insert({
			name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
		})

	},

// 	'tasks.remove'(taskId) {
// 		check(taskId, String)

// 		const task =Tasks.findOne(taskId)
// 		if(task.private && task.owner !== this.userId) {
// 			throw new Meteor.Error('not-authorized')
// 		}

// 		Tasks.remove(taskId)
// 	},

// 	'tasks.setChecked'(taskId, setChecked) {
// 		check(taskId, String)
// 		check(setChecked, Boolean)

// 		const task =Tasks.findOne(taskId)
// 		if(task.private && task.owner !== this.userId) {
// 			throw new Meteor.Error('not-authorized')
// 		}

// 		Tasks.update(taskId, {
//   		$set: { checked: setChecked }
//   	})
// 	},

// 	'tasks.setPrivate'(taskId, setToPrivate) {
// 		check(taskId, String)
// 		check(setToPrivate, Boolean)

// 		const task = Tasks.findOne(taskId)

// 		if(task.owner !== this.userId) {
// 			throw new Meteor.Error('not-authorized')
// 		}

// 		Tasks.update(taskId, {
// 			$set: {private: setToPrivate}
// 		})
// 	}

})