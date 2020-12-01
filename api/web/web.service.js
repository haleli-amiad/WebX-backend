
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
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('web')
    try {
        // const webs = await collection.find().toArray();
        // const test = await collection.find({name: { $regex: 'a'}}).toArray();
        const webs = await collection.find(criteria).toArray();
        webs.forEach(web => delete web.password);
        
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
    const criteria = {};
    if (filterBy.term) {
        const term = filterBy.term
        criteria.name = { $regex: term }
    }
    console.log('filterBy.inStock here........', filterBy);
    if (filterBy.inStock !== 'all' && filterBy.inStock !== undefined) {
        criteria.inStock = JSON.parse(filterBy.inStock)
    }
    // console.log('criteria here........', criteria);
    // if (filterBy.minBalance) {
    //     criteria.balance = { $gte: +filterBy.minBalance }
    // }
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
    const collection = await dbService.getCollection('web')
    try {
        await collection.insertOne(web);
        return web;
    } catch (err) {
        console.log(`ERROR: cannot insert web`)
        throw err;
    }
}



