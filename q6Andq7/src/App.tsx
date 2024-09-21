import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/users" element={ <Users /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Router>
  )
}

export default App
