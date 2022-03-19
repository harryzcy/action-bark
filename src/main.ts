import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    core.debug(`Debug`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
