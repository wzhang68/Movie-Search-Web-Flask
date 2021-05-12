from flask import Flask,jsonify
import requests

app = Flask(__name__, static_url_path='',static_folder='static')

media_type= "movie"
time_window = "week"
api_key = "50418bfd7dd557e6a188216c3730f9c7"

trending_url="https://api.themoviedb.org/3/trending/movie/week?api_key=50418bfd7dd557e6a188216c3730f9c7"
airing_url ="https://api.themoviedb.org/3/tv/airing_today?api_key=50418bfd7dd557e6a188216c3730f9c7"

HEADER ='https://api.themoviedb.org/3/'


@app.route("/", methods=['GET'])
def index():
	return app.send_static_file('HomePage.html')

@app.route("/mainpageSearch/trending", methods=['GET'])
def trending():
	resp = requests.get(url=trending_url)
	data = resp.json()
	return jsonify(data)

@app.route("/mainpageSearch/airing", methods=['GET'])
def airing():
	resp = requests.get(url=airing_url)
	data = resp.json()
	return jsonify(data)

@app.route("/search/genres/<type>", methods=["GET"])
def search_genres(type):
	if(type =="movie"):
		resp = requests.get("https://api.themoviedb.org/3/genre/movie/list?api_key=50418bfd7dd557e6a188216c3730f9c7&language=en-US")
	elif(type=="tv"):
		resp = requests.get("https://api.themoviedb.org/3/genre/tv/list?api_key=50418bfd7dd557e6a188216c3730f9c7&language=en-US")
	data = resp.json()
	return jsonify(data)


@app.route("/search/<type>/<keyword>" ,methods=["GET"])
def search(type,keyword):
	if(type =="movie"):
		resp = requests.get("https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&"+"&language=en-US&query="+keyword+"&page=1&include_adult=false")
	elif (type =="tv"):
		resp = requests.get(
			"https://api.themoviedb.org/3/search/tv?api_key=" + api_key + "&" + "&language=en-US&query=" + keyword + "&page=1&include_adult=false")
	elif (type =="multi"):
		resp = requests.get(
			"https://api.themoviedb.org/3/search/multi?api_key=" + api_key + "&" + "&language=en-US&query=" + keyword + "&page=1&include_adult=false")
	data = resp.json()
	return jsonify(data)

@app.route("/detail/<type>/<id>")
def searchID(type,id):
	if(type =="movie"):
		resp = requests.get("https://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key+"&language=en- US")
	elif (type =="tv"):
		resp = requests.get("https://api.themoviedb.org/3/tv/"+id+"?api_key="+api_key+"&language=en- US")
	data = resp.json()
	return jsonify(data)



@app.route("/other/<type>/<id>")
def searchCast(type,id):
	if (type == "movie"):
		resp = requests.get("https://api.themoviedb.org/3/movie/"+id +"/credits?api_key="+api_key +"&language=en-US")
	elif (type == "tv"):
		resp = requests.get("https://api.themoviedb.org/3/tv/"+id +"/credits?api_key="+api_key +"&language=en-US")
	data = resp.json()
	return jsonify(data)


@app.route("/review/<type>/<id>")
def searchReview(type,id):
	if (type == "movie"):
		resp = requests.get("https://api.themoviedb.org/3/movie/"+id +"/reviews?api_key="+api_key +"&language=en- US&page=1")
	elif (type == "tv"):
		resp = requests.get("https://api.themoviedb.org/3/tv/"+id +"/reviews?api_key="+api_key +"&language=en- US&page=1")
	data = resp.json()
	return jsonify(data)

if __name__ == "__main__":
	app.run()
