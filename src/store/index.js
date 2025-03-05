import { createStore, combineReducers, applyMiddleware } from'redux';
import { thunk } from 'redux-thunk';
import reducer from './reducer';

// 将 reducer 合并
const rootReducer = combineReducers({
  // 这里使用您定义的 reducer
  myReducer: reducer
});

// 创建 store，并应用中间件
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store