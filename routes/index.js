var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
//CONECTING DB// APP CONFI
mongoose.connect(
  "mongodb+srv://khanh93551:Matkhausai1@cluster0.fai5sph.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
//SCHEMA
let UserSchema = mongoose.Schema({
  phone: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  typeRegister: {
    type: String,
  },
  tokenLogin: {
    type: String,
  },
  deviceID: {
    type: Number,
  },
  fcmTokens: {
    type: String,
  },
});

//MODEL
let userh = mongoose.model("user", UserSchema);

/* GET home page. */
router.get("/", function (req, res, next) {
  userh.find({}, (error, data) => {
    console.log("danh sách người dùng ", data);
    res.render("index", { users: data });
  });
});
router.get("/form-add", function (req, res, next) {
  res.render("form-add", {});
});
router.post("/add", function (req, res, next) {
  userh.create(req.body);
  res.redirect("/");
});

router.get("/form-update/:id", function (req, res, next) {
  userh.findById(req.params.id, (error, data) => {
    res.render("form-update", { user: data });
  });
});
router.post("/update", function (req, res, next) {
  userh.findByIdAndUpdate(req.body.id, req.body, (error, data) => {
    res.redirect("/");
  });
});
// form delete
router.get("/form-delete/:id", function (req, res, next) {
  userh.findByIdAndDelete(req.params.id, (error, data) => {
    res.redirect("/");
  });
});
const os = require("os");
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const osType = os.type();
const osPlatform = os.platform();
console.log(" Total memory: S{totalMemoryl");
console.log(" Free memory : ${freeMemory}");
console.log("Os type: S{osType}");
console.log(" Os platform : S{osPlatform}");
module.exports = router;
