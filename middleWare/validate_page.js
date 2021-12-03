const Page = require('../models/page')

module.exports = async (req, res, next) => {
    // req.checkBody('title', 'Title must have a value').notEmpty()
    // req.checkBody('content', 'Content must have a value').notEmpty()

    var errors = []
    if (!req.body.title)
        errors.push({msg: 'Title must have a value'})

    if (!req.body.content)
        errors.push({msg: 'Content must have a value'})

    const slug = req.body.slug ? req.body.slug.replace(/\s+/g, '-') : req.body.title.replace(/\s+/g, '-')
    const isExit = await Page.findOne({slug: slug})

    if (isExit) {
        errors.push({msg:"Slug exits, please choose another"});
    }

    console.log(errors)
    
    if (errors.length > 0 )
    {
        return res.render('admin/add_page', {  //return khi có lỗi 
            errors: errors,
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content
        });
    }

    next();
}


























