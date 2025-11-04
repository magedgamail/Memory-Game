document.querySelector(".control-buttons span").onclick = function () {

    let yourName = prompt("what's your name");

    if (yourName == null || yourName == ""){

        document.querySelector(".name span").innerHTML = 'Unknown'

        //Name is not empty
    } else {

        // Set name to your name
        document.querySelector(".name span").innerHTML = yourName
    }
    
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();

    ///////////////////////////////////////////////////////

    // count down function 

let time = 2 * 60;
let countdownEl = document.getElementById('countdown');

function countdown (){
    
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    

    
    seconds = seconds < 10 ? '0' + seconds : seconds;

        
    countdownEl.innerHTML = `${minutes}:${seconds}`;

    if (time <= 0){

        clearInterval(timeinterval);
        countdownEl.innerHTML = `00:00`;

        //End game function
        endgame();
    }

    time--;
    

}

countdown();

const timeinterval = setInterval(countdown, 1000)

}

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blockscontainer =document.querySelector(".memory-game-blocks");

// Create Array From Game blocks
let blocks =Array.from(blockscontainer.children);

let orderRange = [...Array(blocks.length).keys()];


shuffle(orderRange);

let Number = 0
// Add order Css property to Game Blocks
blocks.forEach((block, index) => {
    
    block.style.order =orderRange[index];

    //Add click event
    block.addEventListener('click', function () {

        // Teigger the flip block Function
        flipBlock(block);
        
        // let gameblocks = document.querySelectorAll(".game-block")
        if (block.classList.contains('has-match')) {
        
            Number++;
            console.log(Number)
        } 

        if (Number === 10){
            
            win();

         }
    })

    
})

// flip block Function
function flipBlock(selectedBlock){

    //Add class is fliped
    selectedBlock.classList.add('is-flipped');

    // Collect all fliped cards 
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));


    // If there is two selected blocks
    if (allFlippedBlocks.length === 2){

        //console.log('Two Flipped Blocks selected')

        // Stop clicking function
        stopCLicking();

        // check Matched block Function
        checkMatchedblocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
}
// Stop clicking function

function stopCLicking() {

    // Add no clicking on the main container
    blockscontainer.classList.add('no-clicking');

    setTimeout(() => {

        //Remove class no clicking after the duration
        blockscontainer.classList.remove('no-clicking');
        
    }, duration)
}

// Checked Matched Block

function checkMatchedblocks(firstblock, secondblock) {

    let trieselment = document.querySelector('.tries span');

    if (firstblock.dataset.icons === secondblock.dataset.icons) {

        firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');

        firstblock.classList.add('has-match');
        secondblock.classList.add('has-match');

        document.getElementById("success").play();

        //console.log('you win')
    } else {

        trieselment.innerHTML = parseInt(trieselment.innerHTML) + 1;

        setTimeout(() => {

            firstblock.classList.remove('is-flipped');
            secondblock.classList.remove('is-flipped');


        }, duration)

        document.getElementById("fail").play();

        //console.log('you lost')
    }


}

//Shuffle function

function shuffle (array){

    // settings vars
    let current = array.length,
    temp,
    random;

    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() *current);

        // Decrease length by one
        current--;

        // [1] save current elment in stash
        temp = array[current];

        // [2] current elment = random element 
        array[current] = array[random];

        // [3] Random Element = get Element From stash
        array[random] = temp;
        
    }

     return array;

}




// End game function
function endgame(){

    //create popup div
    let div = document.createElement('div');

    //create text
    let divtext = document.createTextNode(`You lost the Game, Your score is ${Number}`);

    //divtext to div
    div.appendChild(divtext);

    //add class on div
    div.className = "popup";

    //append popup to page

    document.body.appendChild(div)
    // css styling 
}

// Win Function
function win(){
    //create popup div
    let div = document.createElement('div');

    //create text
    let divtext = document.createTextNode(`You Win the Game, Your score is ${Number}`);

    //divtext to div
    div.appendChild(divtext);

    //add class on div
    div.className = "popup-win";

    //append popup to page

    document.body.appendChild(div)
}