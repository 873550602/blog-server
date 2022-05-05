import { ResponseObj } from 'src/interface/index.js'
import { changePasswordByIdController, createUserController, deleteUserByIdController, loginController } from '../../../src/controller/user.js'

test('创建用户', async () => {
  const r = await createUserController({
    id: 'test_001',
    account: 'test',
    password: '12345678',
    labels: ['javascript', 'css', 'html'],
  })
  expect(r.code).toBe(0)
})

test('删除一个用户', async () => {
  const r = await deleteUserByIdController('test_001');
  expect(r.code).toBe(0)
})

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

describe("先创建用户，然后测试接口，最后删除用户", () => {
  const id = 'test_01'
  const account = 'test'
  const password = '12345678'
  const labels = ['javascript', 'css', 'html']
  const newPassord = "87654321"
  beforeEach(async () => {
    console.log("创建用户～～～～～～～～～～～～～～～～～")
    const r1 = await createUserController({
      id,
      account,
      password,
      labels,
    });
  })
  afterEach(async () => {
    console.log("删除用户～～～～～～～～～～～～～～～～～")
    await deleteUserByIdController(id)
  })

  test("用户登录", async () => {
    const r = await loginController(account, password)
    expect(r.code).toBe(0)
  })

  test("修改密码", async () => {
    const r = await changePasswordByIdController(id, newPassord, password)
    expect(r.code).toBe(0)
  })
})


