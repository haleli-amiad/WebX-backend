const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    console.log('filterBy in back', filterBy);

    const criteria = _buildCriteria(filterBy)
    console.log('cretiria in back:', criteria);

    const collection = await dbService.getCollection('web')
    try {
        const webs = await collection.find(criteria).toArray();
        console.log('test res here.................', webs);
        return webs
    } catch (err) {
        console.log('ERROR: cannot find webs')
        throw err;
    }
}

async function getById(webId) {
    const collection = await dbService.getCollection('web')
    try {
        const web = await collection.findOne({ '_id': ObjectId(webId) })
        return web
    } catch (err) {
        console.log(`ERROR: while finding web ${webId}`)
        throw err;
    }
}


function _buildCriteria(filterBy) {
    var criteria = {};
    if (filterBy._id) {
        const createdBy = { 'createdBy._id': filterBy._id }
        criteria = createdBy
    }

    return criteria;
}

async function getByEmail(email) {
    const collection = await dbService.getCollection('web')
    try {
        const web = await collection.findOne({ email })
        return web
    } catch (err) {
        console.log(`ERROR: while finding web ${email}`)
        throw err;
    }
}

async function remove(webId) {
    console.log('webId in remove:', webId);

    const newId = webId + ''
    const collection = await dbService.getCollection('web')
    try {
        await collection.deleteOne({ '_id': ObjectId(newId) })
    } catch (err) {
        console.log(`ERROR: cannot remove web ${webId}`)
        throw err;
    }
}

async function update(web) {
    console.log('update web', web);
    const collection = await dbService.getCollection('web')
    web._id = ObjectId(web._id);
    try {
        await collection.updateOne({ _id: web._id }, { $set: web })
        return web
    } catch (err) {
        console.log(`ERROR: cannot update web ${web._id}`)
        throw err;
    }
}

async function add(web) {
    console.log('this is the web to add:', web);

    const collection = await dbService.getCollection('web')
    try {
        await collection.insertOne(web);
        return web;
    } catch (err) {
        console.log(`ERROR: cannot insert web`)
        throw err;
    }
}