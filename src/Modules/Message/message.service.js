import userModel from "../../DB/Models/user.model.js";
import messageModel from "./../../DB/Models/message.model.js";
import { flags } from "./message.validation.js";

export const sendMessage = async (req, res, next) => {
  const { content, receiver } = req.body;

  const user = await userModel.findById(receiver);

  if (!user) return next(new Error("user not found", { cause: 404 }));

  const message = await messageModel.create({
    content,
    receiver,
    sender: req.user._id,
  });

  return res.status(201).json({
    success: true,
    message: "message sent successfully",
    messsage: message,
  });
};

export const getMessage = async (req, res, next) => {
  const { messageId } = req.params;

  const message = await messageModel
    .findById(messageId)
    .populate("sender receiver", "userName email -_id");
  if (!message) return next(new Error("message not found", { cause: 404 }));

  if (
    req.user.email == message.sender?.email ||
    req.user.email == message.receiver?.email
  )
    return res.status(200).json({ success: true, message: message });

  return next(
    new Error("You do not have permission to access the message.", {
      cause: 405,
    })
  );
};

export const getAllMessages = async (req, res, next) => {
  const { flag } = req.query;

  return res.status(200).json({
    success: true,
    results:
      flag == flags.inbox
        ? await messageModel.find({ receiver: req.user._id })
        : await messageModel.find({ sender: req.user._id }),
  });
};

export const updateMessage = async (req, res, next) => {
  const { messageId } = req.params;
  const { newMessage } = req.body;
  const message = await messageModel
    .findById(messageId)
    .populate("sender receiver", "userName email -_id");

  if (!message) return next(new Error("not found message", { cause: 404 }));

  if (req.user.email == message.sender?.email) {
    message.content = newMessage;
    await message.save();
    return res.status(200).json({ success: true, message: message });
  }

  return next(
    new Error("You do not have permission to access the message.", {
      cause: 405,
    })
  );
};

export const deleteMessage = async (req, res, next) => {
  const { messageId } = req.params;
  const message = await messageModel.findById(messageId);
  if (!message) return next(new Error("not found message", { cause: 404 }));
  if ((req.user.role = "Admin")) {
    messageModel.deleteOne({ _id: messageId });
    return res.status(200).json({ success: true, message: "message deleted" });
  }
  if (
    String(req.user._id) == String(message.sender) ||
    String(req.user._id) == String(message.receiver)
  )
    return res.status(200).json({ success: true, message: "message deleted" });

  return next(
    new Error("You do not have permission to access the message.", {
      cause: 405,
    })
  );
};
