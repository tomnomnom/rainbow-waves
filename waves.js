function waves(elem){

    var bgColor = 'rgba(50, 50, 50, 0.01)';
    var baseFreq = 2;

    var width = elem.width;
    var height = elem.height;

    var c = elem.getContext('2d');

    var waves = [
        //{frac: 0, step: 0.001, fn: Math.sin},
        //{frac: 0, step: 0.001, fn: function(n){ return Math.sin(n*3)/3; }},
        {frac: 0, step: 0.001, fn: function(n){
            return (
                Math.sin(n) +
                Math.sin(n*3)/3 +
                Math.sin(n*5)/5
            );
        }},
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
        c.beginPath();

        var x = w.frac*width;
        var y = w.fn(w.frac*2*Math.PI*baseFreq) * (height*0.9/2);
        c.arc(x, y, 5, 0, 2 * Math.PI);

        var hue = w.frac*360;
        c.fillStyle = 'hsl('+hue+',80%, 50%)';
        c.fill();

        c.closePath();
        c.restore();
    }

    // Trigger the animation
    draw(0);
}

