import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ShowStudent from "./pages/ShowStudent";
import CreateStudent from "./pages/CreateStudent";
import DeleteStudent from "./pages/DeleteStudent";
import EditStudent from "./pages/EditStudent";
import CreateTeacher from "./pages/CreateTeacher";
import ShowAllStudents from "./pages/ShowAllStudents";
import ShowAllTeachers from "./pages/ShowAllTeachers";
import DeleteTeacher from "./pages/DeleteTeacher";
import EditTeacher from "./pages/EditTeacher";
import ShowTeacher from "./pages/ShowTeacher";
// import ManageFee from "./pages/ManageFee";
import CreateFeeRecord from "./pages/CreateFeeRecord";
import AddStudentTest from "./pages/student/addTestRecord";
import ShowStudentTestRecords from "./pages/student/ShowStudentTests ";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student/details/:id" element={<ShowStudent />} />
      {/* <Route path="/student/details/:id/manageFee" element={<ManageFee />} /> */}
      <Route path="/student/addFeeRecord/:id" element={<CreateFeeRecord />} />
      <Route path="/student/create" element={<CreateStudent />} />
      <Route path="/student/showAllStudents" element={<ShowAllStudents />} />
      <Route path="/student/delete/:id" element={<DeleteStudent />} />
      <Route path="/student/edit/:id" element={<EditStudent />} />
      <Route path="/student/addTest/:id" element={<AddStudentTest />} />
      <Route
        path="/student/testRecords/:id"
        element={<ShowStudentTestRecords />}
      />
      <Route path="/teacher/showAllTeachers" element={<ShowAllTeachers />} />
      <Route path="/teacher/create" element={<CreateTeacher />} />
      <Route path="/teacher/delete/:id" element={<DeleteTeacher />} />
      <Route path="/teacher/edit/:id" element={<EditTeacher />} />
      <Route path="/teacher/details/:id" element={<ShowTeacher />} />
    </Routes>
  );
}

export default App;
