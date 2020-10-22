module.exports = (client) => {
    console.log(client.user.username + " is Online");
    client.user.setActivity(`bla bla bla`, { type: "" }); //For type u can choose WATCHING, STREAMING, LISTENING, or PLAYING

};