import React from "react";
import ProjectNavigation from "../ProjectNavigation";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./MyDocuments.css";
import { useNavigate } from "react-router-dom";

const MyDocuments = () => {
  const [salarySlip, setSalarySlip] = useState([]);
  const navigate = useNavigate();
  const [appointmentLetter, setAppointmentLetter] = useState([]);
  const [joiningletter, setJoiningLetter] = useState([]);
  const [incrementLetter1, setIncrementLetter1] = useState([]);

  let salaryEmployee1 = localStorage.getItem("LoginData");
  let salaryEmployee2 = JSON.parse(salaryEmployee1);
  // console.log(salaryEmployee2);

  // const salarySubmit = (ele1) => {
  //   navigate("/employee-salaryslip");
  //   localStorage.setItem("SalarySlip", JSON.stringify(ele1));
  // };

  const appointmentSubmit = (ele2) => {
    navigate("/employee-appointment-letter");
    localStorage.setItem("apptLetter", JSON.stringify(ele2));
  };

  const joiningSubmit = (ele3) => {
    navigate("/employee-joining-letter");
    localStorage.setItem("joiningLetter", JSON.stringify(ele3));
  };

  const incrementSubmit = (ele4) => {
    navigate("/employee-increment-letter");
    localStorage.setItem("incrementLetter", JSON.stringify(ele4));
  };

  useEffect(() => {
    axios.get("http://localhost:8087/salaryslips").then((response) => {
      setSalarySlip(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8087/appointments").then((response) => {
      setAppointmentLetter(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8087/joiningLetters").then((response) => {
      setJoiningLetter(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8087/increments").then((response) => {
      setIncrementLetter1(response.data);
    });
  }, []);

  return (
    <>
      <ProjectNavigation />
      <div className="mainFlex">
        {appointmentLetter.map((ele) => {
          if (ele.employeeId == salaryEmployee2.employeeId) {
            return (
              <>
                {/* <div className="projectCard" style={{ marginTop: "10px" }}>
                  <Card>
                    <Card.Header className="cardHeader">
                      {" "}
                      Salary Slips Date : {ele.monthDate}
                    </Card.Header>

                    <Card.Body>
                      <Card.Title>Employee Name:</Card.Title>
                      <Card.Text> {salaryEmployee2.employeeName} </Card.Text>
                      <Card.Title>Employee Id: </Card.Title>
                      <Card.Text> {ele.employeeId} </Card.Text>
                      <button
                        className="projectButton"
                        onClick={() => {
                          //salarySubmit(ele);
                          navigate("/get-salaryslips");
                        }}
                      >
                        DOWNLOAD
                      </button>
                    </Card.Body>
                  </Card>
                </div> */}
                <div className="projectCard">
                  <Card>
                    <Card.Header className="cardHeader">
                      ALL SALARY SLIPS
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Employee Name:</Card.Title>
                      <Card.Text> {salaryEmployee2.employeeName} </Card.Text>
                      <Card.Title>Employee Id: </Card.Title>
                      <Card.Text> {ele.employeeId} </Card.Text>
                      <button
                        className="projectButton"
                        onClick={() => {
                          navigate("/get-salaryslips");
                        }}
                      >
                        VIEW SALARY SLIPS
                      </button>
                    </Card.Body>
                  </Card>
                </div>

                <div className="projectCard" style={{ marginTop: "10px" }}>
                  <Card>
                    <Card.Header className="cardHeader">
                      {" "}
                      Appointment Letter{" "}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Employee Name:</Card.Title>
                      <Card.Text> {salaryEmployee2.employeeName} </Card.Text>
                      <Card.Title>Employee Id: </Card.Title>
                      <Card.Text> {ele.employeeId} </Card.Text>
                      <button
                        className="projectButton"
                        onClick={() => {
                          appointmentSubmit();
                        }}
                      >
                        DOWNLOAD
                      </button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="projectCard" style={{ marginTop: "10px" }}>
                  <Card>
                    <Card.Header className="cardHeader">
                      {" "}
                      Joining Letter{" "}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Employee Name:</Card.Title>
                      <Card.Text> {salaryEmployee2.employeeName} </Card.Text>
                      <Card.Title>Employee Id: </Card.Title>
                      <Card.Text> {ele.employeeId} </Card.Text>
                      <button
                        className="projectButton"
                        onClick={() => {
                          joiningSubmit();
                        }}
                      >
                        DOWNLOAD
                      </button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="projectCard" style={{ marginTop: "10px" }}>
                  <Card>
                    <Card.Header className="cardHeader">
                      {" "}
                      Increment Letter{" "}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Employee Name:</Card.Title>
                      <Card.Text> {salaryEmployee2.employeeName} </Card.Text>
                      <Card.Title>Employee Id: </Card.Title>
                      <Card.Text> {ele.employeeId} </Card.Text>
                      <button
                        className="projectButton"
                        onClick={() => {
                          incrementSubmit();
                        }}
                      >
                        DOWNLOAD
                      </button>
                    </Card.Body>
                  </Card>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
};

export default MyDocuments;
