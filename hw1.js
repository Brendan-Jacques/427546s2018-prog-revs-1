/*
function toggle(num) {
    if(num == 1) {
        document.getElementById('DrawCircle').style.display = "none";
        document.getElementById("DrawEllipse").style.display = "none";
        document.getElementById('DrawRectangle').style.display = "none";
        document.getElementById("DrawPolygon").style.display = "none";
        document.getElementById("DrawPolyLine").style.display = "none";
    }else if(num == 2) {
        document.getElementById('DrawCircle').style.display = "block";
        document.getElementById("DrawEllipse").style.display = "none";
        document.getElementById('DrawRectangle').style.display = "none";
        document.getElementById("DrawPolygon").style.display = "none";
        document.getElementById("DrawPolyLine").style.display = "none";
    }else if(num == 3) {
        document.getElementById('DrawCircle').style.display = "none";
        document.getElementById("DrawEllipse").style.display = "block";
        document.getElementById('DrawRectangle').style.display = "none";
        document.getElementById("DrawPolygon").style.display = "none";
        document.getElementById("DrawPolyLine").style.display = "none";
    } else if(num == 4) {
        document.getElementById('DrawCircle').style.display = "none";
        document.getElementById("DrawEllipse").style.display = "none";
        document.getElementById('DrawRectangle').style.display = "block";
        document.getElementById("DrawPolygon").style.display = "none";
        document.getElementById("DrawPolyLine").style.display = "none";
    } else if(num == 5) {
        document.getElementById('DrawCircle').style.display = "none";
        document.getElementById("DrawEllipse").style.display = "none";
        document.getElementById('DrawRectangle').style.display = "none";
        document.getElementById("DrawPolygon").style.display = "block";
        document.getElementById("DrawPolyLine").style.display = "none";
    } else if(num == 6) {
        document.getElementById('DrawCircle').style.display = "none";
        document.getElementById("DrawEllipse").style.display = "none";
        document.getElementById('DrawRectangle').style.display = "none";
        document.getElementById("DrawPolygon").style.display = "none";
        document.getElementById("DrawPolyLine").style.display = "block";
    }
    document.getElementById('main').style.display = "block";
}
*/
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


