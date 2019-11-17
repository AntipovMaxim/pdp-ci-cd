import { Schema, model } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

import { appConfig } from '../config/app.config';


const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function () {
  return jwt.sign({
    email: this.email,
    id: this._id,
  }, appConfig.secret, { expiresIn: '60m' });
};

UsersSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

UsersSchema.plugin(uniqueValidator);

export const UsersModel = model('User', UsersSchema);
