import { Quiz } from "./quiz.js"
export class Setting {
    constructor(){
    
        this.categoryElement = document.getElementById("category");
        this.dificultyElements= document.getElementsByName("difficulty");
        this.numOfQuestionsElement = document.getElementById("numberOfQuestions");
        document.getElementById("startBtn").addEventListener("click",this.startQuiz.bind(this) )

    }


    async startQuiz(){
        let category = this.categoryElement.value;
        let difficulty = Array.from(this.dificultyElements).filter(el => el.checked)[0].value;
        let numOfQuestions = this.numOfQuestionsElement.value

        if(numOfQuestions == ""){
            $("#alert1").fadeIn(500);
        }else{
            let Api = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}`
            let questions= await this.fetchApi(Api)
            if(questions.length >0){
                $("#setting").fadeOut(500 ,()=>{
                    $("#quiz").fadeIn(500)
                })

                let quiz = new Quiz(questions);
    
            }

        }
    }


    async fetchApi(Api){
        let response =await fetch(Api)
        response =await response.json()
        return response.results
    }
}

