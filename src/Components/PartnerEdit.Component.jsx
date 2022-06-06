import React, { Component } from "react";
import Form from "./Common/Form.Component";
import Input from "./Common/Input.Component";
import { update, show } from "../service/partnerService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

class PartnerEdit extends Form {
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
    await update(this.props.param, data);
    console.log(this.props);
    this.props.navigation("/partner");
  };
  async componentDidMount() {
    let httpResponse = await show(this.props.param);
    let {
      data: { data: partner },
    } = httpResponse;
    let prevData = { ...this.state.data };
    let newData = {
      ...prevData,
      name: partner.name,
      location: partner.location,
    };
    this.setState({
      data: newData,
    });
  }
  render() {
    const { name, location } = this.state.data;
    const { errors, partner } = this.state;
    return (
      <>
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
                Update
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
  return <PartnerEdit {...props} navigation={navigation} param={id} />;
}