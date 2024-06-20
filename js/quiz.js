export class Quiz {

    constructor(questions){
        this.questions = questions;
        console.log(this.questions);
        this.currentQuestion = 0;
        this.numOfQuestions = this.questions.length;
        this.score = 0;
        this.showQuestions()
        document.getElementById("next").addEventListener("click",this.nextQuestion.bind(this) )
        document.getElementById("tryBtn").addEventListener("click", ()=>{
            $("#finish").fadeOut(500, ()=>{
                $("#setting").fadeIn(500)
            })
            $("#numberOfQuestions").val("");
        })
    }


     shuffle(array) {                    //[1,2,3,4] = > [4,3,2,1]
        let currentIndex = array.length,  randomIndex;  // 4 
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) { //2
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex); // 1
          currentIndex--; // 1
      
          // And swap it with the current element.
           // 2                   // 1
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    showQuestions(){
        document.getElementById("currentQuestion").innerHTML =  this.currentQuestion+1 ;
        document.getElementById("totalNumberOfQuestions").innerHTML =  this.numOfQuestions ;
        let correctAnswer = this.questions[this.currentQuestion].correct_answer;
        let inCorrectAnswer = this.questions[this.currentQuestion].incorrect_answers;
        let answers = [correctAnswer, ...inCorrectAnswer]
        console.log(answers);
        this.shuffle(answers)
        console.log(answers);

        document.getElementById("question").innerHTML = this.questions[this.currentQuestion].question;
        
        var cartona = '';
        for (var  i=0; i<answers.length ; i++){
            cartona+=` <label class="form-check-label">
            <input type="radio" class="form-check-input" name="answer"  value="${answers[i]}">
            ${answers[i]}
        </label> <br/>`
        }
        document.getElementById("rowAnswer").innerHTML = cartona;

    }

    nextQuestion(){
        
            if(Array.from( document.getElementsByName("answer")).filter ((el)=> el.checked).length > 0){
                
                let correct_answer = this.questions[this.currentQuestion].correct_answer.toLowerCase();
                let userAnswer=Array.from( document.getElementsByName("answer")).filter ((el)=> el.checked)[0].value.toLowerCase();
                console.log(correct_answer ,userAnswer);

                this.checkUserAnswer(userAnswer, correct_answer)
        
                this.currentQuestion++
                if( this.currentQuestion < this.numOfQuestions ){
                    this.showQuestions()
                }else {
                    $("#quiz").fadeOut(500, ()=> {
                        $("#finish").fadeIn(500)
                    })
                    document.getElementById("score").innerHTML = this.score
                }
            }else {
              
                $("#alert").fadeIn(500).fadeOut(500)
            }
       

    }

    checkUserAnswer(correctAnswer, userAnswer) {
        if (correctAnswer == userAnswer) {
            this.score++;
           $("#Correct").fadeIn(700).fadeOut(600)
        } else {
            $("#inCorrect").fadeIn(700).fadeOut(600)

        }
    
    }
 }