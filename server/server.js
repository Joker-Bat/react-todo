const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// Connect to DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully Connected to Database. :)"))
  .catch((err) => console.log("Error in Database Connection", err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
