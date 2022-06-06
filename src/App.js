import React,{Component} from "react";
import { BrowserRouter, Routes, Navigate, Route  } from "react-router-dom";
import Navbar from "./Components/Common/Navbar.Component";
import Login from './Components/Login.Component'
import PartnerAdd from './Components/PartnerAdd.Component'
import PartnerEdit from './Components/PartnerEdit.Component'
import Partner from './Components/Partner.Component'
import Home from './Components/Home.Component'
class App extends Component {
  render() {
    return (
      <div className="container">
      <BrowserRouter>
       <Navbar />
       <Routes>
         <Route path="/home" element={<Home/>} />
         <Route exact path="/login" element={<Login />} />
         <Route exact path="/partner" element={<Partner />} />
         <Route exact path="/partner/create" element={<PartnerAdd />} />
         <Route exact path="/partner/:id/edit" element={<PartnerEdit />} />
         {/* <Route exact path="/" render={() => alert("Its Coming Home")} />
         <Navigate to="/not-found"/> */}
       </Routes>
     </BrowserRouter>
 </div>
    )
  }
}


export default App;
