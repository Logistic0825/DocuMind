// import LayoutPage from "@/pages/Layout";
// import React, { useEffect, useState } from 'react';
// import { PlusOutlined, WechatFilled } from '@ant-design/icons';
// import { Button, Image, Input, message, Space, Upload } from 'antd';
// import { ChatImageToJSON } from "@/pages/apis";
// import './index.css'
// import { useDispatch } from "react-redux";
// import { setChatList } from "@/store/action";


// const ImgInput = ({ value, onChange, onSubmit }) => {
//     return (
//         <Space.Compact
//             className="my-1  rounded-md flex  p-1"
//         >
//             <Input
//                 placeholder="请输入图片url，没有的话就用图床上传图片获取url"
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//             />
//             <Button className="bg-purple-500 text-white" onClick={onSubmit}>
//                 解析聊天记录图片URL
//             </Button>
//         </Space.Compact>
//     );
// };

// const ChatMsgExtract = () => {
//     const dispatch = useDispatch()
//     const [urls, setUrls] = useState(['']);
//     const [loading, setLoading] = useState(false);
//     const [responseData, setResponseData] = useState(null);
//     const [error, setError] = useState(null);

//     const [chatArray, setChatArray] = useState([''])

//     const handleInputChange = (index, value) => {
//         const newUrls = [...urls];
//         newUrls[index] = value;

//         // 如果输入框内容为空且不是唯一的输入框，移除该输入框
//         if (!value && newUrls.length > 1) {
//             newUrls.splice(index, 1);
//         }

//         // 如果当前输入框填满且是最后一个输入框，添加一个新的输入框
//         if (value && index === newUrls.length - 1) {
//             newUrls.push('');
//         }

//         setUrls(newUrls);
//     };

//     const handleSubmit = async () => {
//         // 过滤掉空的 URL
//         const validUrls = urls.filter(url => url.trim()!== '');
//         console.log('提交的图片 URL:', validUrls);

//         if (validUrls.length === 0) {
//             setError('请输入有效的图片 URL');
//             return;
//         }

//         setLoading(true);
//         setError(null);
//         setResponseData(null);
//         // https://img.picui.cn/free/2025/03/04/67c7194b7f579.png
//         // https://img.picui.cn/free/2025/03/05/67c726bdec5d2.png
//         // https://img.picui.cn/free/2025/03/05/67c726bdeb2ab.png
//         // https://img.picui.cn/free/2025/03/05/67c726bdea1e8.png
//         // https://img.picui.cn/free/2025/03/05/67c726bded87c.png
//         try {
//             // 并发请求
//             const promises = validUrls.map(url => ChatImageToJSON(url));
//             const results = await Promise.all(promises);
//             const resList = results.map(item=>item.data)
//             setResponseData(resList);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 处理responseData
//     useEffect(()=>{
//         console.log(responseData);
//         // 解析 JSON 字符串并合并数组
//         if(!responseData){
//             return
//         }
//         const mergedArray = responseData.reduce((acc, current) => {
//             const parsedArray = JSON.parse(current);
//             return acc.concat(parsedArray);
//         }, []);
        
//         // 去重操作
//         const uniqueArray = [];
//         const seen = new Set();
//         mergedArray.forEach(item => {
//             const key = JSON.stringify(item);
//             if (!seen.has(key)) {
//             seen.add(key);
//             uniqueArray.push(item);
//             }
//         });
        
//         console.log(uniqueArray);
//         setChatArray(prevChatArray => [...prevChatArray, ...uniqueArray])
//         // setChatArray(uniqueArray)
//     }, [responseData])

//     const handleEmotionAnalysis = () => {
//         dispatch(setChatList(chatArray))
//         message.success('情感分析数据导入成功')
//     }

