const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req,res) => {
  res.send(`<h1>Boo! did I scare you?</h1>`)
})

server.get("/accounts", (req,res) => {
  db("accounts")
    .then(rez => 
      res.status(200).json(rez)
    )
    .catch(err => {
      res.status(500).json({
        error_message: "something went wrong", 
        err: err
      })
    })
})

server.post("/accounts", (req,res) => {
  db("accounts").insert({name: req.body.name, budget: req.body.budget})
    .then(rez => {
      res.status(200).json({message: rez})
    })
    .catch(err => {
      res.status(500).json({
        error_message: "something went wrong", 
        err: err
      })
    })
})

server.put("/accounts/:id", (req,res) => {
  const id = Number(req.params.id)
  db("accounts").where({id: id}).update(req.body)
    .then(rez => {
      rez > 0
      ? res.status(200).json({message: "user updated"})
      : res.status(200).json({message: "no user with that ID"})
    })
    .catch(err => {
      res.status(500).json({
        error_message: "something went wrong", 
        err: err
      })
    })
})

server.delete("/accounts/:id", (req,res) => {
  const id = Number(req.params.id)
  db("accounts").where({id: id}).del()
  .then(rez => {
    rez > 0
    ? res.status(200).json({message: "user deleted"})
    : res.status(200).json({message: "no user with that ID"})
  })
  .catch(err => {
    res.status(500).json({
      error_message: "something went wrong", 
      err: err
    })
  })
})


module.exports = server;
