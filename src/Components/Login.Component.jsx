import React, { Component } from "react";
import Form from "./Common/Form.Component";
import Input from "./Common/Input.Component";
import { login } from "../service/userService";
class Login extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: "",
      },
      errors: {
        username: "",
        password: "",
      },
    };
  }
  handleValidation = (name, value) => {
    if (name == "username") {
      if (value.trim() == "") return "User Name must not be empty";
    }
    if (name == "password") {
      if (value.trim() == "") return "Password field must not be empty";
    }
    return "";
  };
  doSubmit = async (e) => {
    const username = e.target[0].value;
    const password = e.target[1].value;
    let errors = { ...this.state.errors };
    if (username == "" && password == "") {
      errors["username"] = "Username may be incurrect";
      return this.setState({ errors });
    }
    let loginUser = {
      username: username,
      password: password,
      grant_type: "password",
      client_id: 2,
      client_secret: "ZvjeEN9fEAmajNekNc7QTldTdmqePLfq5VfUvaKA",
      scope: "*",
    };
    await login(loginUser);
    window.location = "/home";
    // this.props.history.push("/movies")
  };
  render() {
    const { username, password } = this.state.data;
    const { errors } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={this.handleFormSubmit}>
              <div className="mb-3">
                <Input
                  type="text"
                  label="User name"
                  id="username"
                  name="username"
                  value={username}
                  onChange={this.handleOnChange}
                  errors={errors}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="password"
                  label="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.handleOnChange}
                  errors={errors}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
