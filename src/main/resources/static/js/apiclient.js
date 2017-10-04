/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

apiclient = (function () {

    return {
        getBlueprintsByAuthor: function (authname, callback) {
            if (authname !== "") {
                $.get("/blueprints/" + authname, callback);
            }
        },
        getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {
            $.get("/blueprints/" + authname + "/" + bpname, callback);
        },
        putBlueprintByNameAndAuthor: function (authname, bpname, points) {
            var data = {"author": authname, "points": points, "name": bpname};
            return $.ajax({
                url: "/blueprints/" + authname + "/" + bpname,
                type: 'PUT',
                data: JSON.stringify(data),
                contentType: "application/json"
            });
        },
        deleteBlueprint: function (authname, bpname) {
            return $.ajax({
                url: "/blueprints/" + authname + "/" + bpname,
                type: 'DELETE'
            });
        }
    };
})();