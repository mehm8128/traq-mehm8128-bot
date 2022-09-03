const CronJob = require('cron').CronJob

module.exports = (robot) => {
  const list = {
    '8/10': '@mehm8128',
    '8/11': '@dan_dan',
    '8/12': '@season1618',
    '8/13': '@logica',
    '8/14': '@sabanishi',
    '8/15': '@Takeno_hito',
    '8/16': '@wataame89',
    '8/17': '@urturn',
    '8/18': '@yukikurage',
    '8/19': '@yashu',
    '8/20': '@mehm8128 @itt',
    '8/21': '@Ras',
    '8/22': '@Swan_417',
    '8/23': '@zer0-star',
    '8/24': '@yashu',
    '8/25': '@s9',
    '8/26': '@sappi_red',
    '8/27': '@Imperi',
    '8/28': '@pikachu',
    '8/29': '@kats',
    '8/30': '@tatyam',
    '8/31': '@mehm8128',
    '9/1': '@kashiwade',
    '9/2': '@Kejun',
    '9/3': '@toruthi',
    '9/4': '',
    '9/5': '@Kitaju',
    '9/6': '@d_etteiu8383',
    '9/7': '@inutamago_dogegg',
    '9/8': '@tax_free',
    '9/9': '@dogwood_flo',
    '9/10': '@liquid1224',
    '9/11': '@mehm8128',
    '9/12': '@Asumar',
    '9/13': '@chuukunn',
    '9/14': '@irori',
    '9/15': '',
    '9/16': '',
    '9/17': '',
    '9/18': '',
    '9/19': '',
    '9/20': '@H1rono_K',
    '9/21': '',
    '9/22': '@ikura-hamu',
    '9/23': '@ikura-hamu',
    '9/24': '',
    '9/25': '',
    '9/26': '',
    '9/27': '',
    '9/28': '',
    '9/29': '',
    '9/30': '@mehm8128',
  }
  const channelID = '706f39fe-83f6-4f66-873d-4a8153e441a3'

  const cron = new CronJob(
    '00 10 * * *',
    () => {
      const today = new Date()
      const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24)
      const todayMonth = today.getMonth() + 1
      const todayDate = today.getDate()
      const tomorrowMonth = tomorrow.getMonth() + 1
      const tomorrowDate = tomorrow.getDate()
      const todayString = `${todayMonth}/${todayDate}`
      const tomorrowString = `${tomorrowMonth}/${tomorrowDate}`
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
