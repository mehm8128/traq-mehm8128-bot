const CronJob = require('cron').CronJob

module.exports = (robot) => {
  const list = {
    '3/9': '@mehm8128',
    '3/10': '@irori @mehm8128',
    '3/11': '',
    '3/12': '',
    '3/13': '',
    '3/14': '',
    '3/15': '',
    '3/17': '',
    '3/16': '',
    '3/18': '',
    '3/19': '',
    '3/20': '',
    '3/21': '',
    '3/22': '',
    '3/23': '',
    '3/24': '',
    '3/25': '',
    '3/26': '',
    '3/27': '',
    '3/28': '',
    '3/29': '',
    '3/30': '',
    '3/31': '',
    '4/1': '',
    '4/2': '',
    '4/3': '',
    '4/4': '',
    '4/5': '',
    '4/6': '',
    '4/7': '',
    '4/8': '',
    '4/9': '',
    '4/10': '',
    '4/11': '',
    '4/12': '',
    '4/13': '',
    '4/14': '',
    '4/15': '',
    '4/16': '',
    '4/17': '',
    '4/18': '',
    '4/19': '',
    '4/20': '',
    '4/21': '',
    '4/22': '',
    '4/23': '',
    '4/24': '',
    '4/25': '',
    '4/26': '',
    '4/27': '',
    '4/28': '',
    '4/29': '',
    '4/30': '',
  }
  const channelID = 'e93ef204-1e25-4456-90bf-9214a2e6684e'
  //ブログリレーID'22edf673-352f-4f18-88a1-201e681bc483'

  const cron = new CronJob(
    '00 10 * * *',
    () => {
      const today = new Date()
      const todayMonth = today.getMonth() + 1
      const todayDate = today.getDate()
      const todayString = `${todayMonth}/${todayDate}`
      const tommorowString = `${todayMonth}/${todayDate + 1}`
      if (todayString in list && !(tommorowString in list)) {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n${list[todayString]} 今日です\n## 注意！\n- 記事の初めに新歓ブログリレー2022の何日目の記事なのかを書いてください。\n- 記事の最後に次回の担当者の紹介をしてください。\n- 「新歓ブログリレー2022」のタグをつけてください。\n- post imageを設定してください。\n- 分からないことがあれば@ mehm8128まで。`
        )
      } else if (!(todayString in list) && tommorowString in list) {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n今日の担当者はいません\n${list[tommorowString]} 明日です\n 準備をお願いします！`
        )
      } else if (todayString in list && tommorowString in list) {
        robot.send(
          { channelID: channelID },
          `# ブログリレーリマインド\n${list[todayString]} 今日です\n${list[tommorowString]} 明日です\n- 記事の初めに新歓ブログリレー2022の何日目の記事なのかを書いてください。\n- 記事の最後に明日の担当者の紹介をしてください。\n- 「新歓ブログリレー2022」のタグをつけてください。\n- post imageを設定してください。\n- 分からないことがあれば@ mehm8128まで。`
        )
      } else if (!(todayString in list) && !(tommorowString in list)) {
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
