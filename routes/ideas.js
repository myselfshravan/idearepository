const express = require('express')
const router = express.Router()
const Idea = require('../models/idea')

// All Ideas Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const ideas = await Idea.find(searchOptions)
        res.render('ideas/index', {
            ideas: ideas,
            searchOptions: req.query
        })
    } catch{
        res.redirect('/')
    }
})


// New Idea Route
router.get('/new', (req, res) => {
    res.render('ideas/new', { idea: new Idea() })
})

// Ceate Idea Route
router.post('/', async(req, res) => {
    const idea = new Idea({
        name: req.body.name
    })
    try {
        const newIdea = await idea.save()
        res.redirect('/ideas')
      // res.redirect(`/ideas/${newIdea.id}`)



    } catch{
        res.render('ideas/new', {
            idea: idea,
            errorMessage: 'Error creating new Idea'
        })
    }

})

module.exports = router