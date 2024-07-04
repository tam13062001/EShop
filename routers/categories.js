const {Category} = require('../model/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req,res)=>{
    const categorylist = await Category.find();

    if(!categorylist){
        res.status(500).json({success : false})
    }

    res.status(200).send(categorylist);
}) 


router.get(`/:id`, async (req,res)=>{
    const category= await Category.findById(req.params.id);

    if(!category){
        res.status(500).json({message:' not exist id'})
    }

    res.status(200).send(category);
}) 

router.post('/', async(req,res)=>{
    let category = new Category({
        name : req.body.name,
        icon : req.body.icon,
        color : req.body.color
    })
    category = await category.save();

    if(!category)
        return res.status(404).send('category not exits')
    res.send(category);
})


router.delete('/:id', (req, res)=>{
    Category.deleteOne({_id: req.params.id}).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }
    }).catch(err=>{
       return res.status(400).json({success: false, error: err}) 
    })
})


router.put('/:id', async(req,res)=>{
    const category = await Category.updateOne({_id: req.params.id},
        {
        name : req.body.name,
        icon : req.body.icon,
        color : req.body.color
        }
    )
    if(!category)
        return res.status(404).send('category not exits')
    res.send(category);
})


module.exports = router;