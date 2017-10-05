app = (function () {

    var api_context = apiclient; // apimock|apiclient

    var author_name;
    var current_print_name;
    var point_list;

    var canvas_empty = true;
    var canvas;
    var ctx;

    var post = false;

    var json_prints_map = function (print) {
        return {"name": print.name, "points": print.points.length};
    };

    var jquery_map = function (print) {
        $("#table_body").empty();
        $(document).ready(function () {
            let markup = "<tr><td>" + print.name + "</td><td> " + print.points + "</td><td><button onclick=\"app.show_print(\'" + author_name + "\',\'" + print.name + "\')\">Open</button></td></tr>";
            $("#table_body").append(markup);
        });
    };

    var total_points = function (total, print) {
        return total + print.points;
    };

    var update_info = function (print_list) {
        $("#current_print").text("Current blueprint: N/A");
        current_print_name = "";
        canvas_empty = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let temp = print_list.map(json_prints_map);
        temp.map(jquery_map);
        $("#total_label").text("Total user points: " + temp.reduce(total_points, 0));

    };

    var clear_info = () => {
        $("#current_print").text("Current blueprint: N/A");
        canvas_empty = true;
        $("#table_body").empty();
    };

    var show_print = function (print) {
        $("#current_print").text("Current blueprint: " + print.name);
        current_print_name = print.name;
        point_list = print.points;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        canvas_empty = false;
        if (point_list.length >= 1) {
            ctx.moveTo(point_list[0].x, point_list[0].y);
            for (i = 1; i < point_list.length; ++i) {
                ctx.lineTo(point_list[i].x, point_list[i].y);
                ctx.stroke();
                ctx.moveTo(point_list[i].x, point_list[i].y);
            }
        }
    };

    return {
        init: function () {
            canvas = $("#print_canvas").get(0);
            ctx = canvas.getContext("2d");
            ctx.strokeStyle = "#FFFFFF";
            author_name = "";
            current_print_name = "";
        },
        change_name: function (name) {
            author_name = name;
        },
        update_prints: function (author) {
            app.change_name(author);
            api_context.getBlueprintsByAuthor(author, update_info, clear_info());
        },
        show_print: function (author, name) {
            api_context.getBlueprintsByNameAndAuthor(author, name, show_print);
        },
        update_canvas: function (x, y) {
            if (!canvas_empty) {
                if (point_list.length === 0) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    ctx.moveTo(x, y);
                }
                point_list.push({"x": x, "y": y});
            }
        },
        create_blueprint: function () {
            if (author_name !== "") {
                current_print_name = prompt("New Blueprint:");
                point_list = [];
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas_empty = false;
                post = true;
            }
        },
        save_update: function () {
            if (post === true) {
                post = false;
                api_context.postBlueprint(author_name, current_print_name, point_list)
                        .then(() => {
                            app.update_prints(author_name);
                        })
                        .then(() => {
                            app.show_print(author_name, current_print_name);
                        });
            } else {
                api_context.putBlueprint(author_name, current_print_name, point_list)
                        .then(() => {
                            app.update_prints(author_name);
                        })
                        .then(() => {
                            app.show_print(author_name, current_print_name);
                        });
            }
        },
        delete_blueprint: function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            api_context.deleteBlueprint(author_name, current_print_name)
                    .then(() => {
                        app.update_prints(author_name);
                    });
        }
    };
})();