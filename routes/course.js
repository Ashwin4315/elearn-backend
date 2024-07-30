const express = require('express');
const {
    getAllCourse,
    createCourse,
    getCourse,
    deleteCourse,
    updateCourse,
    getTopRated,
    newAddedCourse
} = require('../controllers/course');

const contentRouter = require('./content');

const router=express.Router()

router.use('/:courseId/content', contentRouter);


router.get("/get-top-course",getTopRated);
router.get("/newly-added-course",newAddedCourse);

router
    .route("/")
    .get(getAllCourse)
    .post(createCourse)

router
    .route("/:id")
    .get(getCourse)
    .delete(deleteCourse)
    .patch(updateCourse);

module.exports = router;

