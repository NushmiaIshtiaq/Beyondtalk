import React, { Component } from "react";
import { Row, Col, Card, Button, Divider, Spin, Icon, Tag } from "antd";

// Components
import AdminNavbar from "../NavBar/AdminNavbar";
import { DescriptionItem, pStyle } from "./helper";

// Services
import { ViewProfile } from "../../services/profile.service";
import config from "../../util/config.json";
import { getCurrentUser } from "../../services/auth.service";
import moment from "moment";

const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      contactNo: null,
      mailingAddress: null,
      about: null,
      age: null,
      designation: null,
      gender: null,
      permenantAddress: null,
      date: null,
      selectedImage: null,
      email: null,
      loading: false,
      editMessage: null,
    };
  }

  componentWillMount() {
    const user = getCurrentUser();
    ViewProfile().then((response) => {
      const profileInformation = response.data.userData;
      if (profileInformation.updateProfile) {
        this.setState({
          name: profileInformation.name,
          contactNo: profileInformation.contactNo,
          mailingAddress: profileInformation.mailingAddress,
          about: profileInformation.about,
          age: profileInformation.age,
          designation: profileInformation.designation,
          gender: profileInformation.gender,
          permenantAddress: profileInformation.permenantAddress,
          date: moment(profileInformation.joiningDate, "YYYY/MM/DD"),

          selectedImage: `${config.STORAGE_LINK}/${config.BUCKET_NAME}/${profileInformation.imageUrl}`,
          email: user.user.email,
          loading: true,
        });
      } else {
        this.setState({
          editMessage:
            "Please Fill Your Profile Information by Updating Profile Information",
          loading: true,
        });
      }
    });
  }
  onUpdateProfile = () => {
    this.props.history.push("/updateprofile");
  };

  render() {
    return (
      <React.Fragment>
        <Row style={{ padding: "1%" }}>
          <Col span={1}></Col>
          <Col span={5}>
            <img src="BTLOGO.png" className="main_image"></img>
          </Col>
          <Col span={1}></Col>
          <Col span={16}>
            <AdminNavbar {...this.props} activeValue="profile"></AdminNavbar>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={22}>
            <Card
              title="My Profile"
              extra={
                <Button
                  type="primary"
                  shape="round"
                  icon="user-add"
                  size="default"
                  onClick={this.onUpdateProfile}
                >
                  Edit Profile
                </Button>
              }
            >
              {this.state.loading ? (
                <React.Fragment>
                  {this.state.editMessage === null ? (
                    <React.Fragment>
                      <Row>
                        <Col span={11} style={{ paddingTop: "2rem" }}>
                          <p
                            style={{
                              marginLeft: "8",
                              display: "block",
                              color: "rgb(61, 245, 236, 1)",
                            }}
                          >
                            <b>Profile Picture</b>
                          </p>
                          <img
                            src={this.state.selectedImage}
                            className="img-thumbnail"
                            alt="Profile Picture"
                            style={{ height: "20rem", width: "20rem" }}
                          />
                        </Col>
                        <Col span={1}>
                          <Divider
                            type="vertical"
                            style={{ width: "3px", height: "25rem" }}
                          ></Divider>
                        </Col>
                        <Col span={12}>
                          <h1>
                            <b>
                              <Tag color={"rgb(61, 245, 236, 1)"}>
                                {this.state.designation}
                              </Tag>
                            </b>
                          </h1>
                          <DescriptionItem
                            title="Full Name"
                            content={this.state.name}
                          />
                          <DescriptionItem
                            title="Email"
                            content={this.state.email}
                          />
                          <DescriptionItem
                            title="Mailing Address"
                            content={this.state.mailingAddress}
                          />
                          <DescriptionItem
                            title="Permenant Address"
                            content={this.state.permenantAddress}
                          />
                          <DescriptionItem
                            title="Contact No"
                            content={this.state.contactNo}
                          />
                          <DescriptionItem
                            title="Age - Gender"
                            content={this.state.age + " - " + this.state.gender}
                          />

                          <DescriptionItem
                            title="Joining Date"
                            content={
                              this.state.date &&
                              this.state.date.format("YYYY-MM-DD")
                            }
                          />
                          <DescriptionItem
                            title="About"
                            content={this.state.about}
                          />
                        </Col>
                      </Row>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Row>
                        <h3>{this.state.editMessage}</h3>
                      </Row>
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Row style={{ textAlign: "center" }}>
                    <Spin indicator={antIcon} size={"large"} />
                  </Row>
                </React.Fragment>
              )}
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
