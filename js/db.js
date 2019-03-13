var dbPromise = idb.open("football", 1, function(upgradeDb){
    if (!upgradeDb.objectStoreNames.contains("matches")){
        var matchOS = upgradeDb.createObjectStore("matches", {keyPath: "id"});
        matchOS.createIndex("id", "id", {unique: true});
    }
});

function saveMatch(match){
    dbPromise.then(function(db){
        var tx = db.transaction("matches", "readwrite");
        var store = tx.objectStore("matches");
        console.log(match.match.id);
        store.add(match.match);
        return tx.complete;
    })
    .then(function(){
        console.log("Match Saved");
    })
    .catch(function(){
        console.log("Cant save match")
    });
}

function getAllMatch(){
    return new Promise(function(resolve, reject) {
        dbPromise
          .then(function(db) {
            var tx = db.transaction("matches", "readonly");
            var store = tx.objectStore("matches");
            return store.getAll();
          })
          .then(function(matches) {
            resolve(matches);
          });
      });
}

function getMatchById(id){
    return new Promise(function(resolve, reject) {
        dbPromise
            .then(function(db) {
                var tx = db.transaction("matches", "readonly");
                var store = tx.objectStore("matches");
                return store.get(parseInt(id));
            })
            .then(function(match) {
                console.log(match);
                resolve(match);
        });
    });
}

function deleteMatchById(id){
    return new Promise(function(resolve, reject){
        dbPromise.then(function(db) {
            var tx = db.transaction('matches', 'readwrite');
            var store = tx.objectStore('matches');
            store.delete(parseInt(id));
            return tx.complete;
        }).then(function(matches) {
            console.log('Match deleted');
            resolve(matches);
        });
    });
}