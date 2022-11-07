import { BrowserRouter, Routes, Route } from "react-router-dom";
import Staff from "./pages/Staff";
import AddStaff from "./pages/AddStaff";
import UpdateStaff from "./pages/UpdateStaff";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<Staff />} />
          <Route path='/AddStaff' element={<AddStaff />} />
          <Route path='/UpdateStaff/:id' element={<UpdateStaff />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
