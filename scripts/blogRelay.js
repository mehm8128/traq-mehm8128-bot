const CronJob = require('cron').CronJob

module.exports = (robot) => {
  const list = {
    '11/25': '@mehm8128',
    '11/26': '@Uzaki',
    '11/27': '@oribe',
    '11/28': '',
    '11/29': '@Ras',
    '11/30': '@helgev',
    '12/01': '@Hosoi',
    '12/02': '',
    '12/03': '',
    '12/04': '@pikachu',
    '12/05': '',
    '12/06': '@s9',
    '12/07': '@inutamago_dogegg',
    '12/08': '@Uzaki @inutamago_dogegg',
    '12/09': '@Hmcmch',
    '12/10': '@YHz_ikiri',
    '12/11': '@quesera @noc7t',
    '12/12': '@Hinaruhi',
    '12/13': '@d_etteiu8383',
    '12/14': '@Takeno_hito',
    '12/15': '@mera',
    '12/16': '@nosaerc',
    '12/17': '@H1rono_K',
    '12/18': '@hijiki51',
    '12/19': '@toshi00',
    '12/20': '@dan_dan',
    '12/21': '@mehm8128',
    '12/22': '@toruthi',
    '12/23': '@Uzaki',
    '12/24': '@ikura-hamu',
    '12/25': '',
  }
  const channelID = '706f39fe-83f6-4f66-873d-4a8153e441a3'

  const cron = new CronJob(
    '40 10 * * *',
    () => {
      const today = new Date()
      const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24)
      const todayMonth = today.getMonth() + 1
      const todayDate = today.getDate()
      const tomorrowMonth = tomorrow.getMonth() + 1
      const tomorrowDate = tomorrow.getDate()
      const todayString = `${todayMonth}/${todayDate}`
      const tomorrowString = `${tomorrowMonth}/${tomorrowDate}`
      if (
        list[todayString] === undefined ||
        list[tomorrowString] === undefined
      ) {
        return
      }
      if (list[todayString] !== '' && list[tomorrowString] === '') {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n${list[todayString]} 今日です\n## 注意！\n- 記事の初めに夏のブログリレーの**何日目の記事なのか**を書いてください。\n- 記事の最後に**次回の担当者の紹介**をしてください。\n- 「**夏のブログリレー**」のタグをつけてください。\n- **post image**を設定してください。\n- 分からないことがあれば#event/AdventCalendar/buri まで。`
        )
      } else if (list[todayString] === '' && list[tomorrowString] !== '') {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n今日の担当者はいません\n${list[tomorrowString]} 明日です\n 準備をお願いします！`
        )
      } else if (list[todayString] !== '' && list[tomorrowString] !== '') {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n${list[todayString]} 今日です\n${list[tomorrowString]} 明日です\n## 注意！\n- 記事の初めに夏ブログリレーの**何日目の記事なのか**を書いてください。\n- 記事の最後に**明日の担当者の紹介**をしてください。\n- 「**夏のブログリレー**」のタグをつけてください。\n- **post image**を設定してください。\n- 分からないことがあれば#event/AdventCalendar/buri まで。`
        )
      } else if (list[todayString] === '' && list[tomorrowString] === '') {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n今日も明日も担当者がいません。`
        )
      } else {
        robot.send({ channelID: channelID }, '@mehm8128 エラー発生')
      }
    },
    null,
    true,
    'Asia/Tokyo'
  )
}
