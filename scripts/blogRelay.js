const CronJob = require('cron').CronJob

// module.exports = (robot) => {
//   const list = {
//     '3/9': '@mehm8128',
//   }
//   const channelID = ''
//   const cron = new CronJob(
//     '00 10 * * *',
//     () => {
//       const today = new Date()
//       const todayMonth = today.getMonth() + 1
//       const todayDate = today.getDate()
//       const todayString = `${todayMonth}/${todayDate}`
//       const tomorrowString = `${todayMonth}/${todayDate + 1}`
//       if (todayString in list && !(tomorrowString in list)) {
//         robot.send(
//           { channelID: channelID },
//           `# ブログリレーリマインド\n${list[todayString]} 今日です\n## 注意！\n- 記事の初めに新歓ブログリレー2022の**何日目の記事なのか**を書いてください。\n- 記事の最後に**次回の担当者の紹介**をしてください。\n- 「**新歓ブログリレー2022**」のタグをつけてください。\n- **post image**を設定してください。\n- 分からないことがあれば#event/welcome/blog/buriまで。`
//         )
//       } else if (!(todayString in list) && tomorrowString in list) {
//         robot.send(
//           { channelID: channelID },
//           `# ブログリレーリマインド\n今日の担当者はいません\n${list[tomorrowString]} 明日です\n 準備をお願いします！`
//         )
//       } else if (todayString in list && tomorrowString in list) {
//         robot.send(
//           { channelID: channelID },
//           `# ブログリレーリマインド\n${list[todayString]} 今日です\n${list[tomorrowString]} 明日です\n## 注意！\n- 記事の初めに新歓ブログリレー2022の**何日目の記事なのか**を書いてください。\n- 記事の最後に**明日の担当者の紹介**をしてください。\n- 「**新歓ブログリレー2022**」のタグをつけてください。\n- **post image**を設定してください。\n- 分からないことがあれば#event/welcome/blog/buriまで。`
//         )
//       } else if (!(todayString in list) && !(tomorrowString in list)) {
//         robot.send(
//           { channelID: channelID },
//           `# ブログリレーリマインド\n今日も明日も担当者がいません。`
//         )
//       } else {
//         robot.send({ channelID: channelID }, '@mehm8128 エラー発生')
//       }
//     },
//     null,
//     true,
//     'Asia/Tokyo'
//   )
// }
