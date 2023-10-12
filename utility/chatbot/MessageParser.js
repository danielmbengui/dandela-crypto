class MessageParser {
  constructor(actionProvider, lang) {
    this.actionProvider = actionProvider;
    this.lang = lang;
  }

  parse(message, lang) {
    this.actionProvider.greet(this.lang);
  }
}

export default MessageParser;
