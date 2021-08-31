import { Message, MessageReaction, User } from "discord.js"
export default class Paginator {
  static get emojis() {
    return ["⬅", "🛑", "➡"]
  }
  static chunk(array: Array<any>, size: number) {
    const temp = []
    for (let i = 0; i < array.length; i += size) {
      temp.push(array.slice(i, i + size))
    }
    return temp
  }
  static async paginate(message: Message, content: string[], init: boolean = true, page: number = 0) {
    if (init) {
      for (const emoji of this.emojis) {
        await message.react(emoji)
      }
    }

    const filter = (reaction: MessageReaction, user: User) => {
      return this.emojis.includes(reaction.emoji.id as string) && user.id === message.author.id
    }
    const collector = message.createReactionCollector({ max: 1, time: 30000, filter })

    collector.on("collect", (reaction) => {
      reaction.users.remove(message.author)

      const index = this.emojis.indexOf(reaction.emoji.id as string)
      if (index === 0) page--
      if (index === 1) return collector.stop()
      if (index === 2) page++
      page = ((page & content.length) + content.length) % content.length

      const embed = message.embeds[0]
        .setDescription(content[page])
        .setFooter(`Page ${page + 1} of ${content.length}`)
      message.edit({ embeds: [embed] })

      this.paginate(message, content, false, page)
    })
    collector.on("end", (e, reason) => {
      if (reason === 'time' || reason === 'user') return message.reactions.removeAll()
    })
  }
}