import Profile from './Profile'
import Upload from './Upload'
import Uploads from './Uploads'

export default [

  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },

  {
    path: '/',
    name: 'uploads',
    component: Uploads
  },

  {
    path: '/upload/:uploadId',
    name: 'upload',
    component: Upload,
    props: true
  }

]
