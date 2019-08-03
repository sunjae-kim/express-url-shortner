const shortenUrl = (req, res) => {
    const response = {
        message: 'Success',
        from: 'from',
        to: 'to',
    }
    res.send(response)
}

export default {
    shortenUrl,
}
