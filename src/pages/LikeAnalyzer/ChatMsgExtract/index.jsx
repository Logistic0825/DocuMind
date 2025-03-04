import LayoutPage from "@/pages/Layout"
import React, { useState } from 'react';
import { PlusOutlined, WechatFilled } from '@ant-design/icons';
import { Button, Image, Input, Space, Upload } from 'antd';

const ImgInput = () => {
    return <Space.Compact
    className="w-full my-4 bg-purple-500 rounded-md flex flex-col p-4"
    style={{
      width:'100%'
    }}
>
    <Input placeholder="请输入图片url，没有的话就用图床上传图片获取url" />
    <Button type="primary">Submit</Button>
</Space.Compact>
}

const ChatMsgExtract = () => {
    const [countImg, setCountImg] = useState(5)
    return <div>
        <LayoutPage>
            {Array.from({ length: countImg }).map((_, index) => (
                <ImgInput key={index}/>
                ))}
            
        </LayoutPage>
    </div>
}
export default ChatMsgExtract