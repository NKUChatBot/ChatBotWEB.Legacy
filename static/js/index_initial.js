window.onload = function () {
    let pool = new PoolManager(4);

    let chatbot = new ChatbotManager();

    let initsender = new MessageSender();
    initsender.getChatbotGreet('init');
    initsender.sendChatbotMessage(chatbot.CurrentMood);

    let typer = new TypingListener();
    typer.startListen(chatbot);

};
