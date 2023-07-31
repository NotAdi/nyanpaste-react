const { pasteService } = require('../services');
const { asyncHandler } = require('../utils/utils');

const createNewPaste = asyncHandler(async (req, res) => {
    return res.status(201).json(await pasteService.createNewPaste(req, res));
});

const getPasteById = asyncHandler(async (req, res) => {
    return res.status(200).json(await pasteService.getPasteById(req.params.id));
});

const getAllPastes = asyncHandler(async (req, res) => {
    // console.log("inside paste controller");
    return res
        .status(200)
        .json(await pasteService.getAllPastes(req, res));
});

const defPaste= asyncHandler(async (req, res) => {
    // console.log("inside paste controller");
    return res
        .status(200)
        .json(await pasteService.getdefPaste(req, res));
});

module.exports = {
    createNewPaste,
    getPasteById,
    getAllPastes,
    defPaste,
};
