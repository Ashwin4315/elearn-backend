    const express = require('express');
const {
    signup,
    login,
    resetPassword,
    forgotPassword,
    authenticate,
    accesspermission
} = require('../controllers/auth');

const {
    getAllUser,
    getUser,
    deleteUser,
    updateUser,
    userDetail,
} = require('../controllers/user');

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:resetToken", resetPassword);


router.get("/profile", authenticate,userDetail);

router
    .route("/")
    .get(authenticate,getAllUser);

router
    .route("/:id")
    .get(authenticate,getUser)
    .delete(authenticate,accesspermission("admin"),deleteUser)
    .patch(updateUser);

module.exports = router;

