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

const getAllPastes = async (req, res) => {
    const JTW = hasJWT(req);
    // console.log("inside paste service");
    const data = jwt.verify(JTW, process.env.JWT_SECRET);
    // console.log(user_id);
    const pastes = await Paste.find({ userId: new mongoose.Types.ObjectId(data.id) });
    // console.log(pastes);
    return pastes;
};

module.exports = {
    createNewPaste,
    getPasteById,
    getAllPastes,
    getdefPaste,
};
