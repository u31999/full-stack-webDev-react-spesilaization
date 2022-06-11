let rect = require('./rectangle');

function solveRect(l, b) {
    console.log(`Solving for rectangle with L = ${l} and b = ${b}`);

    rect(l, b, (err, rectangle) => {
        if(err) {
            console.log("Error : ", err.message);
        }else{
            console.log("The area of the rectangle of dimintions l = " 
                + l + " and b = " + b + " is : " + rectangle.area());
            console.log("The peremeter of the rectangle of dimintions l = " 
                + l + " and b = " + b + " is : " + rectangle.perimeter());
        }
    });
    console.log('This statment is after the call to rect')
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);