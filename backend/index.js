// import { PORT, mongoDBURL } from "./config.js";
// import mongoose from "mongoose";
// import express, { request, response } from "express";
// import studentRoutes from "./routes/studentRoutes.js";
// import cors from "cors";

// const app = express();

// //midelware for parsing request body
// app.use(express.json());

// //midelware for handling cors policy
// // app.use(cors());

// // app.use(
// //   cors({
// //     origin: `http://localhost:5173`,
// //     methods: [`GET`, "POST", "PUT", "DELETE"],
// //     allowedHeaders: ["Contant-Type"],
// //   })
// // );

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from this origin
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
//     allowedHeaders: ["Content-Type"], // Allow these headers
//   })
// );

// app.get("/", (request, response) => {
//   console.log(request);
//   return response.status(200).send("Hi this is educators web");
// });

// app.use(`/student`, studentRoutes);

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log("App Connected to mongoDB");
//     app.listen(PORT, () => {
//       console.log("Express is running now");
//     });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import express from "express";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hi, this is the educators web");
});

app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Express is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.error(e.message);
  });