//     return (
//         <div>
//             <LayoutPage>
//                 {urls.map((url, index) => (
//                     <ImgInput
//                         key={index}
//                         value={url}
//                         onChange={(value) => handleInputChange(index, value)}
//                         onSubmit={handleSubmit}
//                     />
//                 ))}
//                 <Button className="bg-purple-500 text-white" onClick={handleSubmit} loading={loading}>
//                     一键提交
//                 </Button>
//                 {error && <p style={{ color:'red' }}>{error}</p>}
//                 <div className="bg-white border border-gray-300 rounded-lg h-3/5 w-full max-w-screen-lg overflow-y-auto p-4 mb-4">
//                     {chatArray && chatArray.map((item, index) => (
//                         <div>
//                             <p
//                                 key={index}
//                                 className={item.user === 'userA' ? 'user-a-message' : 'user-b-message'}
//                                 // TODO:实现对每个item可以删改，可以上方或者下方插入
//                             >
//                                 <span className="user-name">{item.user}: </span>
//                                 <span className="message-text">{item.text}</span>
//                                 <Button>删除</Button>
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//                 <Button className="bg-purple-500 text-white" onClick={handleEmotionAnalysis}>情感分析</Button>
                
//             </LayoutPage>
//         </div>
//     );
// };

// export default ChatMsgExtract;
import LayoutPage from "@/pages/Layout";
import React, { useEffect, useState } from 'react';
import { PlusOutlined, WechatFilled, UpOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Image, Input, Space, Upload, Tooltip } from 'antd';
import { ChatImageToJSON } from "@/pages/apis";
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { setChatList } from "@/store/action";
// import jsPDF from 'jspdf';

// https://img.picui.cn/free/2025/03/04/67c7194b7f579.png
//         // https://img.picui.cn/free/2025/03/05/67c726bdec5d2.png
//         // https://img.picui.cn/free/2025/03/05/67c726bdeb2ab.png
//         // https://img.picui.cn/free/2025/03/05/67c726bdea1e8.png
//         // https://img.picui.cn/free/2025/03/05/67c726bded87c.png
const ImgInput = ({ value, onChange, onSubmit }) => {
    return (
        <Space.Compact
            className="my-1  rounded-md flex  p-1"
        >
            <Input
                placeholder="请输入图片url，没有的话就用图床上传图片获取url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <Button className="bg-purple-500 text-white" onClick={onSubmit}>
                解析聊天记录图片URL
            </Button>
        </Space.Compact>
    );
};

