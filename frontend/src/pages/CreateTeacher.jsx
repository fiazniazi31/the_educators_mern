// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BackButton from "../components/BackButton";
// import Spinner from "../components/Spinner";

// const CreateTeacher = () => {
//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [age, setAge] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [qualification, setQualification] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [passwordError, setPasswordError] = useState("");
//   const [usernameError, setUsernameError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // const handelSaveTeacher = () => {
//   //   // Validate password
//   //   if (password.length < 8) {
//   //     setPasswordError("Password must be at least 8 characters");
//   //     return;
//   //   } else {
//   //     setPasswordError("");
//   //   }

//   //   // Validate username
//   //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   //   if (!emailPattern.test(username)) {
//   //     setUsernameError("Username must be in email format");
//   //     return;
//   //   } else {
//   //     setUsernameError("");
//   //   }

//   //   const data = {
//   //     name: name,
//   //     subject: subject,
//   //     age: age,
//   //     phone: phone,
//   //     address: address,
//   //     qualification: qualification,
//   //     username: username,
//   //     password: password,
//   //     type: "teacher",
//   //   };

//   //   setLoading(true);
//   //   axios
//   //     .post(`http://localhost:5555/teacher`, data)
//   //     .then(() => {
//   //       setLoading(false);
//   //       navigate("/home");
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //       alert("Please Check Colsole");
//   //       setLoading(false);
//   //     });
//   // };

//   const handelSaveTeacher = () => {
//     // Validate password
//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters");
//       return;
//     } else {
//       setPasswordError("");
//     }

//     // Validate username
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(username)) {
//       setUsernameError("Username must be in email format");
//       return;
//     } else {
//       setUsernameError("");
//     }

//     const data = {
//       name: name,
//       subject: subject,
//       age: age,
//       phone: phone,
//       address: address,
//       qualification: qualification,
//       username: username,
//       password: password,
//     };

//     setLoading(true);
//     axios
//       .post(`http://localhost:5555/teacher`, data)
//       .then(() => {
//         setLoading(false);
//         navigate("/home");
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("Please Check Console");
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="d-flex flex-column align-items-center justify-content-center">
//       <div className="w-100" style={{ maxWidth: "600px" }}>
//         <BackButton />
//         <h1 className="text-center">Create Teacher</h1>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="subject" className="form-label">
//             Subject
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="subject"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="age" className="form-label">
//             Age
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="phone" className="form-label">
//             Phone
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="address" className="form-label">
//             Address
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="qualification" className="form-label">
//             Qualification
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="qualification"
//             value={qualification}
//             onChange={(e) => setQualification(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">
//             Username
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           {usernameError && <div className="text-danger">{usernameError}</div>}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <div className="input-group">
//             <input
//               type={showPassword ? "text" : "password"}
//               className="form-control"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               className="btn btn-outline-secondary"
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//           {passwordError && <div className="text-danger">{passwordError}</div>}
//         </div>
//         <div className="d-grid">
//           <button
//             className="btn btn-primary mx-auto"
//             type="button"
//             onClick={handelSaveTeacher}
//             style={{ width: "150px" }}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateTeacher;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const CreateTeacher = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveTeacher = () => {
    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    } else {
      setPasswordError("");
    }

    // Validate username
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(username)) {
      setUsernameError("Username must be in email format");
      return;
    } else {
      setUsernameError("");
    }

    const data = {
      name: name,
      subject: subject,
      age: age,
      phone: phone,
      address: address,
      qualification: qualification,
      username: username,
      password: password,
      type: "teacher",
    };

    setLoading(true);
    axios
      .post(`http://localhost:5555/teacher`, data)
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        alert("Please Check Console");
        setLoading(false);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <BackButton />
        <h1 className="text-center">Create Teacher</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="qualification" className="form-label">
            Qualification
          </label>
          <input
            type="text"
            className="form-control"
            id="qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="email"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <div className="text-danger">{usernameError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {passwordError && <div className="text-danger">{passwordError}</div>}
        </div>
        <div className="d-grid">
          <button
            className="btn btn-primary"
            onClick={handleSaveTeacher}
            disabled={loading}
          >
            {loading ? "Loading..." : "Save Teacher"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacher;
