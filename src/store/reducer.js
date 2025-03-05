const initialState = {
    // 定义初始状态
    ChatList: []
};
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 处理不同的动作类型，根据动作更新状态
        case 'SETCHATLIST':
            return {
                ...state,
                ChatList:action.payload
            }
        default:
        return state;
    }
};
  
  export default reducer;