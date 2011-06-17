var cradle = require('cradle');
var db = new(cradle.Connection)().database('starwars');


db.save('vader', {
    force: 'light',
    name: 'Darth Vader'
}, function (err, res) {
    if (err) {
        console.log("Error:" + err);
    } else {
        console.log('Darth Vader created!');
    }
});


db.get('vader', function (err, doc) {
    doc.name; // 'Darth Vader'
    console.log(doc.name);
});

