
let prediction=JSON.parse(localStorage.getItem('prediction'));
console.log(prediction);
if(prediction){
    document.getElementById('responseText').innerHTML=
    `✨ Based on your skills, I suggest: <strong>${prediction.career}</strong>!`;
    document.getElementById('guidance').innerHTML=`${prediction.generated}`;
}
else {
    document.getElementById('responseText').innerHTML = `
        😕 No prediction found. Please submit your details first.
    `;
}

function goBack() {
    localStorage.removeItem('careerPrediction');
    window.location.href = "../index.html"; 
}