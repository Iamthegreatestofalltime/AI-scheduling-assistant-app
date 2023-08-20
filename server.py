from flask import Flask, request, jsonify
import openai

app = Flask(__name__)
openai.api_key = ''

@app.route('/run_python', methods=['POST'])
def run_python():
    data = request.get_json()
    text = data.get('text')
    response = openai.Completion.create(
        engine="text-davinci-003",  # davinci is the most capable model of GPT-3
        prompt=text,
        temperature=0.5,
        max_tokens=200
    )
    result = response.choices[0].text.strip()

    return jsonify({'result': result})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)