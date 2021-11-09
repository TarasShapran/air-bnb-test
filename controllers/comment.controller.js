const { Comment} = require('../dataBase');
const {constants} = require('../configs');
const {s3Service} = require('../service');


module.exports = {
    createComment: async (req, res, next) => {
        try {
            const {apartment_id} = req.params;

            const {_id:user_id} = req.user;

            let newComment = await Comment.create({...req.body, user_id,apartment_id});

            if (req.files && req.files.photos) {
                const {photos} = req.files;

                const uploadInfo=[];

                for (const value of photos) {
                    const upload = await s3Service.uploadImage(value, 'photos', newComment._id.toString());

                    uploadInfo.push(upload.Location);
                }

                newComment = await Comment.findByIdAndUpdate(newComment._id, { photo: uploadInfo }, { new: true });
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
