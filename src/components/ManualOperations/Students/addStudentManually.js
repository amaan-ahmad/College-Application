import React, { Component } from "react";
import axios from "axios";
import {RedditTextField} from "../../FormElements/GeneralInput";
import {inputArrayFields} from "./ADDSTUDENTMANUALDATA";
import {selectArrayFields} from "./ADDSTUDENTMANUALDATA";
import {dateArrayField} from "./ADDSTUDENTMANUALDATA";
import backendDetails from "../../../config/backendConnectivity";

class AddStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrollmentNo: "",
      year: "",
      section: "",
      group: "",
      studentName: "",
      fatherName: "",
      motherName: "",
      phoneNo: "",
      fatherPhoneNo: "",
      emailId: "",
      fatherEmailId: "",
      branch:'',
      rollNo:'',
      courseId: '',
      semester:'',
      gender: '',
      dob:'',
      aggregate:'' ,
      activeBacklogs:'' ,
      placed:'' ,
      companyName:'',
      tenPercentage:'',
      twelfthPercentage:'',
      diploma: '',
      gap: '',
      enteranceRank:'' ,
      resumeUrl: '',
      blockedFromDrive:'' ,
      libraryId:'' ,
      libraryFine:'' 
    };
  }

  showTheValue=(e)=>
  {
    console.log(e.target.value);
  }
  onChange(e,name) {
    this.setState({ [name]: e.target.value });
  }
  submitDetails = () => {
    console.log(backendDetails.baseUrl+"/students");
    axios.post(backendDetails.baseUrl+"/students", {
      ...this.state
      })
      .then(data => {
            alert("data uploaded successfully");
      })
      .catch(err => {
        console.log(this.state);
        alert("error");
        console.log("this is the following error", err);
      });
  };
  render() {
    return (
      <div style={{overflowY:"scroll",height:"650px"}}>
      {
        inputArrayFields.map(textField=>{
        return (
          <RedditTextField
          onChange={(e)=>{this.onChange(e,textField.changeFields)}}
          label={textField.name}
          defaultValue=""
          variant="filled"
          id="reddit-input"
          />
        )
        })
      }
      {
      dateArrayField.map(dateElement=>{
        return(
          <RedditTextField
              onChange={(e)=>{this.onChange(e,dateElement.changeFields)}}
              label={dateElement.name}
              value={this.state[dateElement.changeFields]}
              defaultValue=""
              variant="filled"
              id="reddit-input"
              type="date"/>
            )
        }) 
      }
      {
        selectArrayFields.map(selectFields=>{
          return(
            <select style={{width:"95%",margin:"20px auto",height:"4vw"}}  data-test="branch-input" onChange={(e)=>{this.onChange(e,selectFields.changeFields)}} class="form-control">
            <option>{selectFields.name}</option>
            {
            selectFields.options.map(option=>{
              return(
                <option>{option}</option>
              )
            })
            }
            </select>
          )
        })
      }

        <div data-test="submit-section" class="form-group input-block">
          <button data-test="submit-button" className="btn btn-info " onClick={this.submitDetails}>
            Submit Student
          </button>
        </div>
      </div>
    );
  }
}
export default AddStudents;