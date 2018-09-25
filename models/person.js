var assert = require('assert');
var mongodb = require('mongodb');
const con = require("./connection"),
    collectionName = "person";

/** 
 * Table Person
 * 
 * @param {string} id Person`s identification key (optional)
 * @param {string} name Person's name
 * @param {string} lastName Person's last name
 * @param {date} birthday Person's birthday
 *
**/

var model = {
    select: (data={}) => {
        return new Promise((resolve, reject) => {
            con.then((db) => {
                const collection = db.collection(collectionName);
                collection.find(data).toArray((err, docs) => {
                    assert.equal(err, null);
                    resolve(docs);
                });
            });
        });
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            con.then((db) => {
                const collection = db.collection(collectionName);
                collection.insertOne(data, (err, result) => {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    assert.equal(1, result.ops.length);
                    resolve(result.ops[0]);
                });
            });
        });
    },
    update: (data) => {
        return new Promise((resolve, reject) => {
            con.then((db) => {
                const collection = db.collection(collectionName);
                collection.findOneAndUpdate({_id: new mongodb.ObjectID(data.id)}, {$set: data}, function(err, docs) {
                    model.select({_id: new mongodb.ObjectID(data.id)}).then((doc) => {
                        resolve(doc[0])
                    })
                });
            });
        });
    },
    remove: (id) => {
        return new Promise((resolve, reject) => {
            con.then((db) => {
                const collection = db.collection(collectionName);
                collection.deleteOne({_id: new mongodb.ObjectID(id)}, (err, result) => {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    resolve(id);
                });
            });
        });
    }
}

module.exports = model;