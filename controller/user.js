const user = require("../model/user");

exports.getUserById = (req, res, next, id) => {
  user.findById(id).exec((err, user) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({
        error: "No user found :(",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getAllUsers = (req, res) => {
  user.find().exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NO user FOUND",
      });
    }
    res.json(user);
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  console.log(req.body);
  user.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to make changes",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.delUser = (req, res) => {
  user.findOneAndDelete({ _id: req.profile._id }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "error deleting user",
      });
    }
    return res.json(user);
  });
};
