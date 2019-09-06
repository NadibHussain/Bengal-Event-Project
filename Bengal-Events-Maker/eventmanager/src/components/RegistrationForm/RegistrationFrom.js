import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
export default class RegistrationFrom extends Component {

    state={
        data:{},
        checkbox:new Set(),
    }

    componentDidMount(){
        var {id}=this.props.match.params;
        var authToken=localStorage.getItem("token")
        fetch("http://localhost:8000/api/event/"+id,{
            method: 'GET',
            headers:{
              Accept: 'application/json',
                       'Content-Type': 'application/json',
                       'Authorization': "Bearer " + authToken,
            }
          }).then(res=>{
            return res.json();
        }).then(data=>{
            this.setState({
                data:data
            })
        })
    }
    handlechange=(e)=>{
        
       if(e.target.type=="checkbox")
       {
          if(this.state.checkbox.has(e.target.value))
          {  
              var box=this.state.checkbox;
              box.delete(e.target.value)
              this.setState({
                [e.target.id]:box,
                checkbox:box
              })
          }
          else{
            var box=this.state.checkbox;
            box.add(e.target.value)
            this.setState({
              [e.target.id]:box,
              checkbox:box
            })
          }
           
       }
       else if(e.target.name =="select")
       {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
         var selectedOptions=new Set(value) ;
         this.setState({
             [e.target.id]:selectedOptions,
         })
       }
       else{
        this.setState({
            [e.target.id]:e.target.value 
         })
       }
        
    } 

    submitfrom=()=>{
        var keyNames = Object.keys(this.state);
        var data =[]
        for(var i in keyNames)
        {
            if(keyNames[i]!='data' && keyNames[i]!='checkbox')
            {   
                if(typeof(this.state[i])=="object")
                {
                    var array=[...this.state[i]]
                    data.push(array); 
                }
                else{
                    data.push(this.state[i]); 
                }
                
            }
            else
            {
                continue
            }
        }
        console.log(data)
        let submitdata={
            name: this.state.data.title,
            data:JSON.stringify(data),
          }
          var authToken=localStorage.getItem("token")
          fetch('http://localhost:8000/api/event/register/',{
            method:'POST',
            headers:{
              Accept: 'application/json',
                       'Content-Type': 'application/json',
                       'Authorization': "Bearer " + authToken,
               },
            body:JSON.stringify(submitdata),
          }).then(res => {
            return res.json()
          })
          .then(data => { 
           console.log(data);
           window.location.replace("http://localhost:8000/eventmanager/#/eventlist");
          })
        
    }

    render() {
        
        var {formstructure}=this.state.data    
        if(formstructure)
        {
        var json = JSON.parse(formstructure)
        const jsonLen = json.length;
        console.log(this.state)
         return json.map((item,i)=>{
           if(item.type=="text"){
               
               return (
                <div className="form-group"key={i}>
                <label htmlFor="usr">{item.label}</label>
                <input onChange={this.handlechange} type="text" className="form-control form-control-lg" id={i}/>
                {
                    (jsonLen===i+1)?
                    <div>
                    <br/>
                    <button type="button" onClick={this.submitfrom} className="btn btn-success">Submit Form</button>
                    </div>
                    :<div></div>
               }
                </div>
                
               )
              
           }
            else if(item.type=="description"){
                return (
                    <div className="form-group" key={i}>
                        <label htmlFor="comment">{item.label}</label>
                        <textarea onChange={this.handlechange} className="form-control" rows="5" id={i}></textarea>
                        {
                             (jsonLen===i+1)?
                             <div>
                             <br/>
                             <button type="button" onClick={this.submitfrom} className="btn btn-success">Submit Form</button>
                             </div>
                             :<div></div>
                        }
                    </div>
                )
               
            }
            else if(item.type=="radio"){
                return (
                    <div className="form-group" key={i}>
                        <label htmlFor="comment">{item.label}</label>
                        {
                            item.options.map((option,l)=>{
                                return (
                                    <div className="form-check"key={l}>
                                        <label className="form-check-label">
                                        <input onChange={this.handlechange} type="radio" value={option} className="form-check-input "name="optradio" id={i}/>{option}
                                        </label>
                                    </div>
                                )
                            })
                        }
                        {
                             (jsonLen===i+1)?
                             <div>
                             <br/>
                             <button type="button" onClick={this.submitfrom} className="btn btn-success">Submit Form</button>
                             </div>
                             :<div></div>
                        }
                    </div>
                )
                
            }
            else if(item.type=="checkbox"){
                return (
                    <div className="form-group" key={i}>
                        <label htmlFor="comment">{item.label}</label>
                        {
                            item.options.map((option,l)=>{
                                return (
                                    <div className="form-check"key={l}>
                                        <label className="form-check-label">
                                        <input onChange={this.handlechange} value={option} type="checkbox" className="form-check-input" id={i}/>{option}
                                        </label>
                                    </div>
                                )
                            })
                        }
                        {
                            (jsonLen===i+1)?
                            <div>
                            <br/>
                            <button type="button" onClick={this.submitfrom} className="btn btn-success">Submit Form</button>
                            </div>
                            :<div></div>
                       } 
                    </div>
                )
                
            }
            else if(item.type=="select"){
                return (
                    <div className="form-group" key={i}>
                        <label htmlFor="comment">{item.label}</label>
                        <select onChange={this.handlechange} multiple={true} className="form-control form-control-lg" id={i} name="select">
                        {
                            item.options.map((option,l)=>{
                                return (
                                    <option  value={option} key={l}>{option}</option>   
                                )
                            })
                        }
                        </select>
                        {
                             (jsonLen===i+1)?
                             <div>
                             <br/>
                             <button type="button" onClick={this.submitfrom} className="btn btn-success">Submit Form</button>
                             </div>
                             :<div></div>
                        }
                    </div>
                )
                
            }
        })
        
        }
        else{
            return (
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
        
        
       
    }
    }
