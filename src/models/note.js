import { Schema } from 'mongoose';
import { model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      trim: true,
    },
    tag: {
      type: String,
      required: true,
      enum: [
        'Shopping', 'Meeting', 'Travel', 'Health', 'Work',
        'Finance', 'Personal', 'Ideas', 'Important', 'Todo',
      ],
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('Note', noteSchema);