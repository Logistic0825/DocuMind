import { request } from "@/utils"

export function ChatImageToJSON(url) {
    return request({
        url:'/chatimgextract',
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ "url" : url })
    })
}

export function SensitiveAnalysisByChatList(chatliist) { 
    return request({
        url:'/sensitiveanalysis',
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ "chatlist" : chatliist })
    })
}
