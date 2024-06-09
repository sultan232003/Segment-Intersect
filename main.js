const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const text = document.getElementById("text")
canvas_width = canvas.width = window.innerWidth
canvas_height = canvas.height = window.innerHeight
let centerX = canvas_width / 2
let centerY = canvas_height / 2
// ctx.translate(canvas_width / 2, 0)

const facing = (angle, length, point) => {
    f_x = Math.cos(angle) * length + point.x;
    f_y = Math.sin(angle) * length + point.y;
    return {
        x: f_x,
        y: f_y
    }
}


var p0 = {
    x: 100,
    y: 100
},
    p1 = {
        x: 500,
        y: 500
    },
    p2 = {
        x: canvas_width / 2,
        y: canvas_height / 2
    },
    p3 = {
        x: 80,
        y: 600
    },
    // p3 = facing(pi/50 , 300 , p2),
    clickPoint;



let test = facing(pi/4, 100 , p0)
document.body.addEventListener("mousedown", onMouseDown);

function onMouseDown(event) {
    clickPoint = getClickPoint(event.clientX, event.clientY);
    if (clickPoint) {
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    clickPoint.x = event.clientX;
    clickPoint.y = event.clientY;
    render();
}

function onMouseUp(event) {
    document.body.removeEventListener("mousemove", onMouseMove);
    document.body.removeEventListener("mouseup", onMouseUp);
}

function getClickPoint(x, y) {
    var points = [p0, p1, p2, p3];
    for (var i = 0; i < points.length; i++) {
        var p = points[i],
            dx = p.x - x,
            dy = p.y - y,
            dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 10) {
            return p;
        }

    }
}


render();

function render() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    // drawline(p0.x,p0.y,p2.x,p2.y)
    drawline(p0,p2)

    // ctx.beginPath();
    // ctx.arc(test.x, test.y, 10, 0, pi * 2, false);
    // ctx.fill();

    drawPoint(p0);
    drawPoint(p1);
    drawPoint(p2);
    drawPoint(p3);

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.stroke();

    var intersect = segmentIntersect(p0, p1, p2, p3);
    if (intersect) {
        ctx.beginPath();
        ctx.arc(intersect.x, intersect.y, 20, 0, Math.PI * 2, false);
        ctx.stroke();
    }
}

function drawPoint(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2, false);
    ctx.fill();
}


// function lineIntersect(p0, p1, p2, p3) {
//     var A1 = p1.y - p0.y,
//         B1 = p0.x - p1.x,
//         C1 = A1 * p0.x + B1 * p0.y,
//         A2 = p3.y - p2.y,
//         B2 = p2.x - p3.x,
//         C2 = A2 * p2.x + B2 * p2.y,
//         denominator = A1 * B2 - A2 * B1;

//     if (denominator == 0) {
//         return null;
//     }

//     return {
//         x: (B2 * C1 - B1 * C2) / denominator,
//         y: (A1 * C2 - A2 * C1) / denominator
//     }
// }


function segmentIntersect(p0, p1, p2, p3) {
    var A1 = p1.y - p0.y,
        B1 = p0.x - p1.x,
        C1 = A1 * p0.x + B1 * p0.y,
        A2 = p3.y - p2.y,
        B2 = p2.x - p3.x,
        C2 = A2 * p2.x + B2 * p2.y,
        denominator = A1 * B2 - A2 * B1;

    if (denominator == 0) {
        return null;
    }

    var intersectX = (B2 * C1 - B1 * C2) / denominator,
        intersectY = (A1 * C2 - A2 * C1) / denominator,
        rx0 = (intersectX - p0.x) / (p1.x - p0.x),
        ry0 = (intersectY - p0.y) / (p1.y - p0.y),
        rx1 = (intersectX - p2.x) / (p3.x - p2.x),
        ry1 = (intersectY - p2.y) / (p3.y - p2.y);

    if (((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) &&
        ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
        return {
            x: intersectX,
            y: intersectY
        };
    }
    else {
        return null;
    }
}