const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    richDescription:{type: String, default: ''},
    image : {type: String, default: ''},
    images : [{type: String}],
    brand :{type: String, default: ''},
    price : {type:Number, default: 0},
    category :{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Category', 
        required : true
    },
    countInStock: {
        type:Number,
        required : true,
        min : 0, max : 255
    },
    rating : { type : Number , default : 0},
    numReviews : { type : Number , default : 0},
    isFeatured : { type : Boolean , default : false},
    dateCreatd : { type : Date , default : Date.now},
});

exports.Product = mongoose.model('Product',ProductSchema);