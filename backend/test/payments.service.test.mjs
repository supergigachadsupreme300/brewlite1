import test, { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { PaymentsService } = require('../dist/modules/payments/payments.service.js')

describe('Backend PaymentsService - Idempotency (Task 10)', () => {
  it('should return the existing payment when the idempotency key was already used', async () => {
    const existing = { id: 'pay1', orderId: 'o1', method: 'WALLET', status: 'SUCCESS' }
    const mockPrisma = {
      payment: {
        findUnique: async () => existing,
      },
    }
    const service = new PaymentsService(mockPrisma)
    const result = await service.processPayment({
      orderId: 'o1',
      method: 'WALLET',
      idempotencyKey: 'key-1',
    })
    assert.equal(result, existing)
  })

  it('should throw ConflictException when the same key is reused for a different order/method', async () => {
    const existing = { id: 'pay1', orderId: 'o1', method: 'WALLET', status: 'SUCCESS' }
    const mockPrisma = {
      payment: {
        findUnique: async () => existing,
      },
    }
    const service = new PaymentsService(mockPrisma)
    await assert.rejects(
      async () => {
        await service.processPayment({
          orderId: 'o2',
          method: 'CARD',
          idempotencyKey: 'key-1',
        })
      },
      { name: 'ConflictException' },
    )
  })
})