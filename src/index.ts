import * as client from './client'
import * as core from '@actions/core'
import { generateNotification } from './notification'

interface Inputs {
  status: string
  on_status: string
  title: string
  body: string
  device_key: string
  level: string
  badge: string
  automatically_copy: string
  copy: string
  sound: string
  icon: string
  group: string
  is_archive: string
  url: string
  bark_server_url: string
  github_server_url: string
}

function readInputs(): Inputs {
  return {
    // status: success | failure | cancelled
    status: core.getInput('status', { required: true }).toLowerCase(),
    on_status: core.getInput('on_status').toLowerCase(),
    title: core.getInput('title'),
    body: core.getInput('body'),
    device_key: core.getInput('device_key', { required: true }),
    level: core.getInput('level'),
    badge: core.getInput('badge'),
    automatically_copy: core.getInput('automatically_copy'),
    copy: core.getInput('copy'),
    sound: core.getInput('sound'),
    icon: core.getInput('icon'),
    group: core.getInput('group'),
    is_archive: core.getInput('is_archive'),
    url: core.getInput('url'),
    bark_server_url: core.getInput('bark_server_url', { required: true }),
    github_server_url: core.getInput('github_server_url')
  }
}

function debugInputs(inputs: Readonly<Inputs>): void {
  for (const [name, value] of Object.entries(inputs)) {
    core.debug(`${name}: ${value}`)
  }
}

async function run(): Promise<void> {
  try {
    const inputs = readInputs()
    debugInputs(inputs)

    const on_status_all = inputs.on_status.split(',').map(e => e.trim())
    if (!on_status_all.includes(inputs.status) && inputs.on_status !== 'all')
      return

    const notification = generateNotification({
      status: inputs.status,
      title: inputs.title,
      body: inputs.body,
      github_server_url: inputs.github_server_url
    })

    await client.request({
      server_url: inputs.bark_server_url,
      title: notification.title,
      body: notification.body,
      device_key: inputs.device_key,
      level: inputs.level,
      badge: inputs.badge,
      automatically_copy: inputs.automatically_copy,
      copy: inputs.copy,
      sound: inputs.sound,
      icon: inputs.icon,
      group: inputs.group,
      is_archive: inputs.is_archive,
      url: inputs.url,
      github_runs_url: notification.github_runs_url
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

await run()
