'use strict';

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var collectionName = 'counters';
var subCategorySchema = new Schema({
    name : String,
    parentIndex : Number,
    id : Number
});
var counterSchema = new Schema({
	name : String,
	index : Number,
    subCategory : [subCategorySchema]
}, {collection : collectionName});
var Counter = mongoose.model('counter', counterSchema);


module.exports = (function() {

    function pushNewSubCategory(name, currentIndex, subCategoryName, callback) {
        var subCategory = {
            'name' : subCategoryName,
            'parentIndex' : currentIndex,
            'id' : 1
        };

        Counter.update(
            {'name':name},
            {$push : {'subCategory' : subCategory}},
            {upsert : true},
            function(e, d) {
                if(e) {
                    return callback(e);
                }
                return callback(null, 1);
            }
        );
    }

    function updateExistSubCategory(name, currentIndex, subCategoryName, callback) {
        Counter.findOneAndUpdate(
            {'name' : name, 'subCategory.parentIndex' : currentIndex, 'subCategory.name' : subCategoryName},
            {
                $inc : {'subCategory.$.id' : 1}
            },
            {
                upsert : true,
                //Return array of subCategory with one element in it
                select : {
                    'subCategory' : {
                        $elemMatch : {
                            'parentIndex' : currentIndex,
                            'name' : subCategoryName
                        }
                    }
                }
            },
            function(e, d) {
                if(e) {
                    return callback(e);
                }
                return callback(null, d.subCategory[0].id);
            });
    }

    return {
        /**
         * Get the current id with name 'name'
         *
         * @param {string} name name of the id you want to trace
         * @param {function} callback
         */
        getCurrentId: function(name, callback) {
            Counter.findOne({'name' : name}, function(err, doc) {
                if(err) {
                    return callback(err);
                }
                //No counter available then create one
                if(!doc) {
                    var counter = new Counter();
                    counter.name = name;
                    counter.index = 0;
                    counter.subCategory = [];
                    counter.save(function(e, d) {
                        if(e) {
                            return callback(e);
                        }
                        return callback(null, d.index);
                    });
                } else {
                    return callback(null, doc.index);
                }
            });
        },

        /**
         * Get the next avaiable id for name 'name'
         *
         * @param {string} name
         * @param {function} callback
         */
        getNextId: function(name, callback) {
            Counter.findOneAndUpdate({'name' : name}, {$inc : {'index' : 1}}, {upsert : true}, function(err, doc) {
                if(err) {
                    callback(err);
                }
                return callback(null, doc.index);
            });
        },

        /**
         * Find if there is available subCategory id in DB.
         * If not then create one for that.
         * If DB has it then increase the is by 1 and return the new id in callback
         *
         * @param {string} name
         * @param {number} currentIndex
         * @param {string} subCategoryName
         * @param {function} callback
         */
        getNextSubCategoryId: function(name, currentIndex, subCategoryName, callback) {
            Counter.findOne({'name':name, 'subCategory.parentIndex':currentIndex},
                function(err, doc) {
                    if(err) {
                        return callback(err);
                    }

                    if(!doc) {
                        //No subCategory available then create one
                        pushNewSubCategory(name, currentIndex, subCategoryName, callback);
                    } else {
                        //subCategory available then update
                        updateExistSubCategory(name, currentIndex, subCategoryName, callback);
                    }
                });
        }
    };
})();

