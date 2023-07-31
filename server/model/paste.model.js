const { Schema, default: mongoose } = require('mongoose');
const User = require('./user.model');

const pasteSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
            default: null,
            sparse: true,
            index: {
                unique: true,
                partialFilterExpression: { title: { $type: 'string' } },
            },
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: User.name,
        },
    },
    { timestamps: true }
);
console.log('user', User.name);
let Paste;
try {
    Paste = mongoose.model('paste');
} catch (error) {
    Paste = mongoose.model('paste', pasteSchema);
}

module.exports = Paste;
