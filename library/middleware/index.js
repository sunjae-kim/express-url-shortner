export const hasHubotToken = (req, res, next) => {
    const HUBOT_SLACK_TOKEN = req.header('Hubot-Slack-Token');
    if (HUBOT_SLACK_TOKEN !== process.env.HUBOT_SLACK_TOKEN) {
        return res.status(403).send({ message: '잘못된 접근입니다 🚫' })
    }
    next();
}
