//@author hcadavid

apimock = (function () {

    var mockdata = [];

    mockdata["johnconnor"] = [{author: "johnconnor", "points": [{"x": 150, "y": 120}, {"x": 150, "y": 220}, {"x": 250, "y": 220}, {"x": 250, "y": 120}, {"x": 150, "y": 120}, {"x": 200, "y": 60}, {"x": 250, "y": 120}], "name": "house"},
        {author: "johnconnor", "points": [{"x": 340, "y": 240}, {"x": 15, "y": 215}], "name": "gear"}];
    mockdata["maryweyland"] = [{author: "maryweyland", "points": [{"x": 140, "y": 140}, {"x": 115, "y": 115}], "name": "house2"},
        {author: "maryweyland", "points": [{"x": 140, "y": 140}, {"x": 115, "y": 115}], "name": "gear2"}];
    mockdata["nancy"] = [{author: "nancy", "points": [{"x": 150, "y": 120}, {"x": 215, "y": 115}], "name": "mazuren"},
        {author: "nancy", "points": [{"x": 340, "y": 240}, {"x": 15, "y": 215}], "name": "recreo"}];
    mockdata["ana"] = [{author: "ana", "points": [{"x": 140, "y": 140}, {"x": 115, "y": 115}], "name": "pamplona"},
        {author: "ana", "points": [{"x": 140, "y": 140}, {"x": 115, "y": 115}], "name": "amurg"}];
    mockdata["camilo"] = [{author: "camilo", "points": [{"x": 150, "y": 120}, {"x": 170, "y": 117}, {"x": 215, "y": 115}], "name": "cama"},
        {author: "camilo", "points": [{"x": 340, "y": 240}, {"x": 15, "y": 215}], "name": "neural"},
        {author: "camilo", "points": [{"x": 150, "y": 120}, {"x": 150, "y": 320}, {"x": 300, "y": 320}], "name": "desk"}];
    mockdata["laura"] = [{author: "laura", "points": [{"x": 140, "y": 140}, {"x": 115, "y": 115}], "name": "arsw"},
        {author: "laura", "points": [{"x": 140, "y": 140}, {"x": 115, "y": 115}], "name": "bogota"}];


    return {
        getBlueprintsByAuthor: function (authname, callback) {
            callback(
                    mockdata[authname]
                    );
        },
        getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {

            callback(
                    mockdata[authname].find(function (e) {
                return e.name === bpname
            })
                    );
        }
    }

})();