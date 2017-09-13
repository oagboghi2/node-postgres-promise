var promise = require('bluebird');

var options = {
  //Initialization options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppies: getSinglePuppies,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};


//Get ALL puppies

function getAllPuppies(req, res, next){
  db.any('select * from pups')
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL puppies'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

//Get Single Puppies

function getSinglePuppies(req, res, next){
  var pupID = parseInt(req.params.id);
  console.log(pupID);
  db.one('select * from pups where id =  $1', pupID)
  .then(function (data){
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ONE puppy'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

// Create puppy

function createPuppy(req, res, next){
  req.body.age = parseInt(req.body.age);
  db.none('insert into pups(name, breed, age, sex)' +
   'values(${name}, ${breed}, ${age}, ${sex})',req.body)
   .then(function(){
     res.status(200)
     .json({
       status: "success",
       message: "Inserted one puppy"
     });
   })
   .catch(function(err){
     return next(err);
   });
}

//Update puppy

function updatePuppy(req, res, next){
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
[req.body.name, req.body.breed, parseInt(req.body.age),
  req.body.sex, parseInt(req.body.id)])
  .then(function (){
    res.status(200)
    .json({
      status: 'success',
      message: 'Updated puppy'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

//Delete puppy

function removePuppy(req, res, next){
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id=$1', pupID)
  .then(function(result){
    res.status(200)
    .json({
      status: 'success',
      message:'Removed ${result.rowColumn} puppy'
    });
  })
  .catch(function(err){
    return next(err);
  });
}
