from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_ollama import OllamaLLM
import chromadb
from chromadb.config import Settings

app = Flask(__name__)
CORS(app)

# Initialize Ollama LLM
try:
    llm = OllamaLLM(model="llama3.2:3b", base_url="http://localhost:11434")
    print("? Ollama connected")
except Exception as e:
    llm = None
    print(f"? Ollama error: {e}")

# ChromaDB
chroma_client = chromadb.Client(Settings(persist_directory="./chroma_db"))
try:
    collection = chroma_client.get_collection("ai_nexus_docs")
except:
    collection = chroma_client.create_collection("ai_nexus_docs")
    collection.add(
        documents=[
            "AI Nexus is a full-stack platform with MERN, AI/ML, and blockchain.",
            "To create a mock interview AI: Use LangChain + Ollama, store questions in MongoDB, use RAG for context.",
            "Tech stack: React, Node.js, Flask, Ollama LLM, ChromaDB vector storage."
        ],
        ids=["doc1", "doc2", "doc3"]
    )

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'service': 'AI Nexus ML Service',
        'ollama': 'connected' if llm else 'disconnected',
        'model': 'llama3.2:3b' if llm else 'mock'
    })

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        if llm:
            prompt = f"You are a helpful AI assistant. Answer concisely.\n\nQuestion: {user_message}\n\nAnswer:"
            response = llm.invoke(prompt)
        else:
            response = "Ollama not connected. Make sure 'ollama serve' is running."
        
        return jsonify({
            'response': response.strip() if response else "No response",
            'model': 'llama3.2:3b' if llm else 'mock',
            'rag_used': False
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/chat/rag', methods=['POST'])
def chat_rag():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        results = collection.query(query_texts=[user_message], n_results=3)
        context = "\n".join(results['documents'][0]) if results['documents'] else ""
        
        if llm:
            prompt = f"Use this context to answer:\n\nContext: {context}\n\nQuestion: {user_message}\n\nAnswer:"
            response = llm.invoke(prompt)
        else:
            response = f"Context: {context}\n\nOllama not connected."
        
        return jsonify({
            'response': response.strip() if response else "No response",
            'model': 'llama3.2:3b' if llm else 'mock',
            'rag_used': True,
            'context': context
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("=== AI Nexus ML Service ===")
    print("Ollama Status:", "? Connected" if llm else "? Disconnected")
    print("Server: http://localhost:5001")
    app.run(host='0.0.0.0', port=5001, debug=True)
