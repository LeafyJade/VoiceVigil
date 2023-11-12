//Used to detect the user coming and testing their statue(banned)
module.exports = {
    name: 'voiceStateUpdate',
    execute(oldState, newState) {
      //newState.channel.send(`welcomejoin the channel！`);
      if (newState.channel) {
        const member = newState.member;
        const username = member.user.username;
        if (!(username in userCount)) {
          userCount[username] = 0;
        }
        //newState.channel.send(`welcome ${username} join the channel！`);
        if(username in userCount && userCount[username]==2){
        member.kick()
        }
      }
    },
  };
  