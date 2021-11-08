const { Comment} = require('../dataBase');
const {constants} = require('../configs');
const {s3Service} = require('../service');


module.exports = {
    createComment: async (req, res, next) => {
        try {
            const {user_id,apartment_id} = req.params;

            let newComment = await Comment.create({...req.body, user_id,apartment_id});

            if (req.files && req.files.photo) {
                const uploadInfo = await s3Service.uploadImage(req.files.photo, 'photos', newComment._id.toString());

                newComment = await Comment.findByIdAndUpdate(newComment._id, { photo: uploadInfo.Location }, { new: true });
            }

            res.json(newComment)
                .status(constants.CREATED);
        } catch (e) {
            next(e);
        }
    },

    getAllComments:async (req, res, next)=>{
        try {
            const comments = await Comment.find();

            res.json(comments);
        }catch (e) {
            next(e);
        }
    }
};
