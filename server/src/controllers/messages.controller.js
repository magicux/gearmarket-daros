const messagesModel = require('../models/messages.model');

async function createMessage(req, res, next) {
  try {
    const receiverId = Number(req.body.receiver_id);
    const publicationId = Number(req.body.publication_id);

    if (receiverId === Number(req.user.id)) {
      return res.status(400).json({
        message: 'No puedes enviarte mensajes a ti mismo',
      });
    }

    const createdMessage = await messagesModel.createMessage({
      sender_id: req.user.id,
      receiver_id: receiverId,
      publication_id: publicationId,
      message: req.body.message,
    });

    return res.status(201).json({
      message: 'Mensaje enviado correctamente',
      data: createdMessage,
    });
  } catch (error) {
    return next(error);
  }
}

async function getConversations(req, res, next) {
  try {
    const conversations = await messagesModel.getConversationsByUserId(req.user.id);
    return res.status(200).json(conversations);
  } catch (error) {
    return next(error);
  }
}

async function getThread(req, res, next) {
  try {
    const publicationId = Number(req.params.publicationId);
    const counterpartId = Number(req.params.userId);

    const messages = await messagesModel.getConversationMessages({
      userId: Number(req.user.id),
      publicationId,
      counterpartId,
    });

    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
}

module.exports = { createMessage, getConversations, getThread };
