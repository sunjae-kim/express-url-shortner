import Model from '../models';
import { joi } from '../service';
const { Shortener } = Model;

const shortenUrl = async (req, res) => {
    const { value, error } = joi.validateUrl(req.body)
    if (error) return res.status(400).send(error);
    const shortened = await Shortener.create(value);
    res.send(shortened);
}

const toShortenedUrl = async (req, res) => {
    const { path } = req.params;
    const { from } = await Shortener.findOne({ where: { to: path } });
    if (!from) return res.status(404);
    res.redirect(from);
}

export default {
    shortenUrl, toShortenedUrl
};
