const { Course } = require("../model/course");






exports.getTopRated = async (req, res) => {
    try {

        const course = await Course.find().sort("-rating").limit(5);

        res
            .status(200)
            .json({
                status: "success",
                results:course.length,
                data: course
            })
    }
    catch (error) {
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
    }

}
exports.newAddedCourse = async (req, res) => {
    try {

        const course = await Course.find().sort("-CreatedAt").limit(5);

        res
            .status(200)
            .json({
                status: "success",
                results:course.length,
                data: course
            })
    }
    catch (error) {
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
    }

}



exports.getAllCourse = async (req, res) => {
    try {

        let queryString = JSON.stringify({ ...req.query });
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        let query = Course.find(JSON.parse(queryString));

        if (req.query.sort) {
            console.log(req.query.sort);
            const sortField = req.query.sort.split(",").join(" "); //url=>&sort=rating,average
            query = query.sort(sortField);
        }
       
        if (req.query.field) {
            const field = req.query.field.split(",").join(" ");
            query = query.select(field);
        }
        else {
            query = query.select("-__v");
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;

        const alldocuments = await Course.countDocuments();

        if (req.query.page) {
            if (skip >= alldocuments) {
                return res.status(200)
                    .json({
                        status: "success",
                        message: `there is no data in page ${page}`
                    })
            }
        }


        query=query.skip(skip).limit(limit);

        const recipes = await query;
        res
            .status(200)
            .json({
                status: "success",
                pagination: {
                    results: alldocuments,
                    currentPage: page,
                    pageResults: recipes.length
                },
                data: recipes
            })
    }
    catch (error) {
        res
            .status(400)
            .json({
                status: "failed",
                message: error.message
            })
    }

}






exports.createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res
            .status(200)
            .json({
                status: "success",
                data: newCourse
            })

    } catch (error) {
        res
            .status(400)
            .json({
                status: "failed",
                data: error.message
            })
    }
}


exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        console.log(req.params.id)
        console.log(course)
        res
            .status(200)
            .json({
                status: "success",
                data: course
            })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: error.message
        })
    }
}
exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res
            .status(201)
            .json({
                status: "success",
                data: updatedCourse
            })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: error.message
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id)
        res
            .status(204)
            .json({
                status: "success",
                data: ""
            })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: error.message
        })
    }

}