// backend/routes/index.js
const express = require("express");
const router = express.Router();

const apiRouter = require("./api");
router.use("/api", apiRouter);

// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  router.get("/", (req, res) => {
    res.cookie("XSRF-Token", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });

  router.use(express.static(path.resolve("../frontend/build")));

  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-Token", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
} else {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-Token", req.csrfToken());
    return res.json({});
  });
}

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;