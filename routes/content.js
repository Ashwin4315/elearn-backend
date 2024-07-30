const express = require('express');
const {setCourse,createContent,updateContent,deleteContent, getContent} = require('../controllers/content');
const {accesspermission, authenticate} = require('../controllers/auth');

const router = express.Router({ mergeParams: true });


router
  .route('/')
  .post(accesspermission('user'),setCourse,createContent);

router
  .route('/:id')
  .get(getContent)
  .patch(updateContent);                     

module.exports = router;