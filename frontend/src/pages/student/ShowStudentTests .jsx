import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/Spinner";

const ShowStudentTestRecords = () => {
  const { id } = useParams(); // Get the student ID from URL params
  const [testRecords, setTestRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/student/${id}`)
      .then((response) => {
        if (response.data && response.data.testRecords) {
          setTestRecords(response.data.testRecords);
        } else {
          console.log("Invalid response format:", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const groupTestRecordsBySubject = (testRecords) => {
    const groupedRecords = {};

    testRecords.forEach((record) => {
      if (!groupedRecords[record.subject]) {
        groupedRecords[record.subject] = [];
      }
      groupedRecords[record.subject].push(record);
    });

    return groupedRecords;
  };

  const calculatePercentage = (obtainMarks, totalMarks) => {
    return (obtainMarks / totalMarks) * 100;
  };

  const handleDeleteAllTestRecords = () => {
    axios
      .delete(`http://localhost:5555/student/${id}/test`)
      .then((response) => {
        console.log(response.data);
        // Update the testRecords state after successful deletion
        setTestRecords([]);
        navigate(`/student/details/${id}`, { replace: true });
        alert("All tests record deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to delete tests record. Please check the console.");
      });
  };

  return (
    <div style={{ padding: "4px" }}>
      <h1>Student Test Records</h1>
      {loading ? (
        <Spinner />
      ) : testRecords && testRecords.length > 0 ? (
        <div>
          <div>
            <button
              onClick={handleDeleteAllTestRecords}
              className="btn btn-danger"
            >
              Delete All Test Records
            </button>
          </div>
          {Object.entries(groupTestRecordsBySubject(testRecords)).map(
            ([subject, records]) => (
              <div key={subject} style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <h3>{subject}</h3>
                  {records.map((record, index) => (
                    <div key={index}>
                      <div>
                        <span>Test {index + 1}</span>
                      </div>
                      <div>
                        <span>Test Date: </span>
                        <span>
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>

                      <div>
                        <span>Obtained Marks: </span>
                        <span>{record.obtainMarks}</span>
                      </div>
                      <div>
                        <span>Total Marks: </span>
                        <span>{record.totalMarks}</span>
                      </div>
                      <div>
                        <span>Percentage: </span>
                        <span>
                          {calculatePercentage(
                            record.obtainMarks,
                            record.totalMarks
                          ).toFixed(2)}
                          %
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          axios
                            .delete(
                              `http://localhost:5555/student/${id}/test/${record._id}`
                            )
                            .then((response) => {
                              console.log(response.data);
                              // Update the testRecords state after successful deletion
                              setTestRecords((prevRecords) =>
                                prevRecords.filter(
                                  (rec) => rec._id !== record._id
                                )
                              );
                              alert(`Test record deleted successfully`);
                            })
                            .catch((error) => {
                              console.log(error);
                              alert(`Test record not deleted. See console`);
                            });
                        }}
                        className="btn btn-outline-danger"
                      >
                        <MdOutlineDelete />
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  <h4>{subject} Subject Summary</h4>
                  <div>
                    <span>Total Obtained Marks: </span>
                    <span>
                      {records.reduce(
                        (total, record) => total + record.obtainMarks,
                        0
                      )}
                    </span>
                  </div>
                  <div>
                    <span>Total Marks: </span>
                    <span>
                      {records.reduce(
                        (total, record) => total + record.totalMarks,
                        0
                      )}
                    </span>
                  </div>
                  <div>
                    <span>Percentage: </span>
                    <span>
                      {calculatePercentage(
                        records.reduce(
                          (total, record) => total + record.obtainMarks,
                          0
                        ),
                        records.reduce(
                          (total, record) => total + record.totalMarks,
                          0
                        )
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
          <div>
            <h3>All Subject Summary</h3>
            <div>
              <span>Total Obtained Marks: </span>
              <span>
                {testRecords.reduce(
                  (total, record) => total + record.obtainMarks,
                  0
                )}
              </span>
            </div>
            <div>
              <span>Total Marks: </span>
              <span>
                {testRecords.reduce(
                  (total, record) => total + record.totalMarks,
                  0
                )}
              </span>
            </div>
            <div>
              <span>Percentage: </span>
              <span>
                {calculatePercentage(
                  testRecords.reduce(
                    (total, record) => total + record.obtainMarks,
                    0
                  ),
                  testRecords.reduce(
                    (total, record) => total + record.totalMarks,
                    0
                  )
                ).toFixed(2)}
                %
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>No test records found</div>
      )}
    </div>
  );
};

export default ShowStudentTestRecords;
