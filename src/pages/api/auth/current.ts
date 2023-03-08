// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const users = [
  {
    username: 'admin',
    role: 'admin',
    password: '123456',
  },
  {
    username: 'user',
    role: 'user',
    password: '123456',
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 从cookies获取token
  const token = req.cookies.token
  const user = users.find(u => u.username === token)
  if(user) {
    const {password, ...currentUser} = user
    res.status(200).json({ code: 200, message: 'ok', data: currentUser })
    return
  }
  res.status(400).json({ code: 400, message: '用户名或密码错误' })
}
