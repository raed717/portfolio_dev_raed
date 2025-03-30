const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
