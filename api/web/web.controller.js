const webService = require('./web.service')
// const logger = require('../../services/logger.service')

async function getWeb(req, res) {
    const web = await webService.getById(req.params.id)
    res.send(web)
}
  
async function getWebs(req, res) {
    const webs = await webService.query(req.query)
    res.send(webs)
}

async function deleteWeb(req, res) {
    await webService.remove(req.params.id)
    res.end()
}

async function updateWeb(req, res) {
    console.log('trying to update site');
    const web = req.body;
    await webService.update(web)
    console.log(web);
    res.send(web)
}

async function addWeb(req, res) {
    const web = req.body;
    await webService.add(web)
    res.send(web)
}

module.exports = {
    getWeb,
    getWebs,
    deleteWeb,
    updateWeb,
    addWeb
}