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
//showScores
let showScores = _ =>{
    document.getElementById('question').innerHTML = '' //reset question section
    document.getElementById('endscreen').innerHTML = '' //reset end section
    //display score table, retrieve from  local memory
}
//sortScores
let sortScores(a, b){
    if(a[1] === b[1]){
        return 0; //score equal
    }else{
        if(a[1] < b[1]){
            return -1 
        }else{
            return 1
        }
    }
}
//submitScores
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
document.getElementById('submit').addEventListener('click', _ => {
    //display scoreboard
    submitScores()
    showScores()
})