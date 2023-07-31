const jwt = require('jsonwebtoken');
const { hasJWT } = require('../utils/utils');
const Paste = require('../model/paste.model');
const { default: mongoose, Types } = require('mongoose');
const { objectId } = require('../validations/custom.validation');

const createNewPaste = async (req, res) => {
    const JTW = hasJWT(req);
    if (!JTW) {
        const newPaste = await Paste.create(req.body);
        return newPaste;
    }
    const data = jwt.verify(JTW, process.env.JWT_SECRET);
    console.log(data);
    console.log("inside paste service");
    const newPaste = await Paste.create({
        ...req.body,
        userId: data.id,
    });
    return newPaste;
};

const getPasteById = async id => {
    if(mongoose.Types.ObjectId.isValid(id))
       return Paste.findById({_id: id});
    return Paste.findOne({title: id});
};

const getdefPaste = async () => {
    const paste = `Welcome to nyanpaste

Use the toolbox at the top to create a new file and share your code`;
    return paste;

}

// const getAllPastes = async (user_id, options) => {
//     const { title, limit, page } = options;
//     console.log(title, limit, page);
//     console.log(user_id);
//     const pastes = await Paste.aggregate([
//         {
//             $match: {
//                 userId: new Types.ObjectId(user_id),
//                 title: { $regex: title, $options: 'i' },
//             },
//         },
//         {
//             $facet: {
//                 totalData: [{ $count: 'totalData' }],
//                 data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
//             },
//         },
//         {
//             $project: {
//                 total: { $arrayElemAt: ['$totalData.totalData', 0] },
//                 limit: { $literal: limit },
//                 page: { $literal: page },
//                 totalPage: {
//                     $ceil: {
//                         $divide: [
//                             { $arrayElemAt: ['$totalData.totalData', 0] },
//                             limit,
//                         ],
//                     },
//                 },
//                 data: 1,
//             },
//         },
//     ]);
//     return pastes;
// };

module.exports = {
    createNewPaste,
    getPasteById,
    // getAllPastes,
    getdefPaste,
};
