import React from "react";
import { Meteor } from "meteor/meteor";
import autobind from "class-autobind";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      username: "",
      password: "",
    };
  }

  setUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  setPassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    Meteor.loginWithPassword(username, password);
  };

  render() {
    const { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={this.setUsername}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={this.setPassword}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    );
  }
}

export default LoginForm;
