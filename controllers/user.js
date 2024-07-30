  const {User} = require('../model/user');

exports.getAllUser=async(req,res)=>{
    try {
        const users = await User.find();
        res
            .status(200)
            .json({
                status: "success",
                data: users
            })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })

    }
}


exports.deleteUser = async(req,res) => {

    try {
        const user="";

        res
        .status(204)
        .json({
            status:"success",
            data:user
        })

    } catch (error) {
         res
        .status(400)
        .json({
            status:"failed",
            message:error.message
        })
    }
    
};

exports.getUser = async(req,res) => {

    try {
        const user="";

        res
        .status(200)
        .json({
            status:"success",
            data:user
        })

    } catch (error) {
         res
        .status(400)
        .json({
            status:"failed",
            message:error.message
        })
    }
    
};

exports.updateUser = async(req,res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res
        .status(200)
        .json({
            status:"success",
            data:updatedUser
        })

    } catch (error) {
         res
        .status(400)
        .json({
            status:"failed",
            message:error.message
        })
    }
    
};

exports.userDetail = async (req, res) => {
    try {


     

         res
         .status(200)
         .json({
             status: "success",
             data:req.user
            })

    }catch (error) {
        res
        .status(400)
        .json({
            status: "failed",
            message: error.message
        })
    }
}