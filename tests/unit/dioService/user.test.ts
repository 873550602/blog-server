import { changePasswordByIdController, createUserController, deleteUserByIdController, loginController } from '../../../src/controller/user.js'
import axios from 'axios'
const http = axios.create({ baseURL: 'http://localhost:3000', withCredentials: true })
const account = "43245672@qq.com"
const password = "12345678"
const newPassword = "12345678"
const labels = ['javascript', 'css', 'html']
let cookie;
let id;
const registry = () => {
  return http.post('/registry', {
    account,
    password,
    labels
  }
  )
}
const login = () => {
  return http.post('/login', {
    account,
    password
  })
}

const changePassword = () => {
  return http.post('/users/changePassword', {
    id,
    oldPassword: password,
    newPassword
  })
}

const getUserInfoById = () => {
  return http.get('/users/getUserInfo/' + id)
}

const logout = () => {
  return http.get('/logout/' + id)
}
describe("相关接口测试", () => {
  describe("测试注册，登录，然后删除用户", () => {
    afterAll(() => {

    })
    test('注册', async () => {
      const r = await registry()
      expect(r.data.code).toBe(0)
    })
    test("登录", async () => {
      const r = await login()
      id = r.data.data.id
      expect(r.data.code).toBe(0)
    })
    test('删除一个用户', async () => {
      const r = await deleteUserByIdController(id);
      expect(r.code).toBe(0)
    })
  })

  describe("注册，然后测试接口，最后删除用户", () => {
    beforeEach(async () => {
      console.log("创建用户～～～～～～～～～～～～～～～～～")
      await registry()
      const r = await login()
      id = r.data.data.id
      cookie = r.headers['set-cookie']
      http.defaults.headers['cookie'] = cookie
    })
    afterEach(async () => {
      console.log("删除用户～～～～～～～～～～～～～～～～～")
      await deleteUserByIdController(id)
    })
    test("用户登录", async () => {
      const r = await login()
      expect(r.data.code).toBe(0)
    })
    test("修改密码", async () => {
      const r = await changePassword()
      expect(r.data.code).toBe(0)
    })
    test("退出登录", async () => {
      const r = await logout()
      expect(r.data.code).toBe(0)
    })
    test("根据id获取用户信息", async () => {
      const r = await getUserInfoById()
      expect(r.data.code).toBe(0)
      expect(r.data.data).toMatchObject({
        id,
        account,
        labels,
        password,
      })
    })
  })
})

describe("工具类函数测试", () => {
  test('不可以创建account被使用的用户', async () => {
    const r1 = await createUserController({
      id: 'test_001',
      account: 'test',
      password: '12345678',
      labels: ['javascript', 'css', 'html'],
    });
    const r2 = await createUserController({
      id: 'test_002',
      account: 'test',
      password: '12345678',
      labels: ['javascript', 'css', 'html'],
    });
    expect(r2.code).toBe(-1)
    await deleteUserByIdController('test_001')
  })
  test('不可以创建email已被使用的用户', async () => {
    const r1 = await createUserController({
      id: 'test_001',
      account: 'test1',
      email: '12345678',
      password: '12345678',
      labels: ['javascript', 'css', 'html'],
    });
    const r2 = await createUserController({
      id: 'test_002',
      account: 'test2',
      email: '12345678',
      password: '12345678',
      labels: ['javascript', 'css', 'html'],
    });
    expect(r2.code).toBe(-1)
    await deleteUserByIdController('test_001')
  })
})


