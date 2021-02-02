# boticord-api
Враппер который позволяет вам взаимодействовать с [Boticord API](https://boticord.top/api/v1).

## Установка
```sh
$ npm install boticord-api
```

## Работа с враппером
```js
const Discord = require('discord.js')
const client = new Discord.Client()

const Boticord = require("boticord-api");
const boticord = new Boticord(key, client);
```
Key - можно взять на странице редактирования вашего бота

## Примеры
```js
// Все боты разработчика
boticord.developer("802143987594952706").then(res => {
  console.log(res);
    /* {
        bots: 1,
        api: [{
            id: '717735839437946991', 
            shortCode: 'flight'
        }]
    } */
});

// Комментарии к боту
boticord.comments("573119175829225482").then(res => {
   console.log(res);
   // Если нет комментариев

   /* 'Данные отсутствуют' */

   // Если есть комментарии
   /* 
   {
        comments: 3,
        api: [{
            userID: '515551959311450123',
            text: 'неподкупный комментарий',
            vote: 'WHAT',
            isUpdated: false,
            createdAt: 1610736503164
        }] 
   } 
   */
});

// Получить информацию о боте или о своём боте (если нет в функции id бота)
boticord.bot("717735839437946991").then((data) => {
    console.info(data);
    /*
    {
    id: '717735839437946991',
    name: 'flight',
    links: [
        'https://boticord.top/bot/717735839437946991',
        'https://boticord.top/bot/flight',
    ],
    bumps: 1,
    description: {
        short: '...',
        long: '...'
    },
    prefix: 'f.',
    permissions: 2146958847,
    tags: [ 
        'Утилиты', 
        'Нейросеть', 
        'Другое'
    ],
    developers: [ 
        '802143987594952706' 
    ],
    supportserver: 'https://discord.gg/6kTxQGBpZn',
    github: '' //если есть,
    site: '' //если есть
    } 
    */
});

// Отправлять статистику на мониторинг каждые 15 минут
boticord.statsAutoPost({ servers: 3000, shards: 2, users: 120200 });

// Отправить статистику 1 раз
boticord.statsPost({ servers: 3000, shards: 2, users: 120200 });
```