import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ShowAllTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/teacher`)
      .then((response) => {
        setTeachers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredTeachers(
      teachers.filter((teacher) =>
        teacher.subject.toLowerCase().includes(nameFilter.toLowerCase())
      )
    );
  }, [teachers, nameFilter]);

  const handleSubjectFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  return (
    <div style={{ padding: "4px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Teachers List</h1>
        <div>
          <input
            type="text"
            placeholder="Filter by Subject"
            value={nameFilter}
            onChange={handleSubjectFilterChange}
            style={{ marginRight: "10px" }}
          />
          <Link to="/teacher/create" style={{ fontSize: "1.5rem" }}>
            <MdOutlineAddBox />
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Age</th>
              <th scope="col">Phone No</th>
              <th scope="col">Address</th>
              <th scope="col">Qualification</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher, index) => (
              <tr key={teacher._id}>
                <th scope="row">{index + 1}</th>
                <td>{teacher.name}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.age}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.address}</td>
                <td>{teacher.qualification}</td>
                <td>
                  <Link to={`/teacher/details/${teacher._id}`}>
                    <BsInfoCircle />
                  </Link>
                  <Link to={`/teacher/edit/${teacher._id}`}>
                    <AiOutlineEdit />
                  </Link>
                  <Link to={`/teacher/delete/${teacher._id}`}>
                    <MdOutlineDelete />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowAllTeachers;
