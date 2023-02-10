import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ProjectNavigation from "./ProjectNavigation";
import "./MyProfile.css";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import LockIcon from "@mui/icons-material/Lock";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState([]);
  const [pageset, setPageSet] = useState(true);
  const [oldpassword, setoldpassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const [confirmPassword, setconfirmPassword] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8085/employees").then((response) => {
      setMyProfile(response.data);
    });
  }, []);

  let empDetails = localStorage.getItem("LoginData");
  let empData = JSON.parse(empDetails);
  function passwoordreset() {
    setPageSet(false);
  }

  function close() {
    setPageSet(true);
  }

  function pass(e) {
    setnewPassword(e.target.value);
  }
  function pass1(e) {
    setconfirmPassword(e.target.value);
  }

  function pass2(e) {
    setoldpassword(e.target.value);
  }

  function submit(event) {
    event.preventDefault();
    myProfile.map((ele) => {
      if (ele.emailId == empData.emailId) {
        if (ele.password == oldpassword) {
          if (newPassword == confirmPassword) {
            let element = ele;
            element = { ...element, password: newPassword };
            axios
              .put(
                `http://localhost:8085/employee/update/${element.employeeId}`,
                element
              )
              .then((res) => {
                console.log(res);
                alert("Password Changed", window.location.reload());
              });
          } else {
            alert("Password and Confirm Password Should be same");
          }
        } else {
          alert("Wrong old password");
        }
      }
    });
  }
  return (
    <>
      <ProjectNavigation />

      {pageset == true ? (
        myProfile.map((ele) => {
          if (ele.emailId == empData.emailId) {
            // console.log("Same Employee");
            return (
              <>
                <section
                  className="vh-100"
                  style={{ backgroundColor: "#f4f5f7" }}
                >
                  <MDBContainer className="py-4 h-800">
                    <MDBRow className="justify-content-center align-items-center h-100">
                      <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard
                          className="mb-3"
                          style={{ borderRadius: ".5rem" }}
                        >
                          <MDBRow className="g-0">
                            <MDBCol
                              md="4"
                              className="gradient-custom text-center text-white"
                              style={{
                                borderTopLeftRadius: ".5rem",
                                borderBottomLeftRadius: ".5rem",
                              }}
                            >
                              <MDBCardImage
                                src={ele.profile}
                                alt="Avatar"
                                className="my-5"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  borderRadius: "5px",
                                }}
                                fluid
                              />
                              <MDBTypography
                                tag="h5"
                                style={{ color: "black" }}
                              >
                                {ele.employeeName}
                              </MDBTypography>
                              <MDBCardText style={{ color: "black" }}>
                                {ele.designation}
                              </MDBCardText>
                              <MDBIcon far icon="edit mb-5" />
                            </MDBCol>
                            <MDBCol md="8">
                              <MDBCardBody className="p-4">
                                <MDBTypography tag="h6">
                                  Employee Details
                                </MDBTypography>
                                <hr className="mt-0 mb-4" />
                                <MDBRow className="pt-1">
                                  <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h6">
                                      Employee Id
                                    </MDBTypography>
                                    <MDBCardText className="text-muted"></MDBCardText>
                                    {ele.employeeId}
                                  </MDBCol>
                                  <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h6"></MDBTypography>
                                    <MDBCardText className="text-muted"></MDBCardText>
                                  </MDBCol>
                                </MDBRow>

                                <MDBTypography tag="h6">
                                  Contact Details
                                </MDBTypography>
                                <hr className="mt-0 mb-4" />
                                <MDBRow className="pt-1">
                                  <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h6">
                                      Email
                                    </MDBTypography>
                                    <MDBCardText className="text-muted">
                                      {ele.emailId}
                                    </MDBCardText>
                                  </MDBCol>
                                  <MDBCol size="6" className="mb-3">
                                    <MDBTypography tag="h6">
                                      Mobile Number
                                    </MDBTypography>
                                    <MDBCardText className="text-muted">
                                      {ele.mobileNo}
                                    </MDBCardText>
                                  </MDBCol>
                                </MDBRow>

                                <div className="d-flex justify-content-start">
                                  <a href="#!">
                                    <MDBIcon
                                      fab
                                      icon="facebook me-3"
                                      size="lg"
                                    />
                                  </a>
                                  <a href="#!">
                                    <MDBIcon
                                      fab
                                      icon="twitter me-3"
                                      size="lg"
                                    />
                                  </a>
                                  <a href="#!">
                                    <MDBIcon
                                      fab
                                      icon="instagram me-3"
                                      size="lg"
                                    />
                                  </a>
                                </div>
                              </MDBCardBody>
                            </MDBCol>
                          </MDBRow>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      id="btnlogin"
                      style={{ backgroundColor: "#AE275F" }}
                      onClick={passwoordreset}
                    >
                      Change Password
                    </Button>
                  </MDBContainer>
                </section>
              </>
            );
          }
        })
      ) : (
        <>
          <div
            style={{
              border: "1px solid black",
              width: "400px",
              marginLeft: "40%",
              textAlign: "center",
              marginTop: "80px",
              padding: "20px",
            }}
          >
            <div style={{ textAlign: "right" }} onClick={close}>
              <CloseIcon />
            </div>
            <LockIcon />
            <label>Old Password</label>
            <input type="password" onChange={pass2} />
            <LockIcon />
            <label>Enter New Password</label>
            <input type="password" onChange={pass} />
            <LockIcon />
            <label>Renter Password</label>
            <input type="password" onChange={pass1} />

            <button
              style={{
                borderRadius: "5px",
                backgroundColor: "#AE275F",
                color: "white",
                width: "200px",
              }}
              onClick={submit}
            >
              Reset Password
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default MyProfile;
