import os
from openai import OpenAI
from flask import Flask, request, jsonify
import time 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

VOLENE_API_KEY = "volence-api-key"

# 健康监测API
@app.route('/health', methods=['GET'])
def health_check():
    """健康检查接口，返回服务状态信息"""
    try:
        # 可以在这里添加更多需要检查的资源状态，如数据库连接等
        status = {
            "status": "healthy",
            "timestamp": int(time.time()),
            "service": "chat-analysis-api",
            "version": "1.0.0"
        }
        return jsonify(status), 200
    except Exception as e:
        status = {
            "status": "unhealthy",
            "timestamp": int(time.time()),
            "error": str(e)
        }
        return jsonify(status), 500

# 聊天记录图片解析
def ChatImgExtract(imageurl):
    client = OpenAI(
        base_url="https://ark.cn-beijing.volces.com/api/v3",
        api_key=VOLENE_API_KEY
    )
    response = client.chat.completions.create(
        model="doubao-1-5-vision-pro-32k-250115",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "请整理图片里面的聊天记录，整理成对象数组[{'user':'userA','text':'text'},{'user':'userB','text':'text'}]的形式,userA是绿色的，userB是白色的，严格按照userA，userB命名,不要任何其他输出，不要换行符，生成的结果严格按照json格式，不能多出任何字符！不要多出反斜杠"},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": imageurl
                        },
                    },
                ],
            }
        ]
    )
    return response.choices[0].message.content

# 生成提示词
def promptGenerative(userA, userB, chatlist):
    return "以下是聊天记录，请问你认为" + str(userA) + "会对" + str(userB) + "有好感吗？：" + str(chatlist)

# 聊天记录情感分析
def SensitiveAnalysis(prompt):
    client = OpenAI(
        base_url="https://ark.cn-beijing.volces.com/api/v3",
        api_key=VOLENE_API_KEY
    )
    response = client.chat.completions.create(
        model="doubao-1-5-pro-32k-250115",
        messages=[
            {"role": "system", "content": "你是人工智能助手"},
            {"role": "user", "content": prompt},
        ]
    )
    return response.choices[0].message.content

def SensitiveByChatList(chatlist):
    prompt = promptGenerative('userB', 'userA', str(chatlist))
    return SensitiveAnalysis(prompt)

# 传入url:'imageurl'
@app.route('/chatimgextract', methods=['POST'])
def chat_img_extract():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({"success": False, "message": "Missing 'url' in JSON data", "data": None}), 400
    url = data['url']
    try:
        result = ChatImgExtract(url)
        return jsonify({"success": True, "message": "", "data": result})
    except Exception as e:
        return jsonify({"success": False, "message": str(e), "data": None}), 500

# 传入chatlist
@app.route('/sensitiveanalysis', methods=['POST'])
def sensitive_analysis():
    data = request.get_json()
    if not data or 'chatlist' not in data:
        return jsonify({"success": False, "message": "Missing 'chatlist' in JSON data", "data": None}), 400
    chatlist = data['chatlist']
    try:
        result = SensitiveByChatList(chatlist)
        return jsonify({"success": True, "message": "", "data": result})
    except Exception as e:
        return jsonify({"success": False, "message": str(e), "data": None}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
