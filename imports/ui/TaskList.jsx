import React from "react";

import { Task } from "./Task";
import { withTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../db/tasksCollection";

class TaskList extends React.Component {
  toggleChecked({ _id, isChecked }) {
    Meteor.call("tasks.setIsChecked", _id, !isChecked);
  }

  deleteTask({ _id }) {
    Meteor.call("tasks.remove", _id);
  }

  render() {
    const { tasks } = this.props;

    return (
      <ul className="tasks">
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onCheckboxClick={this.toggleChecked}
            onDeleteClick={this.deleteTask}
          />
        ))}
      </ul>
    );
  }
}

export default withTracker((props) => {
  const { hideCompleted, user } = props;

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  if (!user) {
    return {
      tasks: [],
    };
  }

  const tasks = TasksCollection.find(
    hideCompleted ? pendingOnlyFilter : userFilter,
    {
      sort: { createdAt: -1 },
    }
  ).fetch();

  return {
    tasks,
  };
})(TaskList);
