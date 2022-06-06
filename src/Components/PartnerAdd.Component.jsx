import React, { Component } from "react";
import Form from "./Common/Form.Component";
import Input from "./Common/Input.Component";
import { store } from "../service/partnerService";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Common/Navbar.Component";

class PartnerAdd extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        location: "",
      },
      errors: {
        name: "",
        location: "",
      },
    };
  }
  handleValidation = (name, value) => {
    if (name == "name") {
      if (value.trim() == "") return "User Name must not be empty";
    }
    if (name == "location") {
      if (value.trim() == "") return "location field must not be empty";
    }
    return "";
  };
  doSubmit = async (e) => {
    const name = e.target[0].value;
    const location = e.target[1].value;
    let errors = { ...this.state.errors };
    if (name == "" && location == "") {
      errors["name"] = "name may be incurrect";
      return this.setState({ errors });
    }
    let data = {
      name: name,
      location: location,
    };
    await store(data);
    console.log(this.props)
   this.props.navigation("/partner")
  };
  render() {
    const { name, location } = this.state.data;
    const { errors } = this.state;
    return (
      <>
        <Navbar />
        <h2>Add Partner</h2>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={this.handleFormSubmit}>
              <div className="mb-3">
                <Input
                  type="text"
                  label="Name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleOnChange}
                  errors={errors}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="location"
                  label="Location"
                  id="location"
                  name="location"
                  value={location}
                  onChange={this.handleOnChange}
                  errors={errors}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default function(props) {
  const navigation = useNavigate();
  return <PartnerAdd {...props} navigation={navigation} />;
}
