let yourDate = document.getElementById("yourDate");
let hfxDate = document.getElementById("hfxDate");
let comparison = document.getElementById("comparison");

setInterval(()=>{
    let currentTime = new Date();
    const yourDateString = currentTime.toLocaleString("en-US", {hour12: false});
    const hfxDateString = currentTime.toLocaleString("en-US", {timeZone: "America/Halifax", hour12: false});
    const userDate = new Date(yourDateString).getTime();
    const myDate = new Date(hfxDateString).getTime();
    const different = Math.abs(userDate - myDate) / 1000 / 60 / 60;

    yourDate.innerHTML = yourDateString;
    hfxDate.innerHTML = hfxDateString;

    if (userDate > myDate) {
        console.log("faster");
        comparison.innerHTML = "Your Time is " + different + " hr(s) ahead!";
    } else if (userDate < myDate) {
        console.log("slower");
        comparison.innerHTML = "Your Time is " + different + " hr(s) behind!";
    } else {
        console.log("Same")
        comparison.innerHTML = "We are in the same timezone.";
    }

}, 1000);






