// project/ec2-web/routes/index.js
var express = require("express");
var router = express.Router();

const {
  getInstanceList,
  startInstance,
  stopInstance,
  rebootInstance,
  getImageList,
  getSecurityGroupList,
  runInstance,
  getAvailabilityZoneList,
  getRegionList,
} = require("../../ec2-controller");

router.get("/", function (req, res, next) {
  getInstanceList(function (err, instanceList) {
    res.render("index", { instanceList });
  });
});

router.get("/create", function (req, res) {
  getSecurityGroupList(function (err, securityGroupList) {
    getImageList(function (err, imageList) {
      res.render("create", { imageList, securityGroupList });
    });
  });
});

router.post("/instance", function (req, res, next) {
  const { ImageId, SecurityGroupId, InstanceName } = req.body;
  runInstance(
    { ImageId, SecurityGroupId, InstanceName },
    function (err, result) {
      res.redirect("/");
    }
  );
});

router.get("/region", function (req, res, next) {
  getRegionList(function (err, regions) {
    res.render("region", { regions });
  });
});

router.get("/zone", function (req, res, next) {
  getAvailabilityZoneList(function (err, zones) {
    res.render("zone", { zones });
  });
});
router.post("/instance/start", function (req, res, next) {
  startInstance(req.body.InstanceId, function (err, result) {
    res.json(result);
  });
});

router.post("/instance/stop", function (req, res, next) {
  stopInstance(req.body.InstanceId, function (err, result) {
    res.json(result);
  });
});

router.post("/instance/reboot", function (req, res, next) {
  rebootInstance(req.body.InstanceId, function (err, result) {
    res.json(result);
  });
});

module.exports = router;
