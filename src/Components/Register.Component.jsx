import React, { Component } from "react";
import Form from "./Common/Form.Component";
import Input from "./Common/Input.Component";
import { register } from "../service/userService";
import { Link } from "react-router-dom";
class Register extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        email: "",
        password: "",
      },
      errors: {
        name: "",
        email: "",
        password: "",
      },
    };
  }
  handleValidation = (name, value) => {
    if (name == "name") {
      if (value.trim() == "") return "User Name must not be empty";
    }
    if (name == "email") {
      if (value.trim() == "") return "User Email must not be empty";
    }
    if (name == "password") {
      if (value.trim() == "") return "Password field must not be empty";
    }
    return "";
  };
  doSubmit = async (e) => {
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    let errors = { ...this.state.errors };
    if (name == "" || password == "" || password == "") {
      errors["name"] = "Filed may be incurrect";
      return this.setState({ errors });
    }
    let newUser = {
      name: name,
      email: email,
      password: password,
      grant_type: "password",
      client_id: process.env.REACT_APP_SERVER_CLIENT_ID,
      client_secret: process.env.REACT_APP_SERVER_CLIENT_SECRET,
      scope: "*",
    };
    let response = await register(newUser);
    if(response && response.status && response.status=='ok'){
      alert(response.message)
    }
    if(response && response.status && response.status=='error'){
      this.setState((prevState)=>{
        if(response.message['email']){
          let errorData = {...prevState['errors'],email:JSON.stringify(response.message['email'])};
          return {errors:errorData}
        }
        })
    }
    // window.location = "/login";
    // this.props.history.push("/movies")
  };
  render() {
    if(localStorage.getItem('accessToken')) return window.location.href = '/home'
    const { name,email, password } = this.state.data;
    const { errors } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
          <div className="card">
            <div className="card-heading bg-info p-5"><h2>Register</h2></div>

            <div className="card-body">
            <form onSubmit={this.handleFormSubmit}>
              <div className="mb-3">
                <Input
                  type="text"
                  label="User name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleOnChange}
                  errors={errors}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="text"
                  label="User Email"
                  id="email"
                  name="email"
                  value={email}
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
                Register
              </button>
              <Link to="/login">Login?</Link>
            </form>
            </div>
          </div>
          </div>
        </div>
      </>
    );
  }
}
export default Register;
