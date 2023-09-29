const ConnectDB = require("./db");
const express = require("express");
const authRoute = require("./Routes/authRoute");
ConnectDB();
const app = express();
const port = 6000;
app.use(express.json());
app.use("/api/auth", authRoute);
// app.use('/api/notes',notesRoute);

app.listen(port, () => {
	console.log(`app is listening on port - ${port}`);
});
