import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/tasksCollection";

Meteor.publish("tasks", function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});
