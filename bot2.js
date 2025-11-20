
//Bilingual robots for analysing personal wallets
const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const token = '6501169338:AAE6bCnmoYcLqY8-9UcOvMrba7ay75k0AjM';
const bot = new TelegramBot(token, { polling: true });

// Store watchlist wallets
const watchlistWallets = [];
//const watchlistWallets1 = [];


bot.onText(/\/start/ , (msg) =>{
  const chatId = msg.chat.id;
  //command to get username
  bot.getMe().then(function (info) {
    const mess =(`hello
  ${info.first_name} is ready, the username is @${info.username}
  `)
  //command to choose language
  bot.sendMessage(chatId , mess , {
    reply_markup: {
      inline_keyboard: [

        [{
          text: "English",
          callback_data: 'English' 
          },
          {
          text: "Spanish",
          callback_data: 'Spanish'
                  
        }
      ],

   ]
}
})

    //command to add English and Spannish langauage
    bot.on('callback_query' ,  (callbackQuery) =>{
      const message = callbackQuery.message;
      const category = callbackQuery.data;
      if(category == 'English' ){
        bot.sendMessage(message.chat.id ,'English language',keyboard)
      }else{
        bot.sendMessage(message.chat.id ,'Spanish language' ,keyboard2)
      }

    });  

    // command to set add wallet English keyboard
    bot.onText(/📥 Add Wallet/ ,(msg) => {
      bot.sendMessage(msg.chat.id , 'please enter wallet address:')
      // command to check enter vaild wallet address
      bot.once('text', (walletMsg) => {
        const walletAddress = walletMsg.text;
        // filter wallet address according to length
        if (walletAddress.length == 42){
          watchlistWallets.push(walletAddress);
        }
      // Command to add chains to watchlist
      bot.sendMessage(msg.chat.id, 'please enter the chain:');
      bot.once('text' , (walletMssg) => {
        const walletAddress1 = walletMssg.text;
        watchlistWallets.push(walletAddress1)
        bot.sendMessage(msg.chat.id , ' the chain is added')
              })
      
      })

         
      })

    // command to set addwallet Spanish keyboard
    bot.onText(/📥 Add Spanish/ , (msg) =>{
      bot.sendMessage(msg.chat.id , 'please enter Spanish wallet address')
      // command to check enter vaild wallet address
      bot.once('text', (walletMsg1) => {
        const walletAddress1 = walletMsg1.text;
        // filter wallet address according to length
        if (walletAddress1.length == 42){
            watchlistWallets.push(walletAddress1);
        }

      // Command to add chains to watchlist
      bot.sendMessage(msg.chat.id, 'please enter the chain Spanish language:');
      bot.once('text' , (walletMssg2) => {
        const walletAddress12 = walletMssg2.text;
        watchlistWallets.push(walletAddress12)
        bot.sendMessage(msg.chat.id , ' the chain is added Spanish language')
              })

      })

    })

    // Command to display the watchlist wallets english language
    bot.onText(/👀 Watchlist/  , (msg) => {
      const walletList3 = watchlistWallets.join('\n');
      if (walletList3.length > 0) {
        bot.sendMessage(msg.chat.id, `Watchlist wallets:\n${walletList3}`, keyboard);
        } else {
          bot.sendMessage(msg.chat.id, 'The watchlist is empty.', keyboard);
  }
});

    // Command to display the watchlist wallets Spanish language
    bot.onText(/👀 Watch Spanish/, (msg) => {
      const walletList3 = watchlistWallets.join('\n');
      if (walletList3.length > 0) {
        bot.sendMessage(msg.chat.id, `Watchlist wallets Spanish language :\n${walletList3}`, keyboard);
        } else {
          bot.sendMessage(msg.chat.id, 'The watchlist is empty Spanish language.', keyboard);
  }
});



// Define custom keyboard options with emojis

const keyboard = {
  reply_markup: {
    keyboard: [
      ['📥 Add Wallet','👀 Watchlist', '💰 Bought Positions'],
      ['💳 Sold Positions', '📈 Current Profit'],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};



// command to write keyboard in spanish language
const keyboard2 = {
  reply_markup: {
    keyboard: [
      ['📥 Add Spanish ','👀 Watch Spanish', '💰 Bought Spanish'],
      ['💳 Sold Spanish ', '📈 Current Spanish '],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },
};



// Handle user messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const chatId1 = msg.chat.id;
  const chatId2 = msg.chat.id;
  const chatId22 = msg.chat.id;
  const chatId3 = msg.chat.id;
  const chatId33 = msg.chat.id;

  //command to add Bought positions English language
  if(msg.text === '💰 Bought Positions') {
    // Implement fetching bought positions from an external API here
    const boughtPositions = await fetchBoughtPositions();
    bot.sendMessage(chatId, `Bought Positions:\n${boughtPositions}`, keyboard);
    
    //command to add Bought positions Spanish language
  }else if(msg.text === '💰 Bought Spanish'){
    // Implement fetching bought positions from an external API here
    const boughtPositions1 = await fetchBoughtPositions();
    bot.sendMessage(chatId1, `Bought Positions Spanish language:\n${boughtPositions1}`, keyboard2);
  }

  //command to add sold positions English language
  if (msg.text === '💳 Sold Positions') {
    // Implement fetching sold positions from an external API here
    const soldPositions = await fetchSoldPositions();
    bot.sendMessage(chatId2, `Sold Positions:\n${soldPositions}`, keyboard);

    //command to sold positions Spanish language 
  }else if (msg.text === '💳 Sold Spanish'){
    // Implement fetching sold positions from an external API here
    const soldPositions = await fetchSoldPositions();
    bot.sendMessage(chatId22, `Sold Positions Spanish language:\n${soldPositions}`, keyboard2);
  }

  //command to add Current profit English language
  if (msg.text === '📈 Current Profit') {
    // Implement fetching current profit from an external API here
    const currentProfit = await fetchCurrentProfit();
    bot.sendMessage(chatId3, `Current Profit:\n${currentProfit}`, keyboard);

    //command to add Current profit Spanish language
  }else if(msg.text === '📈 Current Spanish'){
    const currentProfit = await fetchCurrentProfit();
    bot.sendMessage(chatId33, `Current Profit Spanish language:\n${currentProfit}`, keyboard2);

  }
 
});

// Mock functions for fetching data from an external API
async function fetchBoughtPositions() {
  // Replace with actual API call to fetch bought positions
  return 'Position 1: BTC, Position 2: ETH';
}

async function fetchSoldPositions() {
  // Replace with actual API call to fetch sold positions
  return 'Position 1: BTC';
}

async function fetchCurrentProfit() {
  // Replace with actual API call to fetch current profit
  return 'Total profit: $500';
}

});

});

console.log('Bot is running...');




//this code is for me





