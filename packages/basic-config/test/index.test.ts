import { expect, it } from 'vitest'
import { defineProjectConfig, getProjectConfig, getRequestConfig } from '../src'

it('should work', () => {
  defineProjectConfig({
    baseUrl: '/api',
    request: {
      success: ['00000', '0'],
    },
  })
  const config = getProjectConfig()
  expect(config).toMatchInlineSnapshot(`
    {
      "baseUrl": "/api",
      "request": {
        "success": [
          "00000",
          "0",
        ],
      },
    }
  `)
  const requestConfig = getRequestConfig()
  expect(requestConfig).toMatchInlineSnapshot(`
    {
      "baseUrl": "/api",
      "contentType": "application/json;charset=UTF-8",
      "field": {
        "code": "code",
        "data": "data",
        "message": "message",
      },
      "header": [Function],
      "mask": false,
      "mergeType": "replace",
      "paramType": "text",
      "preprocess": [Function],
      "success": [
        "00000",
        "0",
      ],
      "timeout": 10000,
    }
  `)
})
