const axios = require('axios');

let randomTrivia = {};
let favorites = [];

axios.get(`http://numbersapi.com/1..100`)
  .then(response => randomTrivia = response.data);

function getRandom(req, res, next) {
  res.status(200).json(randomTrivia);
};

function saveFact(req, res, next) {
  // console.log(req.body);
  favorites.push(req.body.fact);
  res.status(200).json(favorites);
};

function deleteFact(req, res, next) {
  favorites.forEach((fact, index) => {
    if(index == req.params.id) {
      favorites.splice(index, 1)
    }
  });
  res.status(200).json(favorites);
};

module.exports = {
  getRandom,
  saveFact,
  deleteFact
};