window.onload = function() {
    //This function serves as the trigger for each of the project's functions.
    var canvas = document.getElementById('main');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var toggle = parseInt(0);
    var prevX, prevY;
    var firstX, firstY;
    var tempX, tempY;
    var x1, y1;
    var result = false;
    var count = 0;
    
    document.getElementById('drawLine').addEventListener("click", function(){toggle = 0; prevX = null; prevY = null;});
    document.getElementById('drawCircle').addEventListener("click", function(){toggle = 1; prevX = null; prevY = null;});
    //document.getElementById('drawEllipse').addEventListener("click", function(){toggle = 2; prevX = null; prevY = null;});
    document.getElementById('drawRectangle').addEventListener("click", function(){toggle = 3; prevX = null; prevY = null;});
    document.getElementById('drawPolygon').addEventListener("click", function(){toggle = 4; prevX = null; prevY = null;});
    document.getElementById('drawPolyline').addEventListener("click", function(){toggle = 5; prevX = null; prevY = null;});
    document.getElementById('erase').addEventListener("click", function(){
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    document.getElementById("main").addEventListener("click", function(evt) {
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

        var data = imageData.data;

        var mousePosition = getMousePosition(canvas, evt);
        
        switch(toggle){
            case 0: //Line
                if(prevX == null && prevY == null) {
                    prevX = parseInt(mousePosition.x);
                    prevY = parseInt(mousePosition.y);
                } else {
                    var data = line(data, canvasWidth, canvasHeight, prevX, prevY, parseInt(mousePosition.x), parseInt(mousePosition.y), false);

                    if(data != false) {
                        ctx.putImageData(imageData, 0, 0);
                        prevX = null;
                        prevY = null;
                    }
                }
                break;
            case 1: //Circle
                if(prevX == null && prevY == null) {
                    prevX = parseInt(mousePosition.x);
                    prevY = parseInt(mousePosition.y);
                } else {
                    var data = circle(data, canvasWidth, canvasHeight, prevX, prevY, parseInt(mousePosition.x), parseInt(mousePosition.y));

                    if(data != false) {
                        ctx.putImageData(imageData, 0, 0);
                        prevX = null;
                        prevY = null;
                    }
                }
                break;
            case 2: //Ellipse
                
                break;
            case 3: //Rectangle
                if(prevX == null && prevY == null) {
                    prevX = parseInt(mousePosition.x);
                    prevY = parseInt(mousePosition.y);
                } else {
                    result = line(data, canvasWidth, canvasHeight, prevX, prevY, parseInt(mousePosition.x), prevY, false);
                    if(result != false) {
                        result = line(data, canvasWidth, canvasHeight, parseInt(mousePosition.x), prevY, parseInt(mousePosition.x), parseInt(mousePosition.y), false);
                        if(result != false) {
                            result = line(data, canvasWidth, canvasHeight, parseInt(mousePosition.x), parseInt(mousePosition.y), prevX, parseInt(mousePosition.y), false);
                            if(result != false) {
                                result = line(data, canvasWidth, canvasHeight, prevX, parseInt(mousePosition.y), prevX, prevY, false);
                                if(result != false) {
                                    ctx.putImageData(imageData, 0, 0);
                                }
                            }
                        }
                    }
                    prevX = null;
                    prevY = null;
                }
                break;
            case 4: //Polygon
                if(prevX == null && prevY == null) {
                    prevX = parseInt(mousePosition.x); firstX = parseInt(mousePosition.x);
                    prevY = parseInt(mousePosition.y); firstY = parseInt(mousePosition.y);
                } else {
                    result = line(data, canvasWidth, canvasHeight, prevX, prevY, parseInt(mousePosition.x), parseInt(mousePosition.y), false);
                    if(result != false) {
                        if(count > 1) {
                            result = line(data, canvasWidth, canvasHeight, prevX, prevY, firstX, firstY, true);
                        }
                        result = line(data, canvasWidth, canvasHeight, parseInt(mousePosition.x), parseInt(mousePosition.y), firstX, firstY, false);
                        ctx.putImageData(imageData, 0, 0);
                    }
                    prevX = parseInt(mousePosition.x);
                    prevY = parseInt(mousePosition.y);
                    count++;
                }
                break;
            case 5: //Polyline
                if(prevX == null && prevY == null) {
                    prevX = parseInt(mousePosition.x);
                    prevY = parseInt(mousePosition.y);
                } else {
                    result = line(data, canvasWidth, canvasHeight, prevX, prevY, parseInt(mousePosition.x), parseInt(mousePosition.y), false);
                    if(result != false) {
                        ctx.putImageData(imageData, 0, 0);
                    }
                    prevX = parseInt(mousePosition.x);
                    prevY = parseInt(mousePosition.y);
                }
                break;
        }
    });
    return;
}
/*                                                     
function drawLine(){
    //First, the drawLine function gets the canvas parameters.
    var canvas = document.getElementById('main');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var prevX, prevY;
    
    document.getElementById("main").addEventListener("click", function(evt) {
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

        var data = imageData.data;

        var mousePosition = getMousePosition(canvas, evt);
        if(prevX == null && prevY == null) {
            prevX = parseInt(mousePosition.x);
            prevY = parseInt(mousePosition.y);
        } else {
            var data = line(data, canvasWidth, canvasHeight, prevX, prevY, parseInt(mousePosition.x), parseInt(mousePosition.y), false);

            if(data != false) {
                ctx.putImageData(imageData, 0, 0);
                prevX = null;
                prevY = null;
            }
        }
    });
    return;
}
*/

function line(data, canvasWidth, canvasHeight, x1, y1, x2, y2, remove){
    //Uses a midpoint formula to calculate by pixel how the line progresses from endpoint to endpoint.
    //(y1-y2)x + (x2-x1)y + (x1y2 - x2y1) = 0.
    var A = y1 - y2;
    var B = x2 - x1;
    var C = (x1 * y2) - (x2 * y1);
    var prevX = x1;
    var prevY = y1;
    var newX, newY, lineEquH, lineEquD, lineEquV;
    var pixelIndex;
    var h, d, v;
    
    var x_change = x2 - x1;
    var y_change = y2 - y1;
    while(prevX != x2 || prevY != y2) {
        
        if(x_change > 0) {
            newX = prevX + 1;
        } else {
            newX = prevX - 1;
        }
        if(y_change > 0) {
            newY = prevY + 1;
        } else {
            newY = prevY - 1;
        }
        lineEquH = (A * newX) + (B * prevY) + C;
        lineEquD = (A * newX) + (B * newY) + C;
        lineEquV = (A * prevX) + (B * newY) + C;
        if(lineEquH == 0) {
            //if the line is continuing horizontally, insert pixel, update prexX ONLY, then repeat the loop
            //This section works perfectly. 
            prevX = newX;
            pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
            data[pixelIndex] = parseInt(0);
            data[pixelIndex + 1] = parseInt(0);
            data[pixelIndex + 2] = parseInt(0);
            if(remove == false) { data[pixelIndex + 3] = parseInt(255);
            } else{ data[pixelIndex+3] = parseInt(0); }
            
        } else if(lineEquD == 0) {
            //if the line is continuing diagonally, insert pixel, update prevX AND prevY, then repeat the loop.
            //This section works perfectly.
            prevX = newX;
            prevY = newY;
            pixelIndex = (prevY * canvasWidth + prevX) * 4;
            data[pixelIndex] = parseInt(0);
            data[pixelIndex + 1] = parseInt(0);
            data[pixelIndex + 2] = parseInt(0);
            if(remove == false) { data[pixelIndex + 3] = parseInt(255);
            } else{ data[pixelIndex+3] = parseInt(0); }
            
        } else if(lineEquV == 0) {
          //if this line is continuing vertically, insert pixel, update ONLY prevY, then repeat the loop.
            prevY = newY;
            pixelIndex = (prevY * canvasWidth + prevX) * 4;
            data[pixelIndex] = parseInt(0);
            data[pixelIndex + 1] = parseInt(0);
            data[pixelIndex + 2] = parseInt(0);
            if(remove == false) { data[pixelIndex + 3] = parseInt(255);
            } else{ data[pixelIndex+3] = parseInt(0); }
            
        } else {
            //If none of them equal zero, we have to find which value is closest to zero and use that one.
            h = Math.abs(lineEquH);
            d = Math.abs(lineEquD);
            v = Math.abs(lineEquV);
            if(h < v) {
                //If horizontal is closer to zero than vertical...
                if(h < d) {
                    //If horizontal is closer than diagonal, shift horizontally.
                    prevX = newX;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    if(remove == false) { data[pixelIndex + 3] = parseInt(255);
                    } else{ data[pixelIndex+3] = parseInt(0); }
                } else if(d == h) {
                    //If diagonal is equally close as horizontal, color both horizontal and diagonal and progress diagonally.
                    prevX = newX;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    if(remove == false) { data[pixelIndex + 3] = parseInt(255);
                    } else{ data[pixelIndex+3] = parseInt(0); }
                    
                    prevY = newY;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    if(remove == false) { data[pixelIndex + 3] = parseInt(255);
                    } else{ data[pixelIndex+3] = parseInt(0); }
                    
                } else if(d < h) {
                    //If diagonal is closer than horizontal, shift diagonally.
                    prevX = newX;
                    prevY = newY;
                    pixelIndex = (prevY * canvasWidth + prevX) * 4;
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    if(remove == false) { data[pixelIndex + 3] = parseInt(255);
                    } else{ data[pixelIndex+3] = parseInt(0); }
                    
                }
            } else if(v < h) {
                //If vertical is closer than horizontal...
                if(v < d) {
                    //If vertical is closer than diagonal, shift vertically.
                    prevY = newY;
                    pixelIndex = (prevY * canvasWidth +     prevX) * 4;
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    if(remove == false) { data[pixelIndex + 3] = parseInt(255);
                    } else{ data[pixelIndex+3] = parseInt(0); }
                    
                } else if(v == d) {
                    //If vertical is equally close as diagonal, color both the vertical and diagonal pixels and progress diagonally.
                    prevY = newY;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    if(remove == false) { data[pixelIndex + 3] = parseInt(255);
                    } else{ data[pixelIndex+3] = parseInt(0); }
                    
                    prevX = newX;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    if(remove == false) { data[pixelIndex + 3] = parseInt(255);
                    } else{ data[pixelIndex+3] = parseInt(0); }
                    
                } else if(d < v) {
                    //If diagonal is closer than vertical, shift diagonally.
                    prevX = newX;
                    prevY = newY;
                    pixelIndex = (prevY * canvasWidth + prevX) * 4;
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    if(remove == false) { data[pixelIndex + 3] = parseInt(255);
                    } else{ data[pixelIndex+3] = parseInt(0); }
                    
                }
            } else if(v == h) {
                //If vertical and horizontal are equivalent, then shift diagonally.
                //May be wrong.
                prevX = newX;
                prevY = newY;
                pixelIndex = (prevY * canvasWidth + prevX) * 4;
                data[pixelIndex] = parseInt(0);
                data[pixelIndex + 1] = parseInt(0);
                data[pixelIndex + 2] = parseInt(0);
                if(remove == false) { data[pixelIndex + 3] = parseInt(255);
                } else{ data[pixelIndex+3] = parseInt(0); }
            } else {
                //Something's gone wrong...
                return false;
            }  
            
        }
    }
    return true;
}
/*
function drawEllipse() {
    var canvas = document.getElementById('main');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var prevX, prevY;
    
    document.getElementById("main").addEventListener("click", function(evt) {
    
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

        var data = imageData.data;

        var mousePosition = getMousePosition(canvas, evt);
        
        if(prevX == null && prevY == null) {
            prevX = parseInt(mousePosition.x);
            prevY = parseInt(mousePosition.y);
        } else {
            var data = ellipse(data, canvasWidth, canvasHeight, prevX, prevY, parseInt(mousePosition.x), parseInt(mousePosition.y), false);

            if(data != false) {
                ctx.putImageData(imageData, 0, 0);
                prevX = null;
                prevY = null;
            }
        }
    });
    return;
}
*/
/*
function ellipse(data, canvasWidth, canvasHeight, x1, y1, x2, y2) {
    //((newX - centerX^2)/(radiusOnX-Axis^2)) + ((newY - centerY ^ 2)/(radiusOnY-Axis^2)) - 1 = 0;
    var centerX = parseFloat((x1 + x2) / 2);
    var centerY = parseFloat((y1 + y2) / 2);
    var A = Math.abs(x2 - x1);
    var B = Math.abs(y2 - y1);
    //A^2 + B^2 = C^2, and C = radius.
    var radiusX = (Math.sqrt((Math.pow(A, 2)) + (Math.pow(B, 2))) / 2);
    //radiusY is an arbitrary value.
    var radiusY = parseInt(radiusX / 2);
    
    var prevX = x1;
    var prevY = y1;
    var newX, newY, lineEquH, lineEquD, lineEquV;
    var pixelIndex;
    var h, d, v;
    var xIncrement, yIncrement;
    var markOne = false;
    var markTwo = false;
    var xChange = (x2 - x1);
    var yChange = (y2 - y1);
    
    if((xChange > 0) && (yChange > 0)) {
        //If change in x and y are both positive, the ellipse will be positively increasing.
        xIncrement = true;
        yIncrement = false;
    } else if((xChange < 0) && (yChange > 0)){
        //If change in x is negative but change in y is positive, the circle will begin with both x and y increasing.
        xIncrement = true;
        yIncrement = true;
    } else if((xChange < 0) && (yChange < 0)) {
        //If change in x and y is negative, the circle will begin with x decrementing and y incrementing.
        xIncrement = false;
        yIncrement = false;
    } else if((xChange > 0) && (yChange < 0)) {
        //If change in x is positive but change in y is negative, then the circle will start decrementing x and y.
        xIncrement = false;
        yIncrement = false;
    } 
    
    while(markOne != true || markTwo != true) {
        
        //Milestones:
        //The ellipse milestones should be:
        if((prevX == parseInt(centerX)) && (prevY > parseInt(centerY))){
            xIncrement = false;
            yIncrement = false;
        }
        if((prevX < parseInt(centerX)) && (prevY == parseInt(centerY))) {
            xIncrement = true;
            yIncrement = false;
        }
        if((prevX == parseInt(centerX)) && (prevY < parseInt(centerY))) {
            xIncrement = true;
            yIncrement = true;
        }
        if((prevX > parseInt(centerX)) && (prevY == parseInt(centerY))) {
            xIncrement = false;
            yIncrement = true;
        }
        
        //Determine newX and newY
        if(xIncrement == true) {
            newX = prevX + 1;
        } else {
            newX = prevX - 1;
        }
        if(yIncrement == true) {
            newY = prevY + 1;
        } else {
            newY = prevY - 1;
        }
        
        //((newX^2)/(radiusOnX-Axis^2)) + ((newY ^ 2)/(radiusOnY-Axis^2)) - 1 = 0;
        lineEquH = (Math.pow((newX - centerX), 2)/ Math.pow((radiusX), 2)) + (Math.pow(prevY - centerY, 2) / Math.pow(radiusY, 2)) - 1;
        lineEquD = (Math.pow((newX - centerX), 2)/ Math.pow((radiusX), 2)) + (Math.pow(newY - centerY, 2) / Math.pow(radiusY, 2)) - 1;
        lineEquV = (Math.pow((prevX - centerX), 2)/ Math.pow((radiusX), 2)) + (Math.pow(newY - centerY, 2) / Math.pow(radiusY, 2)) - 1;
        if(lineEquH == 0) {
            //if the line is continuing horizontally, insert pixel, update prexX ONLY, then repeat the loop
            //This section works perfectly. 
            prevX = newX;
            pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
            data[pixelIndex] = parseInt(0);
            data[pixelIndex + 1] = parseInt(0);
            data[pixelIndex + 2] = parseInt(0);
            data[pixelIndex + 3] = parseInt(255);
            
        } else if(lineEquD == 0) {
            //if the line is continuing diagonally, insert pixel, update prevX AND prevY, then repeat the loop.
            //This section works perfectly.
            prevX = newX;
            prevY = newY;
            pixelIndex = (prevY * canvasWidth + prevX) * 4;
            data[pixelIndex] = parseInt(0);
            data[pixelIndex + 1] = parseInt(0);
            data[pixelIndex + 2] = parseInt(0);
            data[pixelIndex + 3] = parseInt(255);
            
        } else if(lineEquV == 0) {
          //if this line is continuing vertically, insert pixel, update ONLY prevY, then repeat the loop.
            prevY = newY;
            pixelIndex = (prevY * canvasWidth + prevX) * 4;
            data[pixelIndex] = parseInt(0);
            data[pixelIndex + 1] = parseInt(0);
            data[pixelIndex + 2] = parseInt(0);
            data[pixelIndex + 3] = parseInt(255);
            
        } else {
            //If none of them equal zero, we have to find which value is closest to zero and use that one.
            h = Math.abs(lineEquH);
            d = Math.abs(lineEquD);
            v = Math.abs(lineEquV);
            if(h < v) {
                //If horizontal is closer to zero than vertical...
                if(h < d) {
                    //If horizontal is closer than diagonal, shift horizontally.
                    prevX = newX;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255); 
                } else if(d == h) {
                    //If diagonal is equally close as horizontal, color both horizontal and diagonal and progress diagonally.
                    prevX = newX;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255); 
                    
                    prevY = newY;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255); 
                    
                } else if(d < h) {
                    //If diagonal is closer than horizontal, shift diagonally.
                    prevX = newX;
                    prevY = newY;
                    pixelIndex = (prevY * canvasWidth + prevX) * 4;
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255);
                    
                }
            } else if(v < h) {
                //If vertical is closer than horizontal...
                if(v < d) {
                    //If vertical is closer than diagonal, shift vertically.
                    prevY = newY;
                    pixelIndex = (prevY * canvasWidth +     prevX) * 4;
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255);
                    
                } else if(v == d) {
                    //If vertical is equally close as diagonal, color both the vertical and diagonal pixels and progress diagonally.
                    prevY = newY;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255);
                    
                    prevX = newX;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255); 
                    
                } else if(d < v) {
                    //If diagonal is closer than vertical, shift diagonally.
                    prevX = newX;
                    prevY = newY;
                    pixelIndex = (prevY * canvasWidth + prevX) * 4;
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255);
                    
                }
            } else if(v == h) {
                //If vertical and horizontal are equivalent, then shift horizontally. It's a circle so in the starting case either direction may suffice. So go with horizontal and render clockwise.
                //May be wrong.
                prevX = newX;
                pixelIndex = (prevY * canvasWidth + prevX) * 4;
                data[pixelIndex] = parseInt(0);
                data[pixelIndex + 1] = parseInt(0);
                data[pixelIndex + 2] = parseInt(0);
                data[pixelIndex + 3] = parseInt(255);
            } else {
                //Something's gone wrong...
                return false;
            }  
            
        }
        if(prevX == x2 && prevY == y2) {
            markOne = true;
        }
        if(prevX == x1 && prevY == y1) {
            markTwo = true;
        }
    }
    
    return true;
}
*/
/*
function drawCircle() {
    var canvas = document.getElementById('main');
    var canvasWidth = canvas.offsetWidth;
    var canvasHeight = canvas.offsetHeight;
    var prevX, prevY;   
    document.getElementById("main").addEventListener("click", function(evt) {
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

        var data = imageData.data;

        var mousePosition = getMousePosition(canvas, evt);
        if(prevX == null && prevY == null) {
            prevX = parseInt(mousePosition.x);
            prevY = parseInt(mousePosition.y);
        } else {
            var data = circle(data, canvasWidth, canvasHeight, prevX, prevY, parseInt(mousePosition.x), parseInt(mousePosition.y));

            if(data != false) {
                ctx.putImageData(imageData, 0, 0);
                prevX = null;
                prevY = null;
            }
        }
        return;
    });
    return;
}
*/
function circle(data, canvasWidth, canvasHeight, x1, y1, x2, y2) {
    //(newX - centerX)^2 + (newY - centerY)^2 = radius^2.
    //(newX - centerX)^2 + (newY - centerY)^2 - radius^2 = 0.
    
   
    var centerX = parseFloat((x1 + x2) / 2);
    var centerY = parseFloat((y1 + y2) / 2);
    var A = Math.abs(x2 - x1);
    var B = Math.abs(y2 - y1);
    //A^2 + B^2 = C^2, and C = radius.
    var radius = (Math.sqrt((Math.pow(A, 2)) + (Math.pow(B, 2))) / 2);
    
    var prevX = x1;
    var prevY = y1;
    var newX, newY, lineEquH, lineEquD, lineEquV;
    var pixelIndex;
    var h, d, v;
    var xIncrement, yIncrement;
    var markOne = false;
    var markTwo = false;
    var xChange = (x2 - x1);
    var yChange = (y2 - y1);
    
    //This is incorrect. It technically works if the circle is on the x or y axis, but if the points are in any form of rotation, the change in x/y isn't consistent over the entire circle, so it's choosing the wrong starting state.
    
    //Okay, in theory the program works now, but it attempts to handle float centers by rounding it down to an even one, which makes the program run infinitely.
    
    //Okay, the problem now is that, while I can have the center be a theoretical float, 
    if((xChange > 0) && (yChange > 0)) {
        //If change in x and y are both positive, the circle will begin by incrementing x and decrementing y.
        xIncrement = true;
        yIncrement = false;
    } else if((xChange < 0) && (yChange > 0)){
        //If change in x is negative but change in y is positive, the circle will begin with both x and y increasing.
        xIncrement = true;
        yIncrement = true;
    } else if((xChange < 0) && (yChange < 0)) {
        //If change in x and y is negative, the circle will begin with x decrementing and y incrementing.
        xIncrement = false;
        yIncrement = true;
    } else if((xChange > 0) && (yChange < 0)) {
        //If change in x is positive but change in y is negative, then the circle will start decrementing x and y.
        xIncrement = false;
        yIncrement = false;
    }
    
    while(markOne != true || markTwo != true) {
        
        //Milestones:
        if((prevX == parseInt(centerX)) && (prevY > parseInt(centerY))){
            xIncrement = false;
            yIncrement = false;
        }
        if((prevX < parseInt(centerX)) && (prevY == parseInt(centerY))) {
            xIncrement = true;
            yIncrement = false;
        }
        if((prevX == parseInt(centerX)) && (prevY < parseInt(centerY))) {
            xIncrement = true;
            yIncrement = true;
        }
        if((prevX > parseInt(centerX)) && (prevY == parseInt(centerY))) {
            xIncrement = false;
            yIncrement = true;
        }
        
        //Determine newX and newY
        if(xIncrement == true) {
            newX = prevX + 1;
        } else {
            newX = prevX - 1;
        }
        if(yIncrement == true) {
            newY = prevY + 1;
        } else {
            newY = prevY - 1;
        }
        
        lineEquH = Math.pow((newX - centerX), 2) + Math.pow((prevY - centerY), 2) - Math.pow(radius, 2);
        lineEquD = Math.pow((newX - centerX), 2) + Math.pow((newY - centerY), 2) - Math.pow(radius, 2);
        lineEquV = Math.pow((prevX - centerX), 2) + Math.pow((newY - centerY), 2) - Math.pow(radius, 2);
        if(lineEquH == 0) {
            //if the line is continuing horizontally, insert pixel, update prexX ONLY, then repeat the loop
            //This section works perfectly. 
            prevX = newX;
            pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
            data[pixelIndex] = parseInt(0);
            data[pixelIndex + 1] = parseInt(0);
            data[pixelIndex + 2] = parseInt(0);
            data[pixelIndex + 3] = parseInt(255);
            
        } else if(lineEquD == 0) {
            //if the line is continuing diagonally, insert pixel, update prevX AND prevY, then repeat the loop.
            //This section works perfectly.
            prevX = newX;
            prevY = newY;
            pixelIndex = (prevY * canvasWidth + prevX) * 4;
            data[pixelIndex] = parseInt(0);
            data[pixelIndex + 1] = parseInt(0);
            data[pixelIndex + 2] = parseInt(0);
            data[pixelIndex + 3] = parseInt(255);
            
        } else if(lineEquV == 0) {
          //if this line is continuing vertically, insert pixel, update ONLY prevY, then repeat the loop.
            prevY = newY;
            pixelIndex = (prevY * canvasWidth + prevX) * 4;
            data[pixelIndex] = parseInt(0);
            data[pixelIndex + 1] = parseInt(0);
            data[pixelIndex + 2] = parseInt(0);
            data[pixelIndex + 3] = parseInt(255);
            
        } else {
            //If none of them equal zero, we have to find which value is closest to zero and use that one.
            h = Math.abs(lineEquH);
            d = Math.abs(lineEquD);
            v = Math.abs(lineEquV);
            if(h < v) {
                //If horizontal is closer to zero than vertical...
                if(h < d) {
                    //If horizontal is closer than diagonal, shift horizontally.
                    prevX = newX;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255); 
                } else if(d == h) {
                    //If diagonal is equally close as horizontal, color both horizontal and diagonal and progress diagonally.
                    prevX = newX;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255); 
                    
                    prevY = newY;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255); 
                    
                } else if(d < h) {
                    //If diagonal is closer than horizontal, shift diagonally.
                    prevX = newX;
                    prevY = newY;
                    pixelIndex = (prevY * canvasWidth + prevX) * 4;
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255);
                    
                }
            } else if(v < h) {
                //If vertical is closer than horizontal...
                if(v < d) {
                    //If vertical is closer than diagonal, shift vertically.
                    prevY = newY;
                    pixelIndex = (prevY * canvasWidth +     prevX) * 4;
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255);
                    
                } else if(v == d) {
                    //If vertical is equally close as diagonal, color both the vertical and diagonal pixels and progress diagonally.
                    prevY = newY;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255);
                    
                    prevX = newX;
                    pixelIndex = parseInt((prevY * canvasWidth + prevX) * 4);
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255); 
                    
                } else if(d < v) {
                    //If diagonal is closer than vertical, shift diagonally.
                    prevX = newX;
                    prevY = newY;
                    pixelIndex = (prevY * canvasWidth + prevX) * 4;
                    data[pixelIndex] = parseInt(0);
                    data[pixelIndex + 1] = parseInt(0);
                    data[pixelIndex + 2] = parseInt(0);
                    data[pixelIndex + 3] = parseInt(255);
                    
                }
            } else if(v == h) {
                //If vertical and horizontal are equivalent, then shift horizontally. It's a circle so in the starting case either direction may suffice. So go with horizontal and render clockwise.
                //May be wrong.
                prevX = newX;
                pixelIndex = (prevY * canvasWidth + prevX) * 4;
                data[pixelIndex] = parseInt(0);
                data[pixelIndex + 1] = parseInt(0);
                data[pixelIndex + 2] = parseInt(0);
                data[pixelIndex + 3] = parseInt(255);
            } else {
                //Something's gone wrong...
                return false;
            }  
            
        }
        if(prevX == x2 && prevY == y2) {
            markOne = true;
        }
        if(prevX == x1 && prevY == y1) {
            markTwo = true;
        }
    }
    //Okay, so in order for this to work properly, I need to design a formula that flips the increment/decrement of x and y based on how far along the progression of the circle is.
    //What if I accomplish that by tracking certain milestones? Assume the circle is always drawn clockwise.
    return data;
}
/*
function drawRectangle() {
    var canvas = document.getElementById('main');
    var canvasWidth = canvas.offsetWidth;
    var canvasHeight = canvas.offsetHeight;
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    
    var data = imageData.data;
    var result = false;
    
    //Next, the function gets the start and endpoints for the line being drawn. This part will be replaced as we go on.
    var x1 = parseInt(document.getElementById("pointRect1-x").value);
    var y1 = parseInt(document.getElementById("pointRect1-y").value);
    var x2 = parseInt(document.getElementById("pointRect2-x").value);
    var y2 = parseInt(document.getElementById("pointRect2-y").value);
    
    result = line(data, canvasWidth, canvasHeight, x1, y1, x2, y1, false);
    
    if(result != false) {
        result = line(data, canvasWidth, canvasHeight, x2, y1, x2, y2, false);
        if(result != false) {
            result = line(data, canvasWidth, canvasHeight, x2, y2, x1, y2, false);
            if(result != false) {
                result = line(data, canvasWidth, canvasHeight, x1, y2, x1, y1, false);
                if(result != false) {
                    ctx.putImageData(imageData, 0, 0);
                }
            }
        }
    }
    return;
}
    
function drawPolygon() {
    var canvas = document.getElementById('main');
    var canvasWidth = canvas.offsetWidth;
    var canvasHeight = canvas.offsetHeight;
    var prevX, prevY;
    var firstX, firstY;
    var tempX, tempY;
    var x1, y1;
    var result = false;
    var count = 0;
    
    document.getElementById('drawPGon').addEventListener("click", function() {
        x1 = parseInt(document.getElementById("pointPGon1-x").value);
        y1 = parseInt(document.getElementById("pointPGon1-y").value);
        if(prevX == null && prevY == null) {
            prevX = x1; firstX = x1;
            prevY = y1; firstY = y1;
        } else {
            var ctx = canvas.getContext('2d');
            var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

            var data = imageData.data;
            result = line(data, canvasWidth, canvasHeight, prevX, prevY, x1, y1, false);
            if(result != false) {
                if(count > 1) {
                    result = line(data, canvasWidth, canvasHeight, prevX, prevY, firstX, firstY, true);
                }
                result = line(data, canvasWidth, canvasHeight, x1, y1, firstX, firstY, false);
                ctx.putImageData(imageData, 0, 0);
            }
            prevX = x1;
            prevY = y1;
            count++;
        }
    });
}
*/
/*
function drawPolyline() {
    var canvas = document.getElementById('main');
    var canvasWidth = canvas.offsetWidth;
    var canvasHeight = canvas.offsetHeight;
    var prevX, prevY;
    var x1, y1;
    var result = false;
    
    document.getElementById('drawPLine').addEventListener("click", function() {
        x1 = parseInt(document.getElementById("pointPLine1-x").value);
        y1 = parseInt(document.getElementById("pointPLine1-y").value);
        if(prevX == null && prevY == null) {
            prevX = x1;
            prevY = y1;
        } else {
            var ctx = canvas.getContext('2d');
            var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

            var data = imageData.data;
            result = line(data, canvasWidth, canvasHeight, prevX, prevY, x1, y1, false);
            if(result != false) {
                ctx.putImageData(imageData, 0, 0);
            }
            prevX = x1;
            prevY = y1;
        }
    });
}

*/