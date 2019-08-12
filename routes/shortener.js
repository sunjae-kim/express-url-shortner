import Model from '../models';
import { joi } from '../service';
const { Shortener } = Model;

const getUrlList = async (req, res) => {
    try {
        const { author } = req.query;
        const query = { where : {} };
        if (author) { query.where.author = author; }
        
        const hostUrl = process.env.SHORTENER_URL || req.get('host');
        const urls = await Shortener.findAll(query);

        res.send({ urls, hostUrl });
    } catch (error) {
        res.send({ message: error.message });
    }
}

const shortenUrl = async (req, res) => {
    try {
        const { value, error } = joi.validateUrl(req.body);
        if (error) return res.status(400).send(error);
        
        const hostUrl = process.env.SHORTENER_URL || req.get('host');
        const { to } = value;
        const shortened = await Shortener.findOne({ where: { to } });
        if (shortened) return res.status(409).send({ message: `이미 존재하는 url 입니다 😭\n→ ${hostUrl}/${to}` });

        await Shortener.create(value);
        res.send({ message: `${hostUrl}/${to}` });
    } catch (error) {
        res.send({ message: error.message });
    }
}

const toShortenedUrl = async (req, res) => {
    try {
        const { path } = req.params;
        const shortened = await Shortener.findOne({ where: { to: path } });
        if (!shortened) return res.status(404).send({ message: '존재하지 않는 url 입니다 😭' });
        
        res.redirect(shortened.from);
    } catch (error) {
        res.send({ message: error.message });
    }
}

const deleteShrotenedUrl = async (req, res) => {
    try {
        const { path } = req.params;
        const shorteneds = await Shortener.findAll({ where: { to: path } });
        if (shorteneds.length === 0) return res.status(404).send({ message: '존재하지 않는 url 입니다 😭' });

        for (const shortened of shorteneds) {
            await Shortener.destroy({ where: { id: shortened.id } });
        };
        res.send({ message: '삭제되었습니다!' });
    } catch (error) {
        res.send({ message: error.message });
    }
}

export default {
    shortenUrl,
    toShortenedUrl,
    deleteShrotenedUrl,
    getUrlList,
};
