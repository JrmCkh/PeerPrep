const logger = require('./Log');
const { createClient } = require('redis');

class RedisMemory {
  constructor() {
    this.client = createClient();
    this.client.on('error', err => logger.error('Error connecting to Redis'));
  };

  connect = async () => {
    await this.client.connect();
    logger.log('Connected to Redis');
  };

  handleRoomJoining = async (roomId, question, language, code, message) => {
    const data = await this.client.get(roomId);

    // Check if room exists
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.users += 1;
      await parsedData.messages.push(message);
      await this.client.set(roomId, JSON.stringify(parsedData));
      return parsedData;
    } else {
      const newData = {
        question: question,
        language: language,
        users: 1,
        code: code,
        result: '',
        messages: [message],
      };
      await this.client.set(roomId, JSON.stringify(newData));
      return newData;
    }
  };

  handleRoomLeaving = async (roomId) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.users -= 1;
      await this.client.set(roomId, JSON.stringify(parsedData));
    }
  };

  handleQuestionChange = async (roomId, question) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.question = question;
      await this.client.set(roomId, JSON.stringify(parsedData));
    }
  };

  handleCodeChange = async (roomId, code) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.code = code;
      await this.client.set(roomId, JSON.stringify(parsedData));
    }
  };

  handleLanguageChange = async (roomId, language) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.language = language;
      await this.client.set(roomId, JSON.stringify(parsedData));
    }
  };

  handleResultChange = async (roomId, result) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.language = result;
      await this.client.set(roomId, JSON.stringify(parsedData));
    }
  };

  handleButtonDisable = async (roomId, btnState) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.btnState = await btnState;
      await this.client.set(roomId, JSON.stringify(parsedData));
    }
  };

  handleChatMessage = async (roomId, message) => {
    const data = await this.client.get(roomId);
    if (data) {
      const parsedData = JSON.parse(data);
      await parsedData.messages.push(message);
      await this.client.set(roomId, JSON.stringify(parsedData));
    }
  };
};

module.exports = {
  RedisMemory,
};
