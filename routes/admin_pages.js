const express = require('express')
const router = express.Router()
const Page = require('../models/page')
const addPageMiddleware = require('../middleWare/add_page')
const editPageMiddleware = require('../middleWare/edit_page')

// [GET] /admin/pages/
router.get('/', async (req, res) => {
    try {
        const pages = await Page.find({}).sort({sorting: 1})
        res.render('admin/pages', {
            pages: pages
        })

    }
    catch (err) { 
        console.log(err)
    }
})

// [GET] /admin/pages/add-page
router.get('/add-page', (req, res) => {
    res.render('admin/add_page', {
        title: "",
        slug: "",
        content: ""
    });
})

// [POST] /admin/pages/add-page
router.post('/add-page', addPageMiddleware, async (req, res) => {
    var messages = []
    
    const page = {
        title: req.body.title,
        content: req.body.content,
        slug: req.body.slug ? req.body.slug.replace(/\s+/g, '-') : req.body.title.replace(/\s+/g, '-'),
        sorting: 0
    }

    try {
        await Page.create(page)
        messages.push({type: 'success', msg: 'Page added'})

        res.render('admin/add_page', {
            messages: messages,
            title: page.title,
            slug: page.slug,
            content: page.content
        })    
    }
    catch {
        messages.push({type: 'danger', msg: 'Error creating page'})

        res.render('admin/add_page', {
            messages: messages,
            title: req.body.title,
            content: req.body.content,
            slug: req.body.slug
        })
    }
    
})



// [GET] /admin/pages/edit/:slug
router.get('/edit/:slug', async (req, res) => {
    var messages = []

    try {
        const page = await Page.findOne({slug: req.params.slug})
        if(!page)
            throw err

        res.render('admin/edit_page', {
            _id: page._id,
            title: page.title,
            slug: page.slug,
            content: page.content
        });
        
    }
    catch(err) {
        messages.push({type: 'danger', msg: 'Error finding page'})
        res.render('index', {
            messages
        });
    }

})


// [POST] /admin/pages/edit-page/:id
router.post('/edit-page/:id', editPageMiddleware, async (req, res) => {
    var messages = []

    try {
        const page = await Page.findById(req.params.id)
        
        if(!page)
        {    throw err  }
        
        page.title=req.body.title
        page.content=req.body.content
        page.slug=req.body.slug ? req.body.slug.replace(/\s+/g, '-') : req.body.title.replace(/\s+/g, '-')
        page.sorting=0
        
        await page.save()

        messages.push({type: 'success', msg: 'Page edited'})

        res.render('admin/edit_page', {
            messages: messages,
            _id: page._id,
            title: page.title,
            slug: page.slug,
            content: page.content
        })    

    }
    catch {
        messages.push({type: 'danger', msg: 'Error editing page'})

        res.render('admin/edit_page', {
            messages: messages,
            _id: req.params.id,
            title: req.body.title,
            content: req.body.content,
            slug: req.body.slug
        })
    }
    
})

// [GET] /admin/pages/reorder-pages
router.post('/reorder-pages', (req, res) => {
    const ids = req.body['id[]']

    var count = 0;
    // ids.forEach( id => {
    //     count = count + 1;

    //     Page.findById(id, (err, page) => {
    //         page.sorting = count
    //         console.log(page.sorting)

    //         page.save((err) => {
    //             console.log(page.title, page.sorting)
    //         })
    //     })
    // })

    // ids.forEach( async (id) => {
    //     console.log('-----------------');
    //     try {
    //         let page = await Page.findById(id);
    //         console.log(page.title);
    //         page.sorting = ++count;
    //         console.log(page.title + page.sorting);
    //         await page.save();
    //     }
    //     catch (err) { console.log(err) }
    // })


    ids.forEach( async (id) => {
        count = count + 1;
        CountAndSave(id, count)        
    })

})



// [DELETE] /admin/pages/:id
router.delete('/:id', async (req, res) => {
    var messages = []
    
    try {
        await Page.findByIdAndDelete(req.params.id)
        messages.push('success', 'Page deleted')
        
        const pages = await Page.find({}).sort({sorting: 1})
        res.render('admin/pages', {
            messages: messages,
            pages: pages
        })
    }
    catch {
        messages.push('danger', 'Can not delete page')
        res.render('/', {
            messages: messages
        })
    }
})



async function CountAndSave(id, count){
try {
    let page = await Page.findById(id);
    page.sorting = count;
    await page.save();
}
catch (err) { console.log(err); }
}

module.exports = router   
                                

























