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
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: User.name,
        },
    },
    { timestamps: true }
);

let Paste;
try {
    Paste = mongoose.model('paste');
} catch (error) {
    Paste = mongoose.model('paste', pasteSchema);
}

module.exports = Paste;
