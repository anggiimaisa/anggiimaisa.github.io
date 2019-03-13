var base_url = "https://api.football-data.org/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
    console.log("Error Status : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
    } else {  
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(err) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + err);
} 

function getMatch(){
    fetch(base_url + "v2/competitions/CL/matches", {
        method: 'GET',  
        headers: {
            'X-Auth-Token': '4e67a556265640918adf7a592612f134'
        }
    })
    .then(status)
    .then(json)
    .then(function(data){
        var titlePage = data.competition.name;
        var listMatchHTML = "";
        
        console.log(data);

        data.matches.forEach(function(match){
            listMatchHTML += `<div class="divider"></div>
                                        <div class="section">
                                            <h5>${match.awayTeam.name} <b>vs</b> ${match.homeTeam.name}</h5>
                                            <p>Status: ${match.status}</p>
                                            <p>Stage: ${match.stage}</p>
                                            <a class="waves-effect waves-light btn" href="./detailMatch.html?id=${match.id}">Detail Match</a>
                                        </div>`;
        });

        document.getElementById("title").innerHTML = titlePage;
        document.getElementById("listMatch").innerHTML = listMatchHTML;
    })
    .catch(error);
}

function getMatchDetailById(){
    return new Promise(function(resolve, reject) {

        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        
        fetch(base_url + "v2/matches/" + idParam, {
            method: 'GET',  
            headers: {
                'X-Auth-Token': '4e67a556265640918adf7a592612f134'
            }
        })
        .then(status)
        .then(json)
        .then(function(data){
            
            var listMatchHTML = "";
            
            var score = data.match.score;
            
            listMatchHTML += `<h3>${data.match.competition.name}</h3>
            <table class="centered">
            <thead>
            <tr>
            <th>${data.match.awayTeam.name}</th>
            <th>vs</th>
            <th>${data.match.homeTeam.name}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>${score.fullTime.awayTeam}</td>
            <td></td>
            <td>${score.fullTime.homeTeam}</td>
            </tr>
            </tbody>
            </table>
            <br>
            <br>
            <p>Stage: <b>${data.match.stage}</b></p>
            <p>Status: <b>${data.match.status}</b></p>`;
            
            
            document.getElementById("body-content").innerHTML = listMatchHTML;
            resolve(data);
        })
        .catch(error);
    });
}
    
function getSavedMatches(){
    getAllMatch().then(function(data){
            var titlePage = data[0].competition.name;
            var listMatchHTML = "";
            
            data.forEach(function(match){
                listMatchHTML += `<div class="divider"></div>
                                        <div class="section">
                                            <h5>${match.awayTeam.name} <b>vs</b> ${match.homeTeam.name}</h5>
                                            <p>Status: ${match.status}</p>
                                            <p>Stage: ${match.stage}</p>
                                            <a class="waves-effect waves-light btn" href="./detailMatch.html?id=${match.id}&saved=true">Detail Match</a>
                                        </div>`;
            });

        document.getElementById("title").innerHTML = titlePage;
        document.getElementById("saved").innerHTML = listMatchHTML;
    });
}

function getSavedMatchById(){
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");  

    getMatchById(idParam).then(function(data){
        var listMatchHTML = "";
        
        var score = data.score;

        listMatchHTML += `<h3>${data.competition.name}</h3>
                        <table class="centered">
                            <thead>
                            <tr>
                                <th>${data.awayTeam.name}</th>
                                <th>vs</th>
                                <th>${data.homeTeam.name}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>${score.fullTime.awayTeam}</td>
                                <td></td>
                                <td>${score.fullTime.homeTeam}</td>
                            </tr>
                            </tbody>
                        </table>
                        <br>
                        <br>
                        <p>Status: <b>${data.stage}</b></p>
                        <p>Status: <b>${data.status}</b></p>`;


        document.getElementById("body-content").innerHTML = listMatchHTML;
    });
}