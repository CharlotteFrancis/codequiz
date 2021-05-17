//variable declaration
let score = 0;
let count = 0;

//timer stuff
let time = 30;
let timer

//array of the questions
let questions = [
    {
        question: 'Which of these is not a datatype in Javascript?',
        choice: ['Number','String','Boolean','Integer'],
        answer: 'Integer'
    },
    {
        question: 'Where do we reference external Javascript files?',
        choice: ['script tag','js tag','javascript tag','style tag'],
        answer: 'script tag'
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        choice: ['if (i == 5)','if i == 5 then','if i = 5','if i = 5 then'],
        answer: 'if (i == 5)'
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        choice: ['onmouseclick','onmouseover','onchange','onclick'],
        answer: 'onclick'
    },
    {
        question: 'Is JavaScript a case-sensitive language?',
        choice: ['yes','no','sometimes','maybe'],
        answer: 'yes'
    },
    {
        question: 'How do you declare a for loop?',
        choice: ['for i = 1 to 5','for (i = 0; i <= 5; i++)','for (i <= 5; i++)','for i = 1 to 5'],
        answer: 'for (i = 0; i <= 5; i++)'
    },
    {
        question: 'How do you round the number 7.25, to the nearest integer?',
        choice: ['round(7.25)','Math.rnd(7.25)','Math.round(7.25)','rnd(7.25)'],
        answer: 'Math.round(7.25)'
    },
    {
        question: "How can you detect the client's browser name?",
        choice: ['browser.name','client.navName','client.name','navigator.appName'],
        answer: 'navigator.appName'
    },
    {
        question: 'How do you declare a JavaScript variable?',
        choice: ['let variable','v variable','variable variable','lot variable'],
        answer: 'let variable'
    },
    {
        question: 'what operator is used to do an exact comparison',
        choice: ['==','===','!=','?='],
        answer: '==='
    }
]
//question appears
let nextQuestion = _ =>{
    //reset question section
    document.getElementById('question').innerHTML = ''
    //create element
    let question = document.createElement('div')
    question.innerHTML = `
    <h4>${questions[count].question}</h4>
    <div class="collection">
        <a href="#!" class="collection-item choice" data-value="${questions[count].choice[0]}">${questions[count].choice[0]}</a>
        <a href="#!" class="collection-item choice" data-value="${questions[count].choice[1]}">${questions[count].choice[1]}</a>
        <a href="#!" class="collection-item choice" data-value="${questions[count].choice[2]}">${questions[count].choice[2]}</a>
        <a href="#!" class="collection-item choice" data-value="${questions[count].choice[3]}">${questions[count].choice[3]}</a>
    </div>
    `
    //append
    document.getElementById('question').append(question)
}

//endScreen
let endScreen = _ =>{
    clearInterval(timer) //stop timer
    document.getElementById('timer').classList = 'my-timer hidden' //hide timer
    document.getElementById('question').innerHTML = '' //reset question section
    let end = document.createElement('div')
    end.classList = "centered"
    end.innerHTML = `
    <h3>Finshed!<h3>
    <h6>Score: ${score}<h6>
    <div class="row">
        <form>
            <div class="col s4"></div>
            <div class="input-field col s4">
                <input class="initials-color" value="" id="initials">
                <label class="active my-label" for="initials">Enter your initials to submit!</label>
                <button id="submit" class="btn waves-effect waves-light red" type="submit" name="action">Submit</button>
            </div>
            <div class="col s4"></div>
        </form>
    </div>
    `
    document.getElementById('endscreen').append(end) //append endscreen
}

//show scores
let showScores = _ =>{
    document.getElementById('highscores').innerHTML = '' //prevent multiple tables
    document.getElementById('question').innerHTML = '' //reset question section
    document.getElementById('endscreen').innerHTML = '' //reset end section
    //display score table, retrieve from  local memory
    let scores = JSON.parse(localStorage.getItem('scores')) || []
    //define table head
    let table = document.createElement('table')
    table.innerHTML = `
        <thead>
          <tr>
              <th>Initials</th>
              <th>Score</th>
          </tr>
        </thead>
    `
    //define table body
    let tableBody = document.createElement('tbody')
    
    //populate table body & iterate over scores array
    for(let x = 0; x < scores.length; x++){
        tableBody.innerHTML += `
        <tr>
            <td>${scores[x].initials}</td>
            <td>${scores[x].score}</td>
        </tr>
        `
    }
    //moosh head and body
    table.append(tableBody)
    console.log(table) //table log log log
    //append
    document.getElementById('highscores').append(table)
}

//sort scores in array
let sortScores = (a, b) => {
    return(b.score - a.score) 
}

//submit scores
let submitScores = _ =>{
    let initials = document.getElementById('initials').value
    //define scores array from local storage, if it doesnt exist then create empty array
    let scores = JSON.parse(localStorage.getItem('scores')) || []
    //add initials and score to scores array
    scores.push({
        initials,
        score
    })
    scores.sort(sortScores)
    console.log(scores) // log log log
    localStorage.setItem('scores', JSON.stringify(scores))
}
//start quiz
document.getElementById('letsgo').addEventListener('click', _ => {
    document.getElementById('highscores').innerHTML = '' //removes highscore table if it's open
    document.getElementById('letsgo').remove()
    console.log('lets go pressed')
    document.getElementById('timer').innerHTML = `Time Left: ${time}`
    document.getElementById('timer').classList = 'my-timer'
    timer = setInterval(() =>{
        if(time > 0){ //if out of time then stop the game
            time--
            document.getElementById('timer').innerHTML = `Time Left: ${time}`
        }else{
            endScreen()
        }     
    },1000)
    nextQuestion();
})
//listen for answer selection
document.addEventListener('click', event =>{
    event.preventDefault()
    if(event.target.classList.contains('choice')){
        if(event.target.dataset.value === questions[count].answer){
            score++  
        }else{
            time-=5
        }
        count++
        //go to end screen if out of questions
        if(count < questions.length){
            nextQuestion()
        }else{
            endScreen()
        }
    }  
})
//listen for highscores
document.getElementById('highscore-btn').addEventListener('click', _ => {
    //display scoreboard
    clearInterval(timer)
    showScores()
})
//listen for score submition
document.addEventListener('click', event =>{
    event.preventDefault()
    if(event.target.id === 'submit'){
        //display scoreboard
        submitScores()
        showScores()
    }
})