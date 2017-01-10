function waves(elem){

    var bgColor = 'hsla(0, 0%, 0%, 1)';
    var baseFreq = 2;

    var width = elem.width;
    var height = elem.height;

    var c = elem.getContext('2d');

    var square = function(n){
        return (
            Math.sin(n) +
            Math.sin(n*3)/3 +
            Math.sin(n*5)/5 +
            Math.sin(n*7)/7
        );
    };

    var waves = [
        {frac: 0, step: 0.002, tail: 100, dots: [], fn: square}
    ];

    // Main draw loop
    var draw = function(){
        var date = new Date();
        var t = date.getMilliseconds();

        // Draw
        drawBg(c);

        // Draw waves
        for (var i = 0; i < waves.length; i++){
            var w = waves[i];

            drawWave(c, w);

            // Update wave state
            w.frac += w.step;
            if (w.frac > (1+w.step)){
                w.frac = 0;
            }

        }

        // Next frame
        requestAnimationFrame(draw);
    };

    function drawBg(c){
        c.save();
        c.rect(0, 0, width, height)
        c.fillStyle = bgColor;
        c.fill();
        c.restore();
    }

    function drawWave(c, w){
        c.save();
        c.translate(0, height/2);
        c.shadowBlur = 30;

        // Add a dot, remove a dot
        w.dots.unshift(w.frac);
        if (w.dots.length > w.tail){
            w.dots.pop();
        }

        // Draw all the dots
        for (var i = 0; i < w.dots.length; i++){
            var f = w.dots[i];

            var x = f*width;
            var y = w.fn(f*2*Math.PI*baseFreq) * (height*0.9/2);
            var hue = f*360;
            var alpha = 1 - (i/w.dots.length);
            var color = 'hsla('+hue+', 80%, 50%, '+alpha+')';

            c.beginPath();
            c.arc(x, y, 5, 0, 2 * Math.PI);
            c.shadowColor = color;
            c.fillStyle = color;
            c.fill();
            c.closePath();
        }

        c.restore();
    }

    // Trigger the animation
    draw(0);
}

