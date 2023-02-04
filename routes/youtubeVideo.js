const express = require('express');
const router = express.Router();
const YoutubeVideo = require('../model/youtubeVideo')

router.get('/', async (req, res) => {
    try{
        const youtubeVide = await YoutubeVideo.find();
        res.status(201).send(youtubeVide)

    }catch(error){
      res.status(500).json({message: error.message})
    }
    
})

router.get('/:id', getYoutubeVideo, (req, res) => {  
    res.json(res.youtubeVideo) 
    
})

router.post('/', async (req, res) => {
const newVideo = new YoutubeVideo ({
    title: req.body.title,
    rating: req.body.rating,
    url: req.body.url
})

    try{
        const newYoutubeVide = await newVideo.save();
        res.status(201).json(newYoutubeVide)

    }catch(error){
      res.status(400).json({message: error.message})
    }  
})
    
router.patch('/:id', getYoutubeVideo, async (req, res) => {
    if (req.body.title != null) {
      res.youtubeVideo.title = req.body.title
    }
    if (req.body.rating != null) {
      res.youtubeVideo.rating = req.body.rating
    }
    if (req.body.url != null) {
        res.youtubeVideo.url = req.body.url
      }
    try {
      const updatedYoutubeVideo = await res.youtubeVideo.save()
      res.json(updatedYoutubeVideo)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

router.delete('/:id', getYoutubeVideo, async (req, res) => {
    try {
        await res.youtubeVideo.remove()
        res.json({ message: 'Deleted Youtube Video' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

async function getYoutubeVideo(req, res, next) {
    let youtubeVideo
    try {
        youtubeVideo = await YoutubeVideo.findById(req.params.id)
      if (youtubeVideo == null) {
        return res.status(404).json({ message: 'Cannot find the youtube Video' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.youtubeVideo = youtubeVideo
    next()
  }

module.exports = router