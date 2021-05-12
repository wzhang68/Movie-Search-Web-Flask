var trending_json = loadJSON("/mainpageSearch/trending");
var trending_obj = trending_json.results;
var five_trending =selectFive(trending_obj);

var airing_json = loadJSON("/mainpageSearch/airing");
var airing_obj = airing_json.results;
var five_airing =selectFive(airing_obj);

var backdropImgURL ="https://image.tmdb.org/t/p/w780"
var keyAPI ="50418bfd7dd557e6a188216c3730f9c7";

function loadJSON(url){
    if(window.XMLHttpRequest){
        var xmlhttp =new XMLHttpRequest();
    }else{
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET",url,false);
    xmlhttp.send();
    var jsonobj= JSON.parse(xmlhttp.responseText);
    return jsonobj;
}
var currentSlide_trending =0;
var currentSlide_airing =0;
// console.log(five_trending);
// console.log(five_airing);
// var slides = document.getElementsByClassName("slideshow");
setInterval(slideshowManager_trending,3000);
setInterval(slideshowManager_airing,3000);

function slideshowManager_trending(){
    var tempurl = backdropImgURL + five_trending[currentSlide_trending].backdrop_path;
    var releaseyear = " ("+five_trending[currentSlide_trending].release_date.substr(0,4) + ")";
    var movname =five_trending[currentSlide_trending].title;
    document.getElementById("container_trending").src = tempurl;
    document.getElementById("topText_trending").innerHTML = movname + releaseyear;
    currentSlide_trending= (currentSlide_trending+1)%5;
}

function slideshowManager_airing(){
    var tempurl = backdropImgURL + five_airing[currentSlide_airing].backdrop_path;
    var releaseyear = " ("+five_airing[currentSlide_airing].first_air_date.substr(0,4) + ")";
    var movname =five_airing[currentSlide_airing].name;
    document.getElementById("container_airing").src = tempurl;
    document.getElementById("topText_airing").innerHTML = movname + releaseyear;
    currentSlide_airing= (currentSlide_airing+1)%5;
}

function selectFive(movArray){
    var temparray =[];
    for(var i=0;i<5;i++){
        temparray.push(movArray[i]);
    }
    return temparray;
}

function selectEight(movArray){
    var temparray =[];
    for(var i=0;i<5;i++){
        temparray.push(movArray[i]);
    }
    return temparray;
}

function selectTen(movArray){
    var temparray =[];
    if(movArray.length>=10){
        for(var i=0;i<10;i++){
            temparray.push(movArray[i]);
        }
    }else{
        for(var i=0;i<movArray.length;i++){
            temparray.push(movArray[i]);
        }
    }
    return temparray;
}

function displayEntries(jsondata,index,genre){
    var flag =false;
    var textHTML ="";
    var url = "https://image.tmdb.org/t/p/w185";
    if(jsondata[index].poster_path === null){
        flag = true;
        url = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";
        var img_text = "<img src=" + url +" class=\"nullImg\"" +">"
    }else{
        url = "https://image.tmdb.org/t/p/w185" +jsondata[index].poster_path;
    }
    // if(url === "https://image.tmdb.org/t/p/w185/null"){
    //     flag = true;
    //     url = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";
    //     var img_text = "<img src=" + url +" class=\"nullImg\"" +">"
    // }
    var score_str = jsondata[index].vote_average;
    var score_int =parseInt(score_str)/2;
    var score = score_int.toString();
    var genre_dict = getGenres();
    if(genre === "mv"){
        var date_str = jsondata[index].release_date;
        var name_str =jsondata[index].title;
        var temp_type_str ="movie";
    } else if(genre === "tv"){
        var date_str = jsondata[index].first_air_date;
        var name_str =jsondata[index].name;
        var temp_type_str ="tv";
    }else if(genre === "both"){
        if(jsondata[index].name!==undefined){
            var date_str = jsondata[index].first_air_date;
            var name_str =jsondata[index].name;
            var temp_type_str ="tv";
        }else if(jsondata[index].title!==undefined){
            var date_str = jsondata[index].release_date;
            var name_str =jsondata[index].title;
            var temp_type_str ="movie";
        }
    }
    if(date_str===undefined || date_str === ""){
        date_str= "N/A";
    }else{
        date_str=date_str.substr(0,4);
    }
    // Only for Genres
    var genre_text = "";
    if(jsondata[index].genre_ids.length!=0) {
        var genre_json = jsondata[index].genre_ids;
        for (var temp=0 ;temp<genre_json.length;temp++) {
            genre_text += genre_dict[genre_json[temp]];
            if(temp==genre_json.length-1){
                genre_text += "";
            }else{
                genre_text += ",";
            }
        }
    }else{
        genre_text = "N/A"
    }
    // HTML Text
    if(flag){
        textHTML += "<div class=\"result\">"+
            "<div class =\"result_pic_border\">"+"</div>"+
            "<div class =\"result_pic\">"+
            img_text +
            "</div>"+
            "<div class = \"result_description\">"+
            "<div class=\"Name\">"+name_str+"</div>"+ "<br>" +
            "<div class=\"YearAndType\">"+date_str+" | "+ genre_text +"</div>"+
            "<div class=\"Review\">"+"<span class=\"Rate\" style=\"color: red\">"+"&#9733;"+score+"/5 "+"</span>"+jsondata[index].vote_count+" votes"+"</div>"+ "<br>"+"<br>"+
            "<div class=\"Detail\">"+jsondata[index].overview +"</div>"+ "<br>"+"<br>"+
            "<div class=\"More\""+ "onclick=\"openDialog("+ "'" +temp_type_str+ "'" +","+ jsondata[index].id +")\">"+"Show more"+"</div>"+
            "</div>"
            +"</div>";
    }else{
        textHTML += "<div class=\"result\">"+
            "<div class =\"result_pic_border\">"+"</div>"+
            "<div class =\"result_pic\">"+
            "<img src=" + url +">" +
            "</div>"+
            "<div class = \"result_description\">"+
            "<div class=\"Name\">"+name_str+"</div>"+ "<br>" +
            "<div class=\"YearAndType\">"+date_str+" | "+genre_text +"</div>"+
            "<div class=\"Review\">"+"<span class=\"Rate\" style=\"color: red\">"+"&#9733;"+score+"/5 "+"</span>"+jsondata[index].vote_count+" votes"+"</div>"+ "<br>"+"<br>"+
            "<div class=\"Detail\">"+jsondata[index].overview +"</div>"+ "<br>"+"<br>"+
            "<div class=\"More\""+ "onclick=\"openDialog("+ "'" +temp_type_str+ "'" +","+ jsondata[index].id +")\">"+"Show more"+"</div>"+
            "</div>"
            +"</div>";
        // console.log(temp_type_str);
    }

    return textHTML;
}


function openDialog(type,id) {
    document.getElementById("light").style.display = "block";
    document.getElementById("fade").style.display = "block";
    document.body.style.overflow="hidden";
    var detail = getDetailByID(type,id);
    var detail_cast = getCastByID(type,id);
    var detail_review = getReviewByID(type,id);
    // console.log(detail_review.results);
    var score_str = detail.vote_average;
    var score_int =parseInt(score_str)/2;
    var score = score_int.toString();
    var genre_str = "";
    var language_str="";
    var cast_str = "";
    var comment_str="";
    if(detail.backdrop_path===null){
        document.getElementById("img_pop").src ="https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";
    }else{
        var img_pop_url ="https://image.tmdb.org/t/p/w780"+detail.backdrop_path;
        document.getElementById("img_pop").src =img_pop_url;
    }
    // if(img_pop_url==="https://image.tmdb.org/t/p/w780/null"){
    //     document.getElementById("img_pop").src ="https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";
    // }else{
    //     document.getElementById("img_pop").src =img_pop_url;
    // }
    if(type === 'movie'){
        document.getElementById("Name_pop").innerHTML=detail.title + "<span id =\"sign\">" + "</span>";
        // "<span id =\"sign\">" + "</span>"
    }else if(type ==='tv'){
        document.getElementById("Name_pop").innerHTML=detail.name +"<span id =\"sign\">" + "</span>";
    }
    for(var i=0; i< detail.spoken_languages.length;i++){
        language_str += detail.spoken_languages[i].english_name;
        if(i==detail.spoken_languages.length-1){
            language_str += "";
        }else{
            language_str += ",";
        }
    }
    if(detail.genres.length===0){
        genre_str ="N/A";
    }else {
        for (var i = 0; i < detail.genres.length; i++) {
            genre_str += detail.genres[i].name;
            if (i == detail.genres.length - 1) {
                genre_str += "";
            } else {
                genre_str += ",";
            }
        }
    }

    // Only For Cast
    if(detail_cast.cast.length>0){
        if(detail_cast.cast.length>=8){
            var temp_count =8;
        }else{
            var temp_count =detail_cast.cast.length;
        }
        for(var i =0;i<temp_count;i++){
            var flag =false;
            var url = "https://image.tmdb.org/t/p/w185"+detail_cast.cast[i].profile_path;
            if(detail_cast.cast[i].profile_path === null){
                flag = true;
                url = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png";
            }
            if(detail_cast.cast[i].character===""){
                var character_str ="N/A";
            }else{
                character_str = detail_cast.cast[i].character;
            }

            var img_text = "<img src=" + "'" +url+ "'" +" class=\"profile_Img\"" +">";
            cast_str += "<div class=\"Profile\">" +
                img_text+
                "<div class=\"Name_Profile\">"+detail_cast.cast[i].name +"</div>"+
                "<div class=\"AS\">" + "AS" + "</div>"+
                "<div class=\"Character\">" + character_str +"</div>"
                +"</div>";
            }
    }else{
        cast_str="";
        document.getElementById("grid-container").style.display="none";
        document.getElementById("NoCast").style.display="block";
    }
    // Only For Comments
    if(detail_review.results.length>0) {
        document.getElementById("Comments_title").innerHTML="Reviews";
        if (detail_review.results.length >= 5) {
            var temp_count = 5;
        } else {
            var temp_count = detail_review.results.length;
        }
        for(var i =0;i<temp_count;i++) {
            var date_str =detail_review.results[i].created_at.slice(5,7) +"/"+detail_review.results[i].created_at.slice(8,10) +"/"+detail_review.results[i].created_at.slice(0,4) ;
            if(detail_review.results[i].author_details.rating !== null){
                var rate_text ="<div class=\"Rate_2\">" + "&#9733;" + (detail_review.results[i].author_details.rating/2).toString() + "/5" +"</div>";
            }else{
                var rate_text="";
            }
            comment_str += "<div class=\"ReviewerAndTime\">" +
                "<span class=\"last-1\">" + detail_review.results[i].author_details.username +
                "</span>" +"<span class=\"last-2\">"+ " on " + date_str + "</span>" + "</div>"+
                rate_text+
                "<div class =\"Review_Content\">" + detail_review.results[i].content +"</div>"+
                "<hr class=\"horizontal_line\">";
        }
        // console.log(comment_str);
    }else{
        document.getElementById("Comments_title").innerHTML="Reviews";
        document.getElementById("NoComments").style.display ="block";
    }

    if(type === 'movie'){
        if(detail.release_date===undefined){
            document.getElementById("YearAndType_pop").innerText = "N/A" + " | "+genre_str;
        }else{
            document.getElementById("YearAndType_pop").innerText = detail.release_date.substr(0,4)+" | "+genre_str;
        }
        var aTag = document.createElement('a');
        var aa = document.getElementById("sign");
        // var website = "https://www.themoviedb.org/movie/"+id.toString();
        aTag.setAttribute("id","sign2");
        aTag.innerHTML="  ⓘ";
        aTag.setAttribute('href',"https://www.themoviedb.org/movie/"+id.toString());
        aTag.setAttribute("target","_blank");
        aa.appendChild(aTag);
    }else if(type ==='tv'){
        if(detail.release_date===undefined)
        {
            document.getElementById("YearAndType_pop").innerText = "N/A" + " | "+genre_str;
        }
        else{
            document.getElementById("YearAndType_pop").innerText = detail.first_air_date.substr(0,4)+" | "+genre_str;
        }
        var aTag = document.createElement('a');
        var aa = document.getElementById("sign");
        // var website = "https://www.themoviedb.org/tv/"+id.toString();
        aTag.setAttribute("id","sign2");
        aTag.innerHTML="  ⓘ";
        aTag.setAttribute('href',"https://www.themoviedb.org/tv/"+id.toString());
        aTag.setAttribute("target","_blank");
        aa.appendChild(aTag);
    }
    document.getElementById("Review_pop").innerHTML= "<span class=\"Rate\" style=\"color: #ab0b09\">"+"&#9733;"+score+"/5 "+"</span>"+detail.vote_count+" votes";
    document.getElementById("Detail_pop").innerHTML= detail.overview;
    document.getElementById("Language").innerHTML= "Spoken languages: "+ language_str;
    document.getElementById("Cast").innerHTML="Cast";
    document.getElementById("grid-container").innerHTML =cast_str;
    document.getElementById("Comments").innerHTML=comment_str;

    //For close button
    document.getElementById("close").addEventListener("mouseover",function(){
        document.getElementById("close").style.color="black";
    });
    document.getElementById("close").addEventListener("mouseout",function(){
        document.getElementById("close").style.color= "#aaa";
    });
}

function closeDialog() {
    document.getElementById("light").style.display = "none";
    document.getElementById("fade").style.display = "none";
    document.getElementById("img_pop").src="";
    document.getElementById("Name_pop").innerHTML="";
    document.getElementById("YearAndType_pop").innerHTML="";
    document.getElementById("Review_pop").innerHTML="";
    document.getElementById("Detail_pop").innerHTML="";
    document.getElementById("Language").innerHTML="";
    document.getElementById("Cast").innerHTML="";
    document.getElementById("NoCast").style.display="none";
    document.getElementById("grid-container").style.display="grid";
    document.getElementById("grid-container").innerHTML ="";
    document.getElementById("Comments").innerHTML="";
    document.getElementById("NoComments").style.display="none";
    document.getElementById("Comments_title").innerHTML ="";
    document.body.style.overflowY="auto";
}
function getGenres(){
    var TVGenres ="/search/genres/tv";
    var MVGenres ="/search/genres/movie";
    var genres_tv = loadJSON(TVGenres);
    var genres_mv = loadJSON(MVGenres);
    var dict = {};
    for(var i=0;i<genres_tv.genres.length;i++){
        dict[genres_tv.genres[i]["id"]]=genres_tv.genres[i]["name"];
        // console.log(dict[genres_tv.genres[i]["id"]]);
    }
    for(var i=0;i<genres_mv.genres.length;i++){
        dict[genres_mv.genres[i]["id"]]=genres_mv.genres[i]["name"];
    }
    return dict;
}

function getDetailByID(type,id)
{
    var type_str =type.toString();
    if(type_str==='movie'){
        var reqURL ="/detail/movie/" +id.toString();
    }else if(type_str==='tv'){
        var reqURL ="/detail/tv/" +id.toString();
    }
    var obj = loadJSON(reqURL);
    return obj;
}

function getCastByID(type,id)
{
    var type_str =type.toString();
    if(type_str==='movie'){
        var reqURL ="/other/movie/" +id.toString();
    }else if(type_str==='tv'){
        var reqURL ="/other/tv/" +id.toString();
    }
    var obj = loadJSON(reqURL);
    return obj;
}

function getReviewByID(type,id)
{
    var type_str =type.toString();
    if(type_str==='movie'){
        var reqURL ="/review/movie/" +id.toString();
    }else if(type_str==='tv'){
        var reqURL ="/review/tv/" +id.toString();
    }
    var obj = loadJSON(reqURL);
    return obj;
}


function sendSearchQuery(){
    document.querySelector("#submit").addEventListener("click", function(){
        document.getElementById("showresults").style.display="none";
        document.getElementById("notfound").style.display="none";
        var isvalid = document.querySelector("#myForm").reportValidity();
        if(isvalid){
            var keyword = document.getElementById("keyword").value;
            var catelog =document.getElementById("Category").value;
            if (keyword.length !== 0 && catelog !=="none"){
                var URL = "/search/";
                var keyword = document.getElementById("keyword").value;
                var genre = document.getElementById("Category").value;
                // document.getElementById("showresults").style.display="block";
                if (genre === "mv") {
                    URL+= "movie/";
                } else if (genre === "tv") {
                    URL+=genre+"/";
                } else if (genre === "both") {
                    URL += "multi/";
                }
                var keyword_new = keyword.replace(/ /g, '%20');
                URL += keyword_new;
                console.log(URL);
                var jsonobj = loadJSON(URL);
                // console.log(jsonobj.results);

                if(jsonobj.results.length==0){
                    document.getElementById("showresults").style.display="none";
                    document.getElementById("search_results").innerHTML="";
                    document.getElementById("notfound").style.display="block";
                    document.getElementById("empty").style.display = "block";
                }else{
                    document.getElementById("empty").style.display ="none";
                    document.getElementById("showresults").style.display="block";
                    var tenobjs = selectTen(jsonobj.results);
                    // var temp= "https://image.tmdb.org/t/p/w185/"+tenobjs[0].poster_path;
                    // document.getElementById("img00").src= temp;
                    // document.getElementById("Name").innerHTML = tenobjs[0].title;
                    // document.getElementById("YearAndType").innerHTML = tenobjs[0].first_air_date +"|"+ tenobjs[0].genre_ids;
                    // document.getElementById("Detail").innerHTML =tenobjs[0].overview;
                    var tenresults ="";
                    for(var i=0; i<tenobjs.length;i++){
                        tenresults+= displayEntries(tenobjs,i,genre);

                    }
                    document.getElementById("search_results").innerHTML =tenresults;

                    //For Show More
                    var morebtn = document.getElementsByClassName("More");
                    for(const i of morebtn){
                        i.addEventListener("mouseover",function() {
                            i.style.backgroundColor = "#aaa";
                        });
                        i.addEventListener("mouseout",function() {
                            i.style.backgroundColor = "#bf0b0b";
                        });
                    }
                }
            }

        }
    });
}