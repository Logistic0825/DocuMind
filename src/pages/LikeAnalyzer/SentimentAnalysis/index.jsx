import LayoutPage from "@/pages/Layout"
import { useSelector } from "react-redux"
import '@/pages/LikeAnalyzer/ChatMsgExtract/index.css'
import { useEffect, useState } from "react"
import { SensitiveAnalysisByChatList } from "@/pages/apis"

const SentimentAnalysis = () => {
    const chatlist = useSelector((state) => state.myReducer.ChatList)
    const [SensitiveResult, setSensitiveResult] = useState('')
    useEffect(()=>{
        Sensitive(chatlist)
    },[chatlist])
    const Sensitive = async (chatlist) => {
        const res = await SensitiveAnalysisByChatList(chatlist)
        console.log(res);
        setSensitiveResult(res.data)
    }
    return <div>
        <LayoutPage>
            SentimentAnalysis
            {/* {chatlist && chatlist.map((item, index) => (
                <p key={index}>
                    <span>{item.user}</span>
                    <span>{item.text}</span>
                </p>
            ))} */}
            <div className="bg-white border border-gray-300 rounded-lg h-3/5 w-full max-w-screen-lg overflow-y-auto p-4 mb-4">
                    {chatlist && chatlist.map((item, index) => (
                        <p
                            key={index}
                            className={item.user === 'userA' ? 'user-a-message' : 'user-b-message'}
                        >
                            <span className="user-name">{item.user}: </span>
                            <span className="message-text">{item.text}</span>
                        </p>
                    ))}
            </div>
            <div className="h-[30%] border border-gray-300 rounded-md p-4 bg-purple-600 flex flex-col">
                <div className="text-lg text-white font-bold mb-2">情感分析结果：</div>
                <div className="flex-1 overflow-y-auto bg-green-900 text-white p-2 rounded-sm shadow-inner">
                    {SensitiveResult ? SensitiveResult : 'Loading...'}
                </div>
            </div>
            
        </LayoutPage>
    </div>
}
export default SentimentAnalysis
