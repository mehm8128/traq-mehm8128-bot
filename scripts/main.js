const fetch = require('node-fetch')
const CronJob = require('cron').CronJob
const { parse } = require('node-html-parser')

module.exports = (robot) => {
  robot.respond(/ping/i, (res) => {
    res.reply('pong!')
  })
  robot.respond(/((何|なに)ができるの？|できること|機能|help)/i, (res) => {
    if (res.message.message.user.name === 'BOT_mehm8128') return
    res.reply(
      '現在できること\n- ping=>pong!\n- help=>できることを教えてくれます\n- AtCoder id=>前回のコンテストの結果を教えてくれます\n- スタンプ押して=> スタンプを押してくれます\n- メッセージに最初にスタンプがつけられたらmehm8128のDMに送信します\n- ABCの開始30分前にmehm8128のtimes/mehm8128にリマインドします\n- 草=>草を生やします。詳しくは[こちら](//q.trap.jp/messages/9d067e64-3e51-40d1-8e48-7d69b54d205e)\n- ブログリレー用のリマインドもあります'
    )
  })
  robot.respond(/AtCoder.*/i, (response) => {
    if (response.message.message.user.name === 'BOT_mehm8128') return
    const userId = response.message.message.plainText.split(' ')[2]
    const url = `https://atcoder.jp/users/${userId}/history/json`
    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        json.reverse()
        const result = json[1]
        response.reply(
          `前回参加した${result.ContestName}の結果はパフォーマンスは${
            result.Performance || 'undefined'
          }で、レートが${result.OldRating}からに${
            result.NewRating
          }に変化しました！`
        )
      })
      .catch((err) => {
        response.reply(err)
      })
  })
  robot.catchAll((res) => {
    if (res.message.type === 'BotMessageStampsUpdated') {
      const messageId = res.message.messageId
      const stamps = res.message.stamps
      if (stamps.length !== 1) return
      if (stamps[0].count !== 1) return
      robot.send(
        { userID: 'c714a848-2886-4c10-a313-de9bc61cb2bb' },
        `https://q.trap.jp/messages/${messageId} で:${
          stamps[stamps.length - 1].stampName
        }:がつけられましたかもしれません`
      )
    }
  })
  robot.respond(/スタンプ押して/, (res) => {
    res.send(
      { type: 'stamp', name: 'blob_pyon_inverse' },
      { type: 'stamp', name: 'blob_pyon' }
    )
  })

  // const atCoderReminder = new CronJob(
  //   '30 20 * * *',
  //   () => {
  //     const today = new Date()
  //     const todayMonth = today.getMonth() + 1
  //     const todayDate = today.getDate()
  //     const url = 'https://atcoder.jp/contests/'
  //     fetch(url)
  //       .then((res) => {
  //         return res.text()
  //       })
  //       .then((data) => {
  //         const root = parse(data)
  //         const time = root
  //           .querySelector('#contest-table-upcoming')
  //           .getElementsByTagName('time')[0].innerText
  //         const month = Number(time.split('-')[1])
  //         const date = Number(time.split('-')[2].split(' ')[0])
  //         const a = root
  //           .querySelector('#contest-table-upcoming')
  //           .getElementsByTagName('a')[1]
  //           .attrs.href.split('/')[2]
  //           .slice(0, 3)
  //         if (month === todayMonth && date === todayDate && a === 'abc') {
  //           robot.send(
  //             { channelID: '5d53eb01-6d08-4d18-9ea6-0ce9f656c608' },
  //             '30分後にABCです！'
  //           )
  //         }
  //       })
  //   },
  //   null,
  //   true,
  //   'Asia/Tokyo'
  // )

  // const mokumokuReminder = new CronJob(
  //   '30 20 * * 2,3',
  //   () => {
  //     robot.send(
  //       { channelID: '5d53eb01-6d08-4d18-9ea6-0ce9f656c608' },
  //       '30分後にもくもくもくもく会です！'
  //     )
  //   },
  //   null,
  //   true,
  //   'Asia/Tokyo'
  // )

  // const GithubWwwReminder = new CronJob(
  //   '00 20 * * *',
  //   () => {
  //     robot.send(
  //       { channelID: '5d53eb01-6d08-4d18-9ea6-0ce9f656c608' },
  //       '@mehm8128 今日もGithubの草を生やしましたか？？'
  //     )
  //   },
  //   null,
  //   true,
  //   'Asia/Tokyo'
  // )
}
