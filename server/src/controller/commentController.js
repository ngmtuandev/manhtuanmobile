import CommentModel from "../model/Comment.js";

const commentController = {
  createComment: async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        res.status(401).json({
          status: 1,
          data: "Bình luận không được để trống",
        });
      } else {
        const newComment = await (
          await CommentModel.create({ ...req.body })
        ).populate("user");
        if (newComment) {
          res.status(201).json({
            status: 0,
            data: newComment,
          });
        } else {
          res.status(401).json({
            status: 1,
            data: "Bình luận thất bại",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  getCommentProduct: async (req, res) => {
    try {
      const getComment = await CommentModel.find({
        product: req.params.product,
      }).populate("user");
      // console.log("getComment", getComment);
      if (!getComment) {
        res.status(401).json({
          status: 1,
          data: "Lấy Bình luận thất bại",
        });
      } else {
        res.status(200).json({
          status: 0,
          data: getComment,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default commentController;
