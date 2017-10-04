app = (function () {

    var api_context = apiclient; // apimock|apiclient

    var author_name;
    var current_print_name;
    var list;

    var canvas_empty = true;
    var canvas;
    var ctx;

    var json_prints_map = function (print) {
        return {"name": print.name, "points": print.points.length};
    };

    var jquery_map = function (print) {
        $("#table_body").empty();
        $(document).ready(function () {
            var markup = "<tr><td>" + print.name + "</td><td> " + print.points + "</td><td><button onclick=\"app.show_print(\'" + author_name + "\',\'" + print.name + "\')\">Open</button></td></tr>";
            $("#table_body").append(markup);
        });
    };

    var total_points = function (total, print) {
        return total + print.points;
    };

    var update_info = function (print_list) {
        $("#current_print").empty();
        canvas_empty = true;
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        var temp = print_list.map(json_prints_map);
        temp.map(jquery_map);
        $("#total_label").text("Total user points: " + temp.reduce(total_points, 0));
    };

    var show_print = function (print) {
        $("#current_print").text("Current blueprint: " + print.name);
        current_print_name = print.name;
        list = print;
        var points = print.points;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        canvas_empty = false;
        ctx.moveTo(points[0].x, points[0].y);
        for (i = 1; i < points.length; ++i) {
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
            ctx.moveTo(points[i].x, points[i].y);
        }
    };

    return {
        init: function () {
            canvas = $("#print_canvas").get(0);
            ctx = canvas.getContext("2d");
        },
        change_name: function (name) {
            author_name = name;
        },
        update_prints: function (author) {
            app.change_name(author);
            api_context.getBlueprintsByAuthor(author, update_info);
        },
        show_print: function (author, name) {
            api_context.getBlueprintsByNameAndAuthor(author, name, show_print);
        },
        update_canvas: function (x, y) {
            if (!canvas_empty) {
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.moveTo(x, y);
                list.points.push({"x": x, "y": y});
            }
        },
        create_blueprint: function () {

        },
        save_update: function () {
            api_context.putBlueprintByNameAndAuthor(author_name, current_print_name, list.points)
                    .then(app.update_prints(author_name))
                    .then(app.show_print(author_name, current_print_name));
        },
        delete_blueprint: function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
                    .then(api_context.deleteBlueprint(author_name, current_print_name))
                    .then(app.update_prints(author_name));
        }
    };
})();