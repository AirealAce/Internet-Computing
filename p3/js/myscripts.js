//record input using element IDs
var textBox1 = document.getElementById("myNumber1");
var textBox2 = document.getElementById("myNumber2");
var textBox3 = document.getElementById("myNumber3");
var processButton =  document.getElementById("process");
//display error output using element ID
var errorMsg1 = document.getElementById("error1");
var errorMsg2 = document.getElementById("error2");
var errorMsg3 = document.getElementById("error3");
var errorMsg4 = document.getElementById("error4");
//have variables that correspond to the respective ID's (for display purposes)
var maxValue =  document.getElementById("max");
var minValue =  document.getElementById("min");
var meanValue = document.getElementById("mean");
var medianValue = document.getElementById("median");
var rangeValue = document.getElementById("range");
//button that calls "staticsCalc" when "click"-ed
processButton.addEventListener("click",staticsCalc);

//function for calculating
function staticsCalc()
{
    //Error Checking: 
    if ( !isNum(textBox1.value) || !isNum(textBox2.value) || !isNum(textBox3.value) || textBox1.value == "" || textBox2.value == "" || textBox3.value == "") 
    {//if invalid numbers were entered, let them know
        if ( !isNum(textBox1.value) ) {
            errorMsg1.innerHTML = "Number 1 is invalid!<br>";
        } else errorMsg1.innerHTML = ""; //no error
        if ( !isNum(textBox2.value) ) {
            errorMsg2.innerHTML = "Number 2 is invalid!<br>";
        } else errorMsg2.innerHTML = ""; //no error
        if ( !isNum(textBox3.value) ) {
            errorMsg3.innerHTML = "Number 3 is invalid!<br>";
        } else errorMsg3.innerHTML = ""; //no error    
        if(textBox1.value == "" || textBox2.value == "" || textBox3.value == ""){
            errorMsg4.innerHTML = "Some fields are empty!<br>";
        } else errorMsg4.innerHTML = ""; //no error
    }
    else
    {//all values are valid
        errorMsg1.innerHTML = "";    //no error messege
        errorMsg2.innerHTML = "";    //no error messege
        errorMsg3.innerHTML = "";    //no error messege
        errorMsg4.innerHTML = "";    //no error messege
        //convert user input into numeric form, then store it in variables
        var number1 = parseFloat(textBox1.value);
        var number2 = parseFloat(textBox2.value);
        var number3 = parseFloat(textBox3.value);
        //store user input in array, then sort that array
        var numbers = [number1, number2, number3];
        var sorted = numbers.sort( function(a,b) {return a-b });   //<-ascending order based on (a - b)'s sign. EX: - -> lesser, + -> greater, 0 ->equal.
        //compute variables
        var maxNumber = sorted[sorted.length - 1];
        var minNumber = sorted[0];
        var meanNumber, sum = 0;
        for(i = 0; i < sorted.length; ++i) { sum += sorted[i]; }
        meanNumber = sum / sorted.length;
        var medianNumber;
        if (sorted.length % 2 == 0) 
        {//if even amount of numbers were entered
            medianNumber = ( sorted[ Math.floor( sorted.length / 2 ) ] + sorted[ Math.floor( sorted.length / 2 ) - 1 ] ) / 2;
        }
        else {//if odd amount of numbers were entered
            medianNumber = sorted[ Math.floor( sorted.length / 2 ) ];
        }
        var rangeNumber = maxNumber - minNumber;
        //display variables (using textContent)
        maxValue.textContent = maxNumber;    
        minValue.textContent = minNumber;
        meanValue.textContent = meanNumber;
        medianValue.textContent = medianNumber;
        rangeValue.textContent = rangeNumber;
    }
}

//function for checking if number is valid
function isNum (str){
        //Error Checking: Check to see if valid number
        var eCount = 0, decimalCount = 0, minusCount = 0;
        for (x = 0; x < str.length;++x)
        {//inspect each character of our string
            if ( (str.charAt(x) == 'E' || str.charAt(x) == 'e') && x != str.length - 1 && x != 0)
            {//scientific notation is okay so long as e is not the first or last character
                eCount++;
            }
            else if (str.charAt(x) == '.' && x != str.length - 1)
            {//decimals are okay, so long as it is not the last character
                decimalCount++;
            }
            else if (str.charAt(x) == '-' && (str.charAt(x-1) == 'e' || str.charAt(x) == 'E') && x != str.length - 1)
            {//minus is okay so long as it comes after e/E & is not the last character
                minusCount++;
            }
            else if (str.charAt(x) == ' ')
            {/*spaces are okay*/}
            else if ( !(str.charAt(x) >= '0' && str.charAt(x) <= '9') ) 
            {//if not number, or any of the above, return false
                return false;
            }           
        }
        if ( eCount >= 2 || decimalCount >= 2 || minusCount >= 2) 
        {//legal numbers have at most 1 of these characters
            return false;
        }
        return true;    //otherwise, it is a valid number
}



