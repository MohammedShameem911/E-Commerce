
import Navbar from './Components/Header/Navbar';
import Newnav from './Components/Newnav/Newnav';
import Maincomp from './Components/Home/Maincomp';
import "./App.css";
import Sign_in from './Components/signup_sign/Sign_in';
import SignUp from './Components/signup_sign/SignUp';
import Footer from './Components/Footer/Footer';
import Cart from './Components/Cart/Cart';
import Buynow from './Components/Buynow/Buynow';
import {Routes,Route} from "react-router-dom";

function App() {
  return (
   <>
      <Navbar/>
      <Newnav/>
      <Routes>
        <Route path="/" element={<Maincomp/>}/>
        <Route path="/login" element={<Sign_in/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/getproductsone/:id" element={<Cart/>}/>
        <Route path="/buynow" element={<Buynow/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
