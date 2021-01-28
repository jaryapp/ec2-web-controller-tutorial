const AWS = require("aws-sdk");
const config = require("./config.json");
AWS.config = config;

const ec2 = new AWS.EC2();

module.exports = {
  getInstanceList(callback) {
    ec2.describeInstances(function (err, data) {
      if (err) console.log(err);
      callback(
        err,
        data.Reservations.map((reservation) => reservation.Instances[0])
      );
    });
  },
  getAvailabilityZoneList(callback) {
    ec2.describeAvailabilityZones(function (err, data) {
      if (err) console.log(err);
      callback(err, data.AvailabilityZones);
    });
  },
  startInstance(InstanceId, callback) {
    ec2.startInstances({ InstanceIds: [InstanceId] }, function (err, data) {
      if (err) console.log(err);
      callback(err, data);
    });
  },
  stopInstance(InstanceId, callback) {
    ec2.stopInstances({ InstanceIds: [InstanceId] }, function (err, data) {
      if (err) console.log(err);
      callback(err, data);
    });
  },
  rebootInstance(InstanceId, callback) {
    ec2.rebootInstances({ InstanceIds: [InstanceId] }, function (err, data) {
      if (err) console.log(err);
      callback(err, data);
    });
  },
  runInstance({ ImageId, SecurityGroupId, InstanceName }, callback) {
    const params = {
      ImageId,
      InstanceType: "t2.micro",
      SecurityGroupIds: [SecurityGroupId],
      KeyName: "ec2-key",
      MaxCount: 1,
      MinCount: 1,
      TagSpecifications: [
        {
          ResourceType: "instance",
          Tags: [
            {
              Key: "Name",
              Value: InstanceName,
            },
          ],
        },
      ],
    };
    ec2.runInstances(params, function (err, data) {
      if (err) console.log(err);
      callback(err, data);
    });
  },
  getImageList(callback) {
    ec2.describeImages({ Owners: ["self"] }, function (err, data) {
      if (err) console.log(err);
      callback(err, data.Images);
    });
  },
  getRegionList(callback) {
    ec2.describeRegions(function (err, data) {
      if (err) console.log(err);
      callback(err, data.Regions);
    });
  },

  getSecurityGroupList(callback) {
    ec2.describeSecurityGroups({}, function (err, data) {
      if (err) console.log(err);
      callback(err, data.SecurityGroups);
    });
  },
};
