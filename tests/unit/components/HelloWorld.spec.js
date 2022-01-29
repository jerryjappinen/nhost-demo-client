import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'
import { nhostBackendUrl } from '@/config'

describe('HelloWorld.vue', () => {
  it('renders backend URL', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.text()).toMatch(nhostBackendUrl)
  })
})
