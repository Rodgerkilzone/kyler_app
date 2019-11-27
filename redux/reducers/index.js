import {combineReducers} from 'redux'

import token from './token'
import user from './user'
import location from './location'
export default combineReducers({ token, user,location })
// export default  token