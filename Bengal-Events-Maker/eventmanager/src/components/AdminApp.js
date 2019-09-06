import React,{Component} from 'react'
import {HashRouter,Switch,Route,Link} from 'react-router-dom'
import CreateEvent from './Eventcreator/CreateEvent'
import EventList from './Eventlist/EventList'
import RegistrationFrom from './RegistrationForm/RegistrationFrom'
import RegisteredUserList from './RegisteredUserList/RegisteredUserList'
import DetailEvent from './Eventlist/DetailEvent'
class AdminApp extends Component{
   

    render(){
        const style={margin:'15px',}
        return (
        <HashRouter>
            <Link to="/create" className="btn btn-info" style={style} role="button">Create Event</Link>
            <Link to="/eventlist" className="btn btn-info" role="button">Future Events</Link>
            <div className="container">
                <Switch>
                    <Route exact path="/create" component={CreateEvent}/>
                    <Route  path="/register/:id" component={RegistrationFrom}/>
                    <Route  path="/registeredUser/:id" component={RegisteredUserList}/>
                    <Route  path="/eventlist" component={EventList}/>
                    <Route  path="/detail/:id" component={DetailEvent}/>
                </Switch>
            </div>
        </HashRouter>
        
        )
    }
}

export default AdminApp;
