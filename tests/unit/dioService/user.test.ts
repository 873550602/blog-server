import { ResponseObj } from 'src/interface/index.js'
import { createUserController, deleteUserByIdController } from '../../../src/controller/user.js'

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
test('不可以创建account已存在的用户', async () => {
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
test('不可以创建email已存在的用户', async () => {
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

