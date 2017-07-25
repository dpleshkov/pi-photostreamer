from flask import *
import os
import time

app = Flask(__name__)
app.secret_key = "10102004"


@app.route("/")
def root():
    return send_from_directory("contents", "index.html")


@app.route("/contents/<filename>")
def index(filename):
    try:
        return send_from_directory("contents", filename)
    except:
        abort(404)


@app.route("/capture")
def capture():
    try:
        t1 = time.time()
        os.system("raspistill -vf -hf -o contents/image.jpg")
        return jsonify({"status": "success", "time": time.time() - t1 / 1000})
    except Exception as e:
        return jsonify({"status": "error", "reason": e})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", threaded=True)
