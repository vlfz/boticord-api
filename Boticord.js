const request = require('./functions/request');

let paths = 'https://boticord.top/api'

/*
ничего лучше я не смог придумать....
*/

class Boticord {
    constructor(token, client) {

    if(!token) return console.log("[boticord] Укажите ключ вашего бота!");
    
    this.api = paths
    
    Object.defineProperty(this, 'key', { writable: true });
    Object.defineProperty(this, 'client', { writable: true });

    this.key = token
    this.client = client
    }
    
    async bot(id) {
        if(!id){
        const data = await request(`${paths}/v1/bot/${this.client.user.id}`,{
            method: 'GET',
            headers: { Authorization: this.key }
        })

        const res = {
        id: data.id,
        name: data.shortCode,
        links: data.links,
        bumps: data.information.bumps,
        description: data.information.description,
        prefix: data.information.prefix,
        permissions: data.information.permissions,
        tags: data.information.tags,
        developers: data.information.developers
        }

        if(data.information.links.discord !== null) res.supportserver = data.information.links.discord
        if(data.information.links.site !== null) res.site = data.information.links.site
        if(data.information.links.github !== null) res.github = data.information.links.github

        return res;

       } else {

        const data = await request(`${paths}/v1/bot/${id}`,{
            method: 'GET',
            headers: { Authorization: this.key }
        })

        const res = {
        id: data.id,
        name: data.shortCode,
        links: data.links,
        bumps: data.information.bumps,
        description: data.information.description,
        prefix: data.information.prefix,
        permissions: data.information.permissions,
        tags: data.information.tags,
        developers: data.information.developers
        }

        if(data.information.links.discord !== null) res.supportserver = data.information.links.discord
        if(data.information.links.site !== null) res.site = data.information.links.site
        if(data.information.links.github !== null) res.github = data.information.links.github

        return res;

       }
    }

    async statsPost(options={}){
      if(!options.servers && !options.shards) return console.log('Укажите server и shards. Это обязательно!')
      if(options.shards && options.servers < 0) return console.log('Shards или servers не может быть меньше 0. Укажите другое значение')
      if(options.shards === 0 || options.servers === 0) return console.log('Shards или servers не может быть равно 0. Укажите другое значение')

      let data = {
          servers: options.servers,
          shards: options.shards
      }
      if(options.users) data.users = options.users

      return await request(`${paths}/stats`, {
        method: 'POST',
        headers: { Authorization: this.key },
        json: data
      })
    }

    async statsAutoPost(options={}) {
      if(!options.servers && !options.shards) return console.log('Укажите server и shards. Это обязательно!')
      if(options.shards && options.servers < 0) return console.log('Shards или servers не может быть меньше 0. Укажите другое значение')
      if(options.shards === 0 || options.servers === 0) return console.log('Shards или servers не может быть равно 0. Укажите другое значение')

      let data = {
          servers: options.servers,
          shards: options.shards
      }
      if(options.users) data.users = options.users
      
      return setInterval(async () => {
        return await request(`${paths}/stats`, {
            method: 'POST',
            headers: { Authorization: this.key },
            json: data
        })
      }, 900000)
    }

    async comments(id) {    
        if(!id) return console.log("[boticord] Укажите ID бота!");

        let res = request(`${paths}/v1/bot/${id}/comments`,{
            method: 'GET',
            headers: { Authorization: this.key }
        })

        if(res.length === undefined) return 'Данные отсутствуют';
        if(res.length !== undefined) return { comments: res.length, api: res };
    }

    async developer(id) {
        if(!id) return console.log("[boticord] Укажите ID разработчика!");

        let res = await request(`${paths}/v1/bots/${id}`,{
            method: 'GET',
            headers: { Authorization: this.key }
        })


        if(res[0] === undefined) return 'Данные отсутствуют';
        if(res[0] !== undefined) return { bots: res.length, api: res };
    }
}
module.exports = Boticord