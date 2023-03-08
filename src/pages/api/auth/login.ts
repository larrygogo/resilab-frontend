// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const users = [
  {
    username: 'admin',
    password: '123456',
  },
  {
    username: 'user',
    password: '123456',
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body
  if(users.find(u => u.username === username && u.password === password)) {
    res.setHeader('Set-Cookie', `token=${username}; Path=/; HttpOnly`)
    res.status(200).json({ code: 200, message: 'ok' })
    return
  }
  res.status(400).json({ code: 400, message: '用户名或密码错误' })
}
