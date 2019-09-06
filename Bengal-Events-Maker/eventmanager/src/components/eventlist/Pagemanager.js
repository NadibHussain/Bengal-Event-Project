import React, { Component } from 'react'

export default class Pagemanager extends Component {

  buttonmanager=(x) =>{
    console.log(x)
  }

  getCurrentpageNumber=(next,previous) => {
    if(!next && !previous)
    {
        return 1;
    }
    else if(next != null)
    {
        var nextpage=next.slice(38);
        return parseInt(nextpage)-1
    }
    else if(previous != null)
    {
        if(previous.includes("page"))
        {
        var previouspage=previous.slice(38)
        return parseInt(previouspage)+1
        }
        else{
            return 2;
        }
    }
    
}

    nextpage=()=>{
        this.props.getdata(this.props.next)
    }
    prevpage=()=>{
        this.props.getdata(this.props.previous)
       
    }

    
    render() {
     
     
     var total = Math.ceil(this.props.count/3);
     var {next} = this.props;
     var {previous} = this.props;
     var current = this.getCurrentpageNumber(next,previous);
     if(next==null && previous==null)
     {
         return (
             <div id="page-buttons">
            <button className="btn btn-secondary" onClick={this.prevpage} disabled >previous</button> 
            <span className="current">
                Page {" "} {current} of {total}
            </span>   
            <button className="btn btn-secondary" onClick={this.nextpage}disabled>next</button>  
            </div>
         )
     }
     else if (previous==null)
     {
         return(
             <div id="page-buttons">
                <button className="btn btn-secondary" onClick={this.prevpage}disabled >previous</button>  
                {" "}  
                <span className="current">
                    Page  {current} of {total}
                </span>  
                {" "} 
                <button className="btn btn-primary" onClick={this.nextpage}>next</button> 
            </div>
         )
     }
     else if (next==null)
     {
         return(
             <div id="page-buttons">
                <button className="btn btn-primary" onClick={this.prevpage} >previous</button> 
                {" "}  
                <span className="current">
                    Page  {current} of {total}
                </span> 
                {" "}  
                <button className="btn btn-secondary" onClick={this.nextpage}disabled >next</button> 
            </div>
         )
     }
     else
     {
        return(
            <div id="page-buttons">
               <button className="btn btn-primary" onClick={this.prevpage} >previous</button> 
               {" "}   
               <span className="current">
                   Page {current} of {total}
               </span> 
               {" "}    
               <button className="btn btn-primary" onClick={this.nextpage} >next</button> 
           </div>
        ) 
     }
  }
}
