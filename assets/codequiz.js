//variable declaration

let score = 0;
let count = 0;

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
    
}

//start quiz
document.getElementById('letsgo').addEventListener('click', _ => {
    document.getElementById('letsgo').remove()
    console.log('lets go clicked')
    nextQuestion();
})

document.addEventListener('click', event =>{
    event.preventDefault()
    if(event.target.classList.contains('choice')){
        if(event.target.dataset.value === questions[count].answer){
            score++  
        }
        count++
    }
    if(count < questions.length){
        nextQuestion()
    }else{
        //end screen here
    }
})