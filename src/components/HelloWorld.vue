<script>
import { isDev, baseUrl, nhostBackendUrl } from '@/config'

export default {
  name: 'HelloWorld',

  data () {
    return {
      dump: {
        isDev,
        baseUrl,
        nhostBackendUrl
      }
    }
  }
}
</script>

<template>
  <div class="hello">
    <h1>Hello World</h1>

    <pre><code>{{ dump }}</code></pre>
  </div>
</template>

<style scoped></style>
