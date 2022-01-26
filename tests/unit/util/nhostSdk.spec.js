import nhost from '@/util/nhost'

describe('nhost', () => {
  it('has query method', () => {
    expect(nhost.graphql.request).toBeTruthy()
  })

  it('has auth namespace', () => {
    expect(nhost.auth).toBeTruthy()
  })
})
