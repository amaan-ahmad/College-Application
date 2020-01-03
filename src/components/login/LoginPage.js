import React,{Component,useState} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {LoginContext} from "../../App"

export default class LoginPage extends Component{
    constructor(props)
    {
      super(props);
      this.state={
        loginId:"",
        password:"",
        email:"",
        blocked:false
      }
      
    }
    login=(context)=>{
       axios.post("http://localhost:1337/auth/local",{
        identifier:this.state.email,
        password:this.state.password,
      }).then(data=>{
        localStorage.setItem('token',data.data.jwt);
        console.log(data.data.jwt);
        localStorage.setItem('id',data.data.username);
        if(data.data.student)
        { 
          context.changeState("student",data.data.username)
        }
        else if(data.data.teacher)
        {
          context.changeState("teacher",data.data.username);
        }
        else{
          context.changeState("admin",data.data.username);
        }
        //this.props.changeView();
      })
      .catch(err=>{
        console.log(this.state);
        console.log(err);
      })

    }
    render()
    {
        return(
            <div className="loginPage">
            <div data-test="header" style={{height:"100px",display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
              <div style={{display:"flex"}}>
              <img data-test="logo" style={{height:"35px",margin:"20px"}} src="http://www.bpitindia.com/images/logo.png"></img>
              <h3  data-test="heading" style={{color:"#44469e",fontWeight:400,fontSize:"30px"}}>BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY</h3>
              </div>
              <div data-test="side-logo" style={{display:"flex",width:"25vw",alignItems:"flex-end"}}>
              <img style={{height:"100px"}} src="http://www.bpitindia.com/images/brahim-smaaj.png"></img>
              <p style={{fontSize:"20px",color:"#ee1c26"}} >BHARTIYA BRAHMIN CHARITABLE TRUST</p>  
              </div>
            </div>
            <div className="loginBackground" data-test="login-background">
            {
              this.props.signup?(
                <Card data-test="signup-card" style={{width:"40%",margin:"0 auto"}}>
                <CardContent>
                  <p data-test="signup-heading" style={{textAlign:"center",fontWeight:"500",fontSize:"20px"}}>Signup Page</p>
                  <TextField 
                    data-test="signup-username"
                    style={{width:"100%"}}
                    id="filled-name"
                    label="Enrollment Number"
                    margin="normal"
                    variant="filled"
                    value={this.state.loginId}
                    onChange={(e)=>{this.setState({loginId:e.target.value})}}

                  />
                  <TextField
                    data-test="signup-password"
                    style={{width:"100%"}}
                    id="filled-name"
                    label="Login Password"
                    margin="normal"
                    variant="filled"
                    value={this.state.password}
                    onChange={(e)=>{this.setState({password:e.target.value})}}
                  />
                </CardContent>
                <CardActions>
                <Button data-test="signup-button" onClick={console.log(this.state)} variant="contained" style={{display:"block",margin:"0 auto"}} color="primary" >Sign In</Button>
                </CardActions>
              </Card>
                ):(
                <Card style={{width:"40%",margin:"0 auto"}} data-test="login-card">
                <CardContent>
                  <p data-test="login-heading" style={{textAlign:"center",fontWeight:"500",fontSize:"20px"}}>Login Here</p>
                  <div  data-test="login-loginId">
                  <TextField
                    style={{width:"100%"}}
                    id="filled-name"
                    label="Email Id"
                    margin="normal"
                    variant="filled"
                    value={this.state.email}
                    onChange={(event)=>{this.setState({email:event.target.value})}}
                  />     
                  </div>
                  <TextField
                    data-test="login-password"
                    style={{width:"100%"}}
                    id="filled-name"
                    label="Login Password"
                    margin="normal"
                    variant="filled"
                    value={this.state.password}
                    onChange={(event)=>{this.setState({password:event.target.value})}}
                    type="password"
                  />
                </CardContent>
                <CardActions>
                <LoginContext.Consumer>
                  {(context)=>(
                <Button variant="contained" data-test="login-button"  onClick={()=>{this.login(context)}} style={{display:"block",margin:"0 auto"}} color="primary" >Login</Button>
                )}
                </LoginContext.Consumer>
  
                </CardActions>
              </Card>  
              )
            }
            </div>
          </div>
        )
        
    }
}
