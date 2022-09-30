import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { randomUser } from "./redux/slices/walletSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddCard from "./pages/AddCard";


function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(randomUser());
  });
  // i parantes }, []);

  return (
    <div className="App">
      <Header />
        <Routes>
         
          <Route path="/" element={ <Home /> } />
          <Route path="/addCard" element={ <AddCard /> } />
          
        </Routes>
      <Footer />
    </div>
  );
}

export default App;

// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
        
//       </header>
//     </div>
//   );
// }

// export default App;
