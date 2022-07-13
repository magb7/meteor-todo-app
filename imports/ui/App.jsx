import React from "react";
import autobind from "class-autobind";

import { withTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../db/tasksCollection";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import LoginForm from "./LoginForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      hideCompleted: false,
    };
  }

  toggleCompleted() {
    const { hideCompleted } = this.state;

    this.setState({ hideCompleted: !hideCompleted });
  }

  render() {
    const { hideCompleted } = this.state;
    const { pendingTasksCount, user, isLoading } = this.props;

    const pendingTasksTitle = `${
      pendingTasksCount ? `(${pendingTasksCount})` : ""
    }`;

    return (
      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>TO D0 {pendingTasksTitle}</h1>
            </div>
            {user && (
              <div>
                <button onClick={() => Meteor.logout()}>🚪 Log out</button>
              </div>
            )}
          </div>
        </header>

        <main className="main">
          {user && (
            <>
              <TaskForm />
              <div className="filter">
                <button onClick={this.toggleCompleted}>
                  {hideCompleted ? "Show All" : "Hide Completed"}
                </button>
              </div>
              {isLoading && <div className="loading">Loading...</div>}
              {!isLoading && (
                <TaskList hideCompleted={hideCompleted} user={user} />
              )}
            </>
          )}
          {!user && <LoginForm />}
        </main>
      </div>
    );
  }
}

export default withTracker(() => {
  const user = Meteor.user();
  const tasksHandler = Meteor.subscribe("tasks");

  if (!user) {
    return {
      pendingTasksCount: 0,
      isLoading: false,
      user,
    };
  }

  if (!tasksHandler.ready()) {
    return {
      pendingTasksCount: 0,
      isLoading: false,
      user,
    };
  }

  const pendingTasksCount = TasksCollection.find({
    isChecked: { $ne: true },
    userId: user._id,
  }).count();
  const isLoading = false;

  return {
    pendingTasksCount,
    user,
    isLoading,
  };
})(App);
