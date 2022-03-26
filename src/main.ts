import * as client from './client'
import * as core from '@actions/core'
import { generateNotification } from './notification'

async function run(): Promise<void> {
  try {
    // status: success | failure | cancelled
    const status = core.getInput('status', { required: true }).toLowerCase()
    const on_status = core.getInput('on_status').toLowerCase()
    const title = core.getInput('title')
    const body = core.getInput('body')
    const device_key = core.getInput('device_key', { required: true })
    const level = core.getInput('level')
    const bark_server_url = core.getInput('bark_server_url', { required: true })
    const github_server_url = core.getInput('github_server_url')

    core.debug(`status: ${status}`)
    core.debug(`on_status: ${on_status}`)
    core.debug(`title: ${title}`)
    core.debug(`body: ${body}`)
    core.debug(`device_key: ${device_key}`)
    core.debug(`level: ${level}`)
    core.debug(`bark_server_url: ${bark_server_url}`)
    core.debug(`github_server_url: ${github_server_url}`)

    const on_status_all = on_status.split(',').map(e => e.trim())
    if (!on_status_all.includes(status) && on_status !== 'all') return

    const notification = generateNotification({
      status,
      title,
      body,
      github_server_url
    })

    client.request({
      server_url: bark_server_url,
      title: notification.title,
      body: notification.body,
      device_key,
      level,
      github_runs_url: notification.github_runs_url
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
