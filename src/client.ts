import axios from 'axios'

export interface RequestInput {
  server_url: string
  title: string
  body: string
  device_key: string
  level: string
  badge: string | null
  automatically_copy: string | null
  copy: string | null
  sound: string | null
  icon: string | null
  group: string | null
  is_archive: string | null
  url: string | null
  github_runs_url: string
}

export interface RequestResponse {
  code: number
  message: string
  timestamp: number
}

export async function request(input: RequestInput): Promise<RequestResponse> {
  let url = input.server_url
  if (!url.endsWith('/')) {
    url += '/'
  }
  url += 'push'

  const res = await axios.post(url, {
    title: input.title,
    body: input.body,
    device_key: input.device_key,
    category: 'category',
    level: input.level,
    badge: input.badge || null,
    automatically_copy: input.automatically_copy || null,
    copy: input.copy || null,
    sound: input.sound || null,
    icon: input.icon || null,
    group: input.group || null,
    is_archive: input.is_archive || null,
    url: input.url || input.github_runs_url
  })
  return res.data as RequestResponse
}
