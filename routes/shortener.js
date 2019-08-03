import Model from '../models';
import { joi } from '../service';
const { Shortener } = Model;

const shortenUrl = async (req, res) => {
    try {
        const { value, error } = joi.validateUrl(req.body)
        if (error) return res.status(400).send(error);
        const shortened = await Shortener.create(value);
        res.send(shortened);
    } catch (error) {
        res.send(error)
    }
}

const toShortenedUrl = async (req, res) => {
    try {
        const { path } = req.params;
        const { from } = await Shortener.findOne({ where: { to: path } });
        if (!from) return res.status(404);
        res.redirect(from);
    } catch (error) {
        res.send(error)
    }
}

const deleteShrotenedUrl = async (req, res) => {
    try {
        const { path } = req.params;
        const shorteneds = await Shortener.findAll({ where: { to: path } });
        if (!shorteneds) return res.status(404);
        for (const shortened of shorteneds) {
            console.log(shortened)
            await Shortener.destroy({ where: { id: shortened.id } });
        };
        res.send({ message: 'Deleted' });
    } catch (error) {
        res.send(error)
    }
}

export default {
    shortenUrl,
    toShortenedUrl,
    deleteShrotenedUrl,
};
