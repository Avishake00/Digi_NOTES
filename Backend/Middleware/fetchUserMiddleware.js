var jwt = require("jsonwebtoken");
const secretKey = "avishake";

const fetchUser = (req, res, next) => {
	const token = req.header("token");
	if (!token) {
		res.status(401).send({ error: "Please authenticate a valid token" });
	}

	try {
		const data = jwt.verify(token, secretKey);
		console.log("Token decoded successfully:", data);
		req.user = data.user;
		console.log("User ID extracted from token:", req.user);

		next();
	} catch (error) {
		console.error("Token verification failed:", error);
		res.status(401).send({ error: "Please authenticate a valid token" });
	}
};

module.exports = fetchUser;
