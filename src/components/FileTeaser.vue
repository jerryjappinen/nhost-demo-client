<script>
import formatFileSize from '@/util/formatFileSize'
import nhost from '@/util/nhost'

export default {

  props: {

    file: {
      type: Object,
      required: true
    },

    width: {
      type: Number,
      default: 80
    }

  },

  data () {
    return {
      publicUrl: null,
      timeout: null
    }
  },

  computed: {

    // NOTE: Our backend does not have public select permissions for files
    privateUrl () {
      return nhost.storage.getUrl({
        fileId: this.file.id
      })
    },

    previewUrl () {
      return `${this.privateUrl}?w=${this.width}`
    },

    fileSizeText () {
      return formatFileSize(this.file.size)
    }

  },

  async created () {
    await this.getPublicUrl()
  },

  beforeUnmount () {
    this.cancelTimeout()
  },

  methods: {

    cancelTimeout () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    },

    startTimeout (duration) {
      if (this.timeout) {
        this.cancelTimeout()
      }

      setTimeout(this.getPublicUrl, duration)
    },

    // Why this?
    async getPublicUrl () {
      const { presignedUrl, error } = await nhost.storage.getPresignedUrl({
        fileId: this.file.id
      })

      if (error) {
        throw error
      }

      // Nhost returns expiration from current moment in seconds
      // We want to renew the URL before it expires
      // Renewing requires networking, so we shave off a couple of seconds to be safe
      this.startTimeout((presignedUrl.expiration - 2) * 1000)

      this.publicUrl = presignedUrl.url
    }

  }

}
</script>

<template>
  <a
    :href="publicUrl"
    target="_blank"
    class="container"
  >
    <div class="thumbnail">
      <img
        :src="previewUrl"
        :alt="file.name"
        :title="file.name"
      >
    </div>

    <div class="main">
      {{ file.name }}
    </div>

    <div class="secondary">
      {{ fileSizeText }}
    </div>
  </a>
</template>

<style scoped>

.container {
  display: flex;
  align-items: center;
}

.main {
  flex-grow: 1;
  flex-shrink: 1;
}

</style>
