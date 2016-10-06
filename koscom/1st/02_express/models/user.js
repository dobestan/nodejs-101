var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");


var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,  // raw text
  // "password" ======> (hash) ======> "1489382389fjdskfjsklajfklsdjafa"
  // "passwo" ======> (hash) ======> "14....

  // timestamp
  created_at: Date,
  updated_at: Date,

  facebookId: String,
  kakaoId: String,

  // comments: [commentSchema]
  posts: [  {type: mongoose.Schema.Types.ObjectId, ref: "Post"}  ]
});


userSchema.pre("save", function(next) {
  // timestamp
  var user = this;

  user.created_at = user.created_at || new Date();
  user.updated_at = new Date();

  next();
});


userSchema.pre("save", function(next) {
  // password hash
  var user = this;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);

  console.log(user.password + " ===> " + hash);

  user.password = hash;

  next();

  // bcrypt.hash(user.password, 10, function(error, hash) {
  //   console.log(user.password + " ===> " + hash);
  //
  //   user.password = hash;
  //   next();
  // });
});


// User.authenticate
userSchema.statics.authenticate = function() {
  return function(username, password, callback) {
    User.findOne({username: username}, function(error, user) {
      if (error) return callback(error, null);
      if (!user) return callback(null, null);

      // password compare
      if ( !bcrypt.compareSync(password, user.password) ) {
        return callback(null, null);
      } else {
        return callback(null, user);
      }
    });
  }
}


userSchema.statics.authenticateFacebook = function() {
  return function(accessToken, refreshToken, profile, callback) {
    User.findOne({facebookId: profile.id}, function(error, user) {
      if (error) return callback(error, null);
      if (user) return callback(error, user);

      var user = new User({
        username: profile.id,
        password: profile.id, // FIXME: random password
        facebookId: profile.id
      });

      user.save(function(error, user) {
        if (error) return callback(error, null);
        return callback(error, user);
      });
    });
  }
}


// Serialize - user ( db ) => userId ( req.session )
userSchema.statics.serialize = function() {
  return function(user, done) {
    done(null, user._id);
  }
}


// Deserialize - userId ( req.session ) => user ( req.user )
userSchema.statics.deserialize = function() {
  return function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  }
}


var User = mongoose.model("User", userSchema);


module.exports = User;
