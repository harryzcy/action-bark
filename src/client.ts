import axios from 'axios'

export interface RequestInput {
  server_url: string
  title: string
  body: string
  device_key: string
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
    url: input.github_runs_url
  })
  return res.data
}
