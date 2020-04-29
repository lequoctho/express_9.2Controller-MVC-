const express = require("express");
const shortid = require("shortid");

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const router = express.Router();

// user
const adapterUser = new FileSync('dbTransaction.json');
const dbUser = low(adapterUser);

// Set some defaults
dbUser.defaults({users: []}).write();