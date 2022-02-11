const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const addCategoryMiddleware = require('../middleWare/add_category')
const editCategoryMiddleware = require('../middleWare/edit_category')

// [GET] /admin/categories/
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({})
        res.render('admin/categories', {
            categories
        })

    }
    catch (err) { 
        console.log(err)
    }
})

// [GET] /admin/pages/add-page
router.get('/add-category', (req, res) => {
    res.render('admin/add_category', {
        title: "",
        slug: ""
    });
})

// [POST] /admin/pages/add-category
router.post('/add-category', addCategoryMiddleware, async (req, res) => {
    var messages = []
    
    const category = {
        title: req.body.title,
        slug: req.body.title.replace(/\s+/g, '-')
    }

    try {
        await Category.create(category)
        messages.push({type: 'success', msg: 'Category added'})

        res.render('admin/add_category', {
            messages: messages,
            title: category.title
        })    
    }
    catch(err) {
        console.log(err)
        messages.push({type: 'danger', msg: 'Error creating category'})

        res.render('admin/add_category', {
            messages: messages,
            title: req.body.title
        })
    }
    
})

// [GET] /admin/pages/edit/:id
router.get('/edit/:id', async (req, res) => {
    var messages = []

    try {
        const category = await Category.findById(req.params.id)
        if(!category)
            throw err

        res.render('admin/edit_category', {
            _id: category._id,
            title: category.title
        });
        
    }
    catch(err) {
        messages.push({type: 'danger', msg: 'Error finding page'})
        res.render('index', {
            messages
        });
    }

})


// [POST] /admin/categories/edit-category/:id
router.post('/edit-category/:id', editCategoryMiddleware, async (req, res) => {
    var messages = []

    try {
        const category = await Category.findById(req.params.id)
        
        if(!category)
        {    throw err  }
        
        category.title=req.body.title
        category.slug=req.body.title.replace(/\s+/g, '-')
        
        await category.save()

        messages.push({type: 'success', msg: 'category edited'})

        res.render('admin/edit_category', {
            messages: messages,
            _id: category._id,
            title: category.title
        })    

    }
    catch {
        messages.push({type: 'danger', msg: 'Error editing category'})

        res.render('admin/edit_page', {
            messages: messages,
            _id: req.params.id,
            title: req.body.title
        })
    }
    
})


// [DELETE] /admin/categories/:id
router.delete('/:id', async (req, res) => {
    var messages = []
    
    try {
        await Category.findByIdAndDelete(req.params.id)
        messages.push({type: 'success', msg: 'Category deleted'})
        
        const categories = await Category.find({})
        res.render('admin/categories', {
            messages: messages,
            categories: categories
        })
    }
    catch {
        messages.push({type: 'danger', msg: 'Can not delete page'})
        res.render('/', {
            messages: messages
        })
    }
})


module.exports = router   
                                

























