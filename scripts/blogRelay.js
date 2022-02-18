const CronJob = require('cron').CronJob

module.exports = (robot) => {
  const list = {
    '2/18': '@mehm8128',
    '2/19': '@mehm81',
    '2/20': '@mehm',
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
