import Footer from "./components/Footer";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Login from "./components/LoginForm";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChairsDesk from "./components/ChairsDesk";
import AboutUs from "./components/About";
import ContactUs from "./components/Contact";
import Events from "./components/Event";
import Newsletter from "./components/Newsletters";
import Publication from "./components/Publication";
import DLP from "./components/DLP";
import SignUp from "./components/SignupForm";
import SAR from "./components/SAR";
import { useState, useEffect } from "react";
import Profile from "./components/Profile";
import FAQ from "./components/FAQ";
import AddEvent from "./components/AddEvent";
import AddMaterial from "./components/AddMaterial";
import LogoutComp from "./components/LogoutComp";
import AddMeeting from "./components/AddMeeting";
import AddNewsletter from "./components/AddNewsletter";
import ExpertLecture from "./components/ExpertLecture";
import DetailedView from "./components/DetailedView";
import UpdateMaterial from "./components/UpdateMaterial";
import MeetingView from "./components/MeetingView";
import UpdateMeeting from "./components/UpdateMeeting";
import Dashboard from "./components/Dashboard";
import ProfessionalMembers from "./components/ProfessionalMember";
import StudentMember from "./components/StudentMember";
import FounderMembers from "./components/FounderMembers";
import UpdateNewsletter from "./components/UpdateNewsletter";
import UpdateEvent from "./components/UpdateEvent";
import Feedbacks from "./components/Feedbacks";
import Members from "./components/Members";
import AddProfile from "./components/AddProfile";
import PasswordChange from "./components/PasswordChange";
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const setLogin = (state) => setLoggedIn(state);
  return (
    <Router>
      <div className="App">
        <Navigation
          isLoggedIn={isLoggedIn}
          setLogin={(state) => setLogin(state)}
        />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/login"
            render={(routeProps) => (
              <Login
                routeProps={routeProps}
                setLogin={(state) => setLogin(state)}
              />
            )}
          />
          <Route path="/changepassword" component={PasswordChange}/>
          <Route path="/addmaterial" component={AddMaterial} />
          <Route path="/updatematerial" component={UpdateMaterial} />
          <Route path="/addevent" component={AddEvent} />
          <Route path="/chairs-desk" component={ChairsDesk} />
          <Route path="/contact" component={ContactUs} />
          <Route path="/events" component={Events} />
          <Route path="/newsletter" component={Newsletter} />
          <Route path="/publication" component={Publication} />
          <Route path="/dlp" component={DLP} />
          <Route path="/signup" component={SignUp} />
          <Route path="/addmember" component={SignUp} />
          <Route path="/sar" component={SAR} />
          <Route path="/profile" component={Profile} />
          <Route path="/addnewsletter" component={AddNewsletter} />
          <Route path="/expertlecture" component={ExpertLecture} />
          <Route path="/detailedview" component={DetailedView} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/professionalmembers" component={ProfessionalMembers} />
          <Route path="/foundermembers" component={FounderMembers}/>
          <Route path="/studentmembers" component={StudentMember} />
          <Route path="/updateevent" component={UpdateEvent}/>
          <Route path="/feedbacks"component={Feedbacks}/> 
          <Route path="/members" component={Members}/>
          <Route path="/addprofilepicture" component={AddProfile}/>
          <Route
            path="/logout"
            component={LogoutComp}
            setLogin={(state) => setLogin(state)}
          />
          <Route path="/updatenewsletter-publication" component={UpdateNewsletter}/>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
export default App;