<script>
import formatFileSize from '@/util/formatFileSize'
import nhost from '@/util/nhost'

export default {

  props: {

    file: {
      type: Object,
      required: true
    },

    thumbnailWidth: {
      type: Number,
      default: 64 * 2 // High-resolution by default
    }

  },

  data () {
    return {
      publicUrl: null,
      timeout: null
    }
  },

  computed: {

    fileUrl () {
      return nhost.storage.getUrl({
        fileId: this.file.id
      })
    },

    // Compose a small thumbnail: set width and height to crop the image
    previewUrl () {
      const imageTransformations = {
        w: this.thumbnailWidth,
        h: this.thumbnailWidth
      }

      const urlParams = Object.keys(imageTransformations).map((key) => {
        return key + '=' + imageTransformations[key]
      })

      return `${this.fileUrl}?${urlParams.join('&')}`
    },

    fileSizeText () {
      return formatFileSize(this.file.size)
    },

    type () {
      return this.file.mimeType.substr(this.file.mimeType.indexOf('/') + 1).toUpperCase()
    }

  }

}
</script>

<template>
  <a
    :href="fileUrl"
    target="_blank"
    class="container"
  >
    <div class="thumbnail">
      <img
        v-if="previewUrl"
        :src="previewUrl"
        :alt="file.name"
        :title="file.name"
      >
    </div>

    <div class="main">
      {{ file.name }}

      <div class="details">
        {{ type }}
        {{ fileSizeText }}
      </div>
    </div>
  </a>
</template>

<style scoped>

.container {
  display: flex;
  align-items: center;
}

.thumbnail {
  width: 64px;
  height: 64px;
  margin-right: 1em;

  border-radius: var(--radius-small);
  overflow: hidden;
}

.thumbnail img {
  width: 100%;
  height: 100%;
}

.main {
  flex-grow: 1;
  flex-shrink: 1;
  margin-right: 1em;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.thumbnail {
  flex-grow: 0;
  flex-shrink: 0;
}

.details {
  color: var(--grey)
}

</style>
