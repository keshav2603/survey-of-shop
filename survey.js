// adding a event listner so as the page lode the code start working
document.addEventListener('DOMContentLoaded',function (){ 

    const questionNumberElement = document.querySelector("#question-number");
    const questionTextElement = document.querySelector("#question-text");
    const answerOptionsContainer = document.querySelector("#answer-options");
    const prevButton = document.querySelector("#prev-button");
    const nextButton = document.querySelector("#next-button");
    //list of question asked to users 
    const questions=[
        {text: "How satisfied are you with our products?", type: "rating",maxRating: 5},
        {text: "How fair are the prices compared to similar retailers?", type: "rating",maxRating: 5},
        {text: "How satisfied are you with the value for money of your purchase?", type: "rating",maxRating: 5},
        {text: "On a scale of 1-10, how would you recommend us to your friends and family?", type: "rating",maxRating: 10},
        { text: 'What could we do to improve our service?', type: 'text' }
    ];
    let currentQuestion=0;
    
    showQuestion();

    prevButton.addEventListener('click', showPreviousQuestion);
    nextButton.addEventListener('click', showNextQuestion);

    // this function shows the question according to the currentquestion number
    function showQuestion(){
        const currentQuestionData = questions[currentQuestion];
        questionNumberElement.textContent =  currentQuestion + 1 + '/' + questions.length; 
        questionTextElement.textContent = currentQuestionData.text;

        if (currentQuestionData.type === "rating"){
            // in this checking is it rating
            renderRatingOptions(currentQuestionData.maxRating);
        }
        else if(currentQuestionData.type === 'text'){
            renderTextOption();
        }
    } 

    // this function create the button for the user to give feedback
    function renderRatingOptions(maxRating){
        answerOptionsContainer.innerHTML='';
        for(let i=1; i<=maxRating ;i++)
        {
            const optionButton = document.createElement('button');
            optionButton.textContent=i; 

            optionButton.classList.add("rating-button");
            answerOptionsContainer.appendChild(optionButton);

            //adding event listner to each button
            optionButton.addEventListener('click',()=>{ 
                optionButton.classList.add("selected-button");
                saveAnswer(i);
            });
        }
    }

    //this function create a text area for the user to write feedback 
    function renderTextOption() {
        answerOptionsContainer.innerHTML='';

        const textInput=document.createElement('textarea');
        textInput.classList.add("feedbackText");
        textInput.setAttribute('placeholder', 'Enter your response...');
        answerOptionsContainer.appendChild(textInput);
    }

    // saving user feedback
    function saveAnswer(answer){
        const currentQuestionData = questions[currentQuestion];
        const userResponse = {
            question: currentQuestionData.text,
            answer: ''
        };

        if (currentQuestionData.type === 'text') {
            userResponse.answer = answerOptionsContainer.querySelector('textarea').value;
          } else {
            userResponse.answer = answer;
          }
          storeUserResponse(userResponse);

    }

    function storeUserResponse(response) {
        userResponses.push(response);
      }

    const userResponses=[];
    
    function showPreviousQuestion() {
        if (currentQuestion > 0) {
          currentQuestion--;
          showQuestion();
        }
    }

    function showNextQuestion() {
        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          showQuestion();
        } else {
          window.location.href = 'thankyou.html';
        }
    }
});