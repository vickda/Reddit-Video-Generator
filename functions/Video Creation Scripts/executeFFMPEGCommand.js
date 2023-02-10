let spawn = require('child_process').spawnSync
// const { exec } = require('child_process')

const executeFFMPEGCommand = (command) => {
  try {
    let proc = spawn('C:/path_ffmpeg/ffmpeg', command)
    // console.log('standard output => ' + proc.output)
    console.log('spawn command executed')

    return `Command Successfully Executed`
  } catch (error) {
    return `Command Failed Due To ${error}`
  }

  // return new Promise((resolve, reject) => {
  //   let proc = spawn('C:/path_ffmpeg/ffmpeg', args)
  //   proc.stdout.on('data', data)
  //   // proc.stderr.setEncoding('utf8')
  //   proc.stderr.on('data', (err) => console.log(err))
  //   proc.on('close', onFinish)
  // })
}

module.exports = executeFFMPEGCommand
