import { NhostClient } from '@nhost/nhost-js'
import { nhostBackendUrl } from '../config'

export default new NhostClient({
  backendUrl: nhostBackendUrl
})
