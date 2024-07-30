const Content = require('../model/content');

exports.setCourse = (req, res, next) => {
  if (!req.body.course) req.body.course = req.params.courseId;
  console.log(req.params.id)

  next();
};



exports.getContent = async (req, res) => {
  try {
    const content = await Content.findOne({course:req.params.id});
    res
      .status(200)
      .json({
        status: "success",
        data: content
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
exports.createContent = async (req, res) => {
  try {
    console.log(req.body)
    const newContent = await Content.create(req.body);
    res
      .status(200)
      .json({
        status: "success",
        data: newContent
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


exports.updateContent = async (req, res) => {
  try {
    const uContent = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
  });  
    res
      .status(200)
      .json({
        status: "success",
        data: uContent
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

