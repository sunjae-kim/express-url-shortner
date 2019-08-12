import express from 'express';
import shortener from './shortener';
import { hasHubotToken } from '../library/middleware';

const route = express.Router();

route.get('/list', shortener.getUrlList);
route.post('/shorten', hasHubotToken, shortener.shortenUrl);
route.get('/:path', shortener.toShortenedUrl);
route.delete('/:path', hasHubotToken, shortener.deleteShrotenedUrl);

export default route;
