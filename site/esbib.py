import flask
from flask import Flask, jsonify, Response, request
import json

app = Flask(__name__, static_folder=None)

app.static_folder = 'app'
app.add_url_rule('/app/<path:filename>',
                 endpoint='app',
                 view_func=app.send_static_file)
#app.add_url_rule('/query/<path:filename>',
#                 view_func=app.send_static_file)
#

#@app.route('/query/user1/bib/_search', methods = ['GET', 'POST'])
@app.route('/query/user1/bib/_search', methods = ['POST'])
def query():
    import requests
    prefix = 'http://127.0.0.1:9200/user1/bib/_search'
    #url = '%s?%s' % (prefix, request.query_string)
    url = prefix
    data = request.get_json(force=True)
    #print url
    #print json.dumps(data)
    return Response(requests.post(url, json.dumps(data)).content,
                    content_type='application/json; charset=UTF-8')
    #return jsonify(requests.get(prefix).json())

#app.run(debug=True, port=9000)
app.run(host='0.0.0.0', port=9000)