const ChatMsgExtract = () => {
    const dispatch = useDispatch();
    const [urls, setUrls] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    // 全局的聊天记录变量
    const chatArrayFromStore = useSelector(state => state.myReducer.ChatList)
    // const [chatArray, setChatArray] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedText, setEditedText] = useState('');
    const [insertUser, setInsertUser] = useState('userA');

    const handleInputChange = (index, value) => {
        const newUrls = [...urls];
        newUrls[index] = value;

        if (!value && newUrls.length > 1) {
            newUrls.splice(index, 1);
        }

        if (value && index === newUrls.length - 1) {
            newUrls.push('');
        }

        setUrls(newUrls);
    };

    const handleSubmit = async () => {
        const validUrls = urls.filter(url => url.trim()!== '');
        console.log('提交的图片 URL:', validUrls);

        if (validUrls.length === 0) {
            setError('请输入有效的图片 URL');
            return;
        }

        setLoading(true);
        setError(null);
        setResponseData(null);

        try {
            const promises = validUrls.map(url => ChatImageToJSON(url));
            const results = await Promise.all(promises);
            const resList = results.map(item => item.data);
            setResponseData(resList);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!responseData) {
            return;
        }
        const mergedArray = responseData.reduce((acc, current) => {
            const parsedArray = JSON.parse(current);
            return acc.concat(parsedArray);
        }, []);

        const uniqueArray = [];
        const seen = new Set();
        mergedArray.forEach(item => {
            const key = JSON.stringify(item);
            if (!seen.has(key)) {
                seen.add(key);
                uniqueArray.push(item);
            }
        });

        console.log(uniqueArray);
        // setChatArray(prevChatArray => [...prevChatArray, ...uniqueArray]);
        // TODO:完成 dispatch(setChatList(前一行的setChatArray));
        dispatch(setChatList([...chatArrayFromStore, ...uniqueArray]))
        // dispatch(setChatList([...chatArray, ...uniqueArray]))
        
    }, [responseData, dispatch]);

    // const handleEmotionAnalysis = () => {
    //     // dispatch(setChatList(chatArrayFromStore));
    //     message.success('情感分析数据导入成功');
    // };

    const handleDelete = (index) => {
        const newChatArray = [...chatArrayFromStore];
        // const newChatArray = [...chatArray];
        newChatArray.splice(index, 1);
        // setChatArray(newChatArray);
        dispatch(setChatList(newChatArray));

    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedText(chatArrayFromStore[index].text);
        // setEditedText(chatArray[index].text);
    };

    const handleSave = (index) => {
        const newChatArray = [...chatArrayFromStore];
        // const newChatArray = [...chatArray];
        newChatArray[index].text = editedText;
        // setChatArray(newChatArray);
        dispatch(setChatList(newChatArray));
        setEditingIndex(-1);
    };

    const handleCancel = () => {
        setEditingIndex(-1);
    };

    const handleInsertAbove = (index) => {
        const newItem = { user: insertUser, text: '新插入的消息' };
        // const newChatArray = [...chatArray];
        const newChatArray = [...chatArrayFromStore];
        newChatArray.splice(index, 0, newItem);
        // setChatArray(newChatArray);
        dispatch(setChatList(newChatArray));

    };

    const handleInsertBelow = (index) => {
        const newItem = { user: insertUser, text: '新插入的消息' };
        const newChatArray = [...chatArrayFromStore];
        // const newChatArray = [...chatArray];
        newChatArray.splice(index + 1, 0, newItem);
        // setChatArray(newChatArray);
        dispatch(setChatList(newChatArray));

    };

    // const handleExport = () => {
    //     // 导出聊天记录为pdf
    //     // 
    //     // chatArrayFromStore 是聊天记录，导出打印成pdf，最好有跟本项目一样的样式
    //     console.log('print----');
        
    // }

    const handleExport = () => {
        console.log('print--');
    };

    

    return (
        <div>
            <LayoutPage>
                {urls.map((url, index) => (
                    <ImgInput
                        key={index}
                        value={url}
                        onChange={(value) => handleInputChange(index, value)}
                        onSubmit={handleSubmit}
                    />
                ))}
                <Button className="bg-purple-500 text-white" onClick={handleSubmit} loading={loading}>
                    一键提交
                </Button>
                {error && <p style={{ color:'red' }}>{error}</p>}
                <div className="bg-white border border-gray-300 rounded-lg h-3/5 w-full max-w-screen-lg overflow-y-auto p-4 mb-4">
                可插入
                    <select
                        value={insertUser}
                        onChange={(e) => setInsertUser(e.target.value)}
                        className="mb-2 border border-black bg-purple-500 text-white"
                    >
                        <option value="userA">userA</option>
                        <option value="userB">userB</option>
                    </select>的消息
                    {/* {chatArray && chatArray.map((item, index) => ( */}
                    {chatArrayFromStore && chatArrayFromStore.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <p
                                className={`${item.user === 'userA' ? 'user-a-message' : 'user-b-message'} flex-grow`}
                            >
                                <span className="user-name">{item.user}: </span>
                                {editingIndex === index ? (
                                    <Input
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                ) : (
                                    <span className="message-text">{item.text}</span>
                                )}
                            </p>
                            <div className="flex space-x-1">
                                {editingIndex === index ? (
                                    <Button size="small" onClick={() => handleSave(index)}>保存</Button>
                                ) : (
                                    <Button size="small" onClick={() => handleEdit(index)}>修改</Button>
                                )}
                                <Button size="small" icon={<CloseOutlined />} onClick={() => handleDelete(index)} />
                                <Tooltip title="向上插入">
                                    <Button size="small" icon={<UpOutlined />} onClick={() => handleInsertAbove(index)} />
                                </Tooltip>
                                <Tooltip title="向下插入">
                                    <Button size="small" icon={<DownOutlined />} onClick={() => handleInsertBelow(index)} />
                                </Tooltip>
                                {editingIndex === index && (
                                    <Button size="small" onClick={handleCancel}>取消</Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <Button className="bg-purple-500 text-white" onClick={handleExport}>一键导出聊天记录</Button>
            </LayoutPage>
        </div>
    );
};

export default ChatMsgExtract;