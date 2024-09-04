import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    name: {
      type: String,
      required: [true, "username is required"],
      minLength: [3, "username must be at least 3 characters"],
      maxLength: [50, "username must be at most 50 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minLength: [3, "Message must be at least 3 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", MessageSchema);
export default Message;
