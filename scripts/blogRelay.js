const CronJob = require('cron').CronJob

module.exports = (robot) => {
  const list = {
    '11/25': '@mehm8128',
    '11/26': '@Uzaki',
    '11/27': '@oribe',
    '11/28': '',
    '11/29': '@Ras',
    '11/30': '@helgev',
    '12/1': '@Hosoi',
    '12/2': '@ikura-hamu',
    '12/3': '@kamecha',
    '12/4': '@pikachu',
    '12/5': '@mehm8128',
    '12/6': '@s9',
    '12/7': '@inutamago_dogegg',
    '12/8': '@Uzaki @inutamago_dogegg',
    '12/9': '@Hmcmch',
    '12/10': '@YHz_ikiri',
    '12/11': '@quesera @noc7t',
    '12/12': '@Hinaruhi @ryoha',
    '12/13': '@d_etteiu8383 @YHz_ikiri',
    '12/14': '@Takeno_hito',
    '12/15': '@mera',
    '12/16': '@nosaerc',
    '12/17': '@H1rono_K @kitaju',
    '12/18': '@hijiki51',
    '12/19': '@toshi00',
    '12/20': '@dan_dan',
    '12/21': '@mehm8128',
    '12/22': '@toruthi @irori',
    '12/23': '@Uzaki',
    '12/24': '@ikura-hamu',
    '12/25': '',
    '12/26': '',
  }
  const channelID = '706f39fe-83f6-4f66-873d-4a8153e441a3'
  //const channelID = '5d53eb01-6d08-4d18-9ea6-0ce9f656c608'

  const cron = new CronJob(
    '17 13 * * *',
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
          `# アドベントカレンダーリマインド\n${list[todayString]} 今日です\n明日の担当者がいません。誰かお願いします\n## 注意！\n- 記事の初めにアドベントカレンダーの**何日目の記事なのか**を書いてください。\n- 記事の最後に**次回の担当者の紹介**をしてください。\n- 「**アドベントカレンダー2022**」のタグをつけてください。\n- **post image**を設定してください。\n- 分からないことがあれば#event/AdventCalendar/buri まで。`
        )
      } else if (list[todayString] === '' && list[tomorrowString] !== '') {
        robot.send(
          { channelID: channelID },
          `# アドベントカレンダーリマインド\n今日の担当者はいません。:oisu-1::oisu-2::exclamation:\n${list[tomorrowString]} 明日です\n 準備をお願いします！`
        )
      } else if (list[todayString] !== '' && list[tomorrowString] !== '') {
        robot.send(
          { channelID: channelID },
          `# アドベントカレンダーリマインド\n${list[todayString]} 今日です\n${list[tomorrowString]} 明日です\n## 注意！\n- 記事の初めにアドベントカレンダーの**何日目の記事なのか**を書いてください。\n- 記事の最後に**明日の担当者の紹介**をしてください。\n- 「**アドベントカレンダー2022**」のタグをつけてください。\n- **post image**を設定してください。\n- 分からないことがあれば#event/AdventCalendar/buri まで。`
        )
      } else if (list[todayString] === '' && list[tomorrowString] === '') {
        robot.send(
          { channelID: channelID },
          `# アドベントカレンダーリマインド\n今日も明日も担当者がいません。`
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
