/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

event_listener = (function () {

    //returns an object with 'public' functions:
    return {
        //function to initialize application
        init: function () {

            var canvas = $("#print_canvas").get(0);

            var x_off = Math.round($("#print_canvas").offset().left);
            var y_off = $("#print_canvas").offset().top;
            
            console.info('initialized');

            var handler = function (event) {
                var in_x = event.pageX - x_off;
                var in_y = event.pageY - y_off;
                app.update_canvas(in_x, in_y);
            };

            //if PointerEvent is suppported by the browser:
            if (window.PointerEvent) {
                canvas.addEventListener("pointerdown", handler);
            } else {
                canvas.addEventListener("mousedown", handler);
            }
        }
    };
})();
