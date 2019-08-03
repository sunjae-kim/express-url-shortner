import express from 'express';
import shortener from './shortener';
const route = express.Router();

route.post('/shorten', shortener.shortenUrl)

export default route;
