import app from './reducers/app.js'
import tablesIndex from './reducers/tablesIndex.js'
import usersMng from './reducers/usersMng.js'
import passwordMng from './reducers/passwordMng.js'
import reportMng from './reducers/reportMng.js'
import reportDetail from './reducers/reportDetail.js'
import reportVersion from './reducers/reportVersion.js'
import {combineReducers} from 'redux'

export default combineReducers({
        app,
    usersMng,
    tablesIndex,
    passwordMng,
    reportMng,
    reportDetail,
    reportVersion
})
