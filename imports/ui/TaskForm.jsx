import React from "react";
import autobind from "class-autobind";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      text: "",
    };
  }

  handleChange(e) {
    const { value } = e.target;

    this.setState({ text: value });
  }

  handleSubmit(e) {
    const { text } = this.state;

    e.preventDefault();

    if (!text) {
      return;
    }

    Meteor.call("tasks.insert", text);

    this.setState({ text: "" });
  }

  render() {
    const { text } = this.state;

    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Type to add new tasks"
          value={text}
          onChange={this.handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

export default TaskForm;
