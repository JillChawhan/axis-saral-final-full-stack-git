import axios from "axios";
import React, { useEffect, useState } from "react";
import ProjectNavigation from "../ProjectNavigation";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./GetSalarySlips.css";

const GetSalarySlips = () => {
  const [slips, setSlips] = useState([]);
  const navigate = useNavigate();

  let salarySlipsAll1 = localStorage.getItem("LoginData");
  let salarySlipsAll2 = JSON.parse(salarySlipsAll1);

  const salarySubmit = (ele1) => {
    navigate("/employee-salaryslip");
    localStorage.setItem("SalarySlip", JSON.stringify(ele1));
  };

  useEffect((slip1) => {
    axios.get("http://localhost:8087/salaryslips").then((response) => {
      setSlips(response.data);
    });
  }, []);

  return (
    <>
      <ProjectNavigation />
      <div className="mainFlex">
        {slips.map((ele) => {
          if (ele.employeeId == salarySlipsAll2.employeeId) {
            return (
              <>
                <div className="projectCard" style={{ marginTop: "10px" }}>
                  <Card>
                    <Card.Header className="cardHeader">
                      {" "}
                      Salary Slips Date : {ele.monthDate}
                    </Card.Header>

                    <Card.Body>
                      <Card.Title>Employee Name:</Card.Title>
                      <Card.Text> {salarySlipsAll2.employeeName} </Card.Text>
                      <Card.Title>Employee Id: </Card.Title>
                      <Card.Text> {ele.employeeId} </Card.Text>
                      <button
                        className="projectButton"
                        onClick={() => {
                          salarySubmit(ele);
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

export default GetSalarySlips;
