const express = require('express')
const router = express.Router()
const Page = require('../models/page')
const addPageMiddleware = require('../middleWare/validate_page')

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

router.get('/add-page', (req, res) => {
    res.render('admin/add_page', {
        title: "",
        slug: "",
        content: ""
    });
})

router.post('/add-page', addPageMiddleware, async (req, res) => {
    
    const page = {
        title: req.body.title,
        content: req.body.content,
        slug: req.body.slug ? req.body.slug.replace(/\s+/g, '-') : req.body.title.replace(/\s+/g, '-'),
        sorting: 0
    }

    try {
        await Page.create(page)
        res.redirect('/admin/pages')
    }
    catch {
        res.render('admin/add_page', {
            errors: 'Error creating page'
        })
    }
    
})

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
        abcd(id, count)        
    })

})


async function abcd(id, count){
try {
    let page = await Page.findById(id);
    page.sorting = count;
    await page.save();
}
catch (err) { console.log(err); }
}

module.exports = router   
                                

























