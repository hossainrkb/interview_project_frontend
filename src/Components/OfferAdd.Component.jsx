import React, { Component } from "react";
import Form from "./Common/Form.Component";
import Input from "./Common/Input.Component";
import { store } from "../service/offerService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

class OfferAdd extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        percentage: "",
        image: {},
      },
      errors: {
        name: "",
        percentage: "",
      },
    };
  }
  handleOnChange = (e) => {
    let data = { ...this.state.data };
    let errors = { ...this.state.errors };
    if (e.target.name == "image") {
      data[e.target.name] = e.target.files[0];
    } else {
      data[e.target.name] = e.target.value;
    }
    let validation_errors = this.handleValidation(
      e.target.name,
      e.target.value
    );
    errors[e.target.name] = validation_errors;
    this.setState({ data, errors });
  };
  handleValidation = (name, value) => {
    if (name == "name") {
      if (value.trim() == "") return "Name must not be empty";
    }
    if (name == "percentage") {
      if (value.trim() == "") return "percentage field must not be empty";
    }
    return "";
  };
  doSubmit = async (e) => {
    const name = e.target[0].value;
    const percentage = e.target[1].value;
    let errors = { ...this.state.errors };
    if (name == "" && percentage == "") {
      errors["name"] = "name may be incurrect";
      return this.setState({ errors });
    }
    let fd = new FormData();
    fd.append("image", this.state.data.image);
    fd.append("name", name);
    fd.append("percentage", percentage);
    await store(fd, this.props.param);
    this.props.navigation(`/partner/${this.props.param}/offers`);
  };
  render() {
    const { name, percentage } = this.state.data;
    const { errors } = this.state;
    return (
      <>
        <h1>Offer Add</h1>
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
                  type="text"
                  label="Percentage"
                  id="percentage"
                  name="percentage"
                  value={percentage}
                  onChange={this.handleOnChange}
                  errors={errors}
                />
              </div>
              <div className="mb-3">
                <Input
                  type="file"
                  label="Image"
                  id="image"
                  name="image"
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
export default function (props) {
  const navigation = useNavigate();
  let { id } = useParams();
  return <OfferAdd {...props} navigation={navigation} param={id} />;
}
