import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
class App extends Component{
    state={
        username:"",
        password:"",
        redirect:false,
    }
    
    onchange =(e) =>
    {   
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    onsubmit=(e)=>
    {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password:this.state.password
          };
        axios.post("http://localhost:8000/api/user/login/",user).
        then(res =>{
            console.log(res);
            this.gettoken();
            
            ;
        })
    }

    gettoken=()=>{
        const user = {
            username: this.state.username,
            password:this.state.password
          };
        
        axios.post("http://localhost:8000/api/token/",user).
        then(res =>{
            localStorage.setItem("token",res.data.access)
            localStorage.setItem("refresh",res.data.refresh)
            window.location.replace("http://localhost:8000/eventmanager/")
        });
    }

    render(){
       
        const style ={
            textAlign:"center"
        }
        //console.log(this.state);
        return (
            <div>
             <h1 className="title">Login</h1>
            <form action="/accounts/signup/" method="POST" id="signup" >
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={this.onchange}/> 
                </div>
                
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={this.onchange}/> 
                    </div>
                    
                <br/>
                    <input onClick={this.onsubmit} type="button" id="submit" value="Login" className="btn btn-primary"/>
                </form>
                <div style={style}>
                <br/>
                <p>Not registered?<a href="{% url 'accounts:signup' %}">  Signup</a></p>
                </div> 
            </div>
        )
    }
}

export default App;
