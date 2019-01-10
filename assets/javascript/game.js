var quizArea =$('#quiz-area');
var countStartNumber = 30;


$(document).on('click', '#start-over', function(e){
    game.reset(e);
});

$(document).on('click', '.answer-button', function(e){
    game.clicked(e);
});

$(document).on('click', '#start', function(e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion(e);
  });


const questions = [{
    question: 'Who directed the movie There will be Blood?',
    answers: ['Paul Thomas Anderson', 'Martin Scorsese', 'Christopher Nolan', 'Steven Spielberg', 'Quentin Tarantino'],
    correctAnswer: 'Paul Thomas Anderson',
    image: 'assets/images/therewillbeblood.jpg'

},{
    question: 'Who directed the movie Jurassic Park?',
    answers: ['Paul Thomas Anderson', 'Martin Scorsese', 'Christopher Nolan', 'Steven Spielberg', 'Quentin Tarantino'],
    correctAnswer: 'Steven Spielberg',
    image: 'assets/images/jurassicpark.jpg'
},{
    question: 'Who directed the movie Pulp Fiction?',
    answers: ['Paul Thomas Anderson', 'Martin Scorsese', 'Christopher Nolan', 'Steven Spielberg', 'Quentin Tarantino'],
    correctAnswer: 'Quentin Tarantino',
    image: 'assets/images/pulpfictionimage.jpg'
},{
    question: 'Who directed the movie Taxi Driver?',
    answers: ['Paul Thomas Anderson', 'Martin Scorsese', 'Christopher Nolan', 'Steven Spielberg', 'Quentin Tarantino'],
    correctAnswer: 'Martin Scorsese',
    image: 'assets/images/taxidriverstill.jpg'
},{
    question: 'Who directed the movie Inception?',
    answers: ['Paul Thomas Anderson', 'Martin Scorsese', 'Christopher Nolan', 'Steven Spielberg', 'Quentin Tarantino'],
    correctAnswer: 'Christopher Nolan',
    image: 'assets/images/inception.jpg'
}];


var game = {
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,
    countdown: function(){
      game.counter--;
      $('#counter-number').html(game.counter);
  
      if (game.counter === 0){
        console.log('TIME UP');
        game.timeUp();
      }
    },
    loadQuestion: function(){
      timer = setInterval(game.countdown, 1000);
      quizArea.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
      for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
        quizArea.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
      }
    },
    nextQuestion: function(){
      game.counter = countStartNumber;
      $('#counter-number').html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
    timeUp: function (){
      clearInterval(timer);
      $('#counter-number').html(game.counter);
  
      quizArea.html('<h2>Out of Time!</h2>');
      quizArea.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
      quizArea.append('<img src="' + questions[this.currentQuestion].image + '" />');
  
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    results: function() {
      clearInterval(timer);
  
      quizArea.html('<h2>All done, heres how you did!</h2>');
      $('#counter-number').html(game.counter);
      quizArea.append('<h3>Correct Answers: ' + game.correct + '</h3>');
      quizArea.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
      quizArea.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
      quizArea.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
      clearInterval(timer);
  
      if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },
    answeredIncorrectly: function() {
      game.incorrect++;
      clearInterval(timer);
      quizArea.html('<h2>Nope!</h2>');
      quizArea.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
      quizArea.append('<img src="' + questions[game.currentQuestion].image + '" />');
  
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    answeredCorrectly: function(){
      clearInterval(timer);
      game.correct++;
      quizArea.html('<h2>Correct!</h2>');
      quizArea.append('<img src="' + questions[game.currentQuestion].image + '" />');
  
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    reset: function(){
      this.currentQuestion = 0;
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }

  
  };