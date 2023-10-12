import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(pots)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'can not get all posts',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findByIdAndUpdate({
            _id: postId,
        }, {
            $inc: { viewsCount: 1 },
        },
        {
            returnDocument: 'after',
        },
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Can not return a post'
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'post not found',
                });
            }
            res.json(doc);
        },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'can not get all posts',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findByIdAndDelete({
            _id: postId,
        }, 
        (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Can not remove a post '
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Post not found',
                })
            }
            res.json({
                success: true,
            });
        },
        );
    } catch (err) {
        console.log(err);
    res.status(500).json({
        message: 'Can not remove a post',
    });
 }
};

export const create = async (req, res) => {
    try {
     const doc = new PostModel({
        title: req.body.title,
        text: req.body.title,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
     });

     const post = await doc.save();
     
     res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: 'Can not create a post',
    });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        },
        {
            title: req.body.title,
            text: req.body.title,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can not create a post.',
        });
    }
};
