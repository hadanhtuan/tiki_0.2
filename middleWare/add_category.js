const Category = require('../models/category')

module.exports = async (req, res, next) => {
    // req.checkBody('title', 'Title must have a value').notEmpty()
    // req.checkBody('content', 'Content must have a value').notEmpty()

    var messages = []
    if (!req.body.title)
        messages.push({type: 'danger', msg: 'Title must have a value'})

    const slug =req.body.title.replace(/\s+/g, '-')

    const isExit = await Category.findOne({slug: slug})

    if (isExit) {
        messages.push({type: 'danger', msg:"Slug exits, please choose another"});
    }

    console.log(messages)
    
    if (messages.length > 0 )
    {
        return res.render('admin/add_category', {  //return khi có lỗi 
            messages: messages,
            title: req.body.title
        });
    }

    next();
}


























