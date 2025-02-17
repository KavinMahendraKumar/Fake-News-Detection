from flask import Flask, render_template, request, jsonify
import random
import time
import json
from datetime import datetime, timedelta

app = Flask(__name__)

class NewsVerifier:
    def __init__(self):
        self.trusted_sources = {
            "nytimes": {
                "name": "The New York Times",
                "url": "https://www.nytimes.com",
                "reliability": 95
            },
            "bbc": {
                "name": "BBC News",
                "url": "https://www.bbc.com/news",
                "reliability": 94
            },
            "ap": {
                "name": "Associated Press",
                "url": "https://apnews.com",
                "reliability": 96
            },
            "reuters": {
                "name": "Reuters",
                "url": "https://www.reuters.com",
                "reliability": 95
            }
        }

    def analyze_content(self, url=None, text=None):
        # Simulate analysis delay
        time.sleep(1.5)
        
        # Mock analysis result
        is_fake = random.random() > 0.5
        confidence = random.random() * 100
        
        sources = []
        for source_id, source_info in self.trusted_sources.items():
            source_data = {
                "name": source_info["name"],
                "url": source_info["url"],
                "reliability": source_info["reliability"],
                "matchingContent": [{
                    "headline": f"{'Related' if not is_fake else 'Contradicting'} coverage of this topic",
                    "url": f"{source_info['url']}/example",
                    "publishDate": (datetime.now() - timedelta(days=random.randint(0, 5))).strftime("%Y-%m-%d"),
                    "verified": not is_fake
                }]
            }
            sources.append(source_data)
        
        return {
            "isFake": is_fake,
            "confidence": confidence,
            "explanation": "Based on our comprehensive cross-reference analysis across major news outlets, "
                         "we've evaluated the content's authenticity by comparing it with verified reporting "
                         "from trusted sources.",
            "sources": sources
        }

verifier = NewsVerifier()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    url = data.get('url')
    text = data.get('text')
    
    if not url and not text:
        return jsonify({"error": "Please provide either a URL or text content"}), 400
    
    result = verifier.analyze_content(url, text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)