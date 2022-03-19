import axios from 'axios'
import * as client from '../src/client'
import { expect, test, jest } from '@jest/globals'

test('throws invalid number', async () => {
  const resp_data = { code: 200, message: 'success', timestamp: 1647679056 }
  const spy = jest.spyOn(axios, 'post').mockResolvedValue({
    data: resp_data
  })

  const data = await client.request({
    server_url: 'https://example.org',
    title: 'title',
    body: 'body',
    device_key: 'device_key',
    level: 'passive',
    github_runs_url: 'https://example.org'
  })
  expect(spy).toBeCalledTimes(1)
  expect(data).toBe(resp_data)

  expect(spy.mock.calls[0][0]).toBe('https://example.org/push')
  expect(spy.mock.calls[0][1]).toStrictEqual({
    title: 'title',
    body: 'body',
    device_key: 'device_key',
    category: 'category',
    level: 'passive',
    url: 'https://example.org'
  })
})
