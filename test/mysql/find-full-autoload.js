"use strict";

const SequelizeModels = require("../../");
const assert = require("assert");


describe("Multiple find queries from automatically created Sequelize Models", function() {

  it("Find user by id 1", function(done) {
    var seqModels = new SequelizeModels(require("../config.js"));
    seqModels.getSchema().then( schema => {

      schema.models.User.findById(1)
      .then(function(user) {
        assert( user.name === "Gonzalo" );
        done();
      })
      .catch(function(err) {
        return done(err);
      });
    })
    .catch( err => {
      return done(err);
    });
  });



  it("Find all profiles with name Technicians including his users", function(done) {
    var seqModels = new SequelizeModels(require("../config.js"));
    seqModels.getSchema().then( schema => {
      schema.models.Profile.findAll({
        where : {
          name  : "Technician"
        },
        include : schema.models.User
      })
      .then( profiles => {
        var profile = profiles[0];
        assert(profile.name === "Technician" && profile.users.length === 2);
        return done();
      })
      .catch( err => {
        return done(err);
      });
    })
    .catch( err => {
      return done(err);
    });
  });



  it("Find all users with name Gonzalo including his profiles", function(done) {
    var mod = new SequelizeModels(require("../config.js"));
    mod.getSchema().then( schema => {

      schema.models.User.findAll({
        where   : { name : "Gonzalo" },
        include : schema.models.Profile
      })
      .then( users => {
        var user = users[0];
        assert(user.name === "Gonzalo" && user.profile.name === "Technician");
        return done();
      })
      .catch( err => {
        return done(err);
      });
    })
    .catch( err => {
      return done(err);
    });
  });
});
