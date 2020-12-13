const resultKeys = {
    HUMAN: 'human',
    BRAIN: 'brain'
}

const globalStateList = {
	OPENING: 'OPENING',
	IN_PROGRESS: 'IN_PROGRESS',
	RESULT: 'RESULT'
}

let globalState = globalStateList.OPENING;
let currentQuestion = 0;
let testScore = 0;


initQuestions();

// function testStart() {
// 	document.getElementById
// }

function initQuestions() {
	document.getElementById('js-totalQuestionCount').innerText = questions.length;
	setNextQuestionData();
}

function setNextQuestionData() {
	document.getElementById('js-questionText').innerText = questions[currentQuestion].questionText;
	document.getElementById('js-questionNumber').innerText = currentQuestion + 1;
	document.getElementById('js-questionAnswers').innerHTML = prepareAnswerMarkdown(questions[currentQuestion].answers);
}

function prepareAnswerMarkdown(answers) {
	let result = '';
	answers.forEach(answer =>  {
		result += '<li><button class="question__answer" onclick="onAnswerChoose(' + answer.value + ')">'  + answer.answerText + '</button></li>';
	})
	
	return result;
}

function onAnswerChoose(chosenValue) {
	testScore += chosenValue;
	currentQuestion++;

	if (currentQuestion < questions.length) {
		setNextQuestionData();
	} else {
		showTestResults();
	}
}

function showTestResults() {
    document.getElementById('js-question').classList.add('-hidden');
    document.getElementById('js-result').classList.remove('-hidden');
    
    let resultKey = getResultNameByScore();

    document.getElementById('js-resultTitle').innerText = resultData[resultKey].title;
    document.getElementById('js-resultDescription').innerText = resultData[resultKey].desc;
    document.getElementById('js-resultImage').src = resultData[resultKey].image;
    document.getElementById('js-resultShare').innerHTML = VK.Share.button(
            {
            	url: 'https://solvery.io/',
            	title: 'Ничоси! А вы знали, что я ' + resultData[resultKey].title + '? Пройди тест и узнай, какой ты мем.',
            	image: resultData[resultKey].image,
            	noparse: true
            }, 
            {
            	type: 'round_nocount',
            	text: 'Жмяк'
            }
        )
}

function getResultNameByScore() {
    let resultKey = '';
    if (testScore < 11) {
        resultKey = resultKeys.HUMAN;
    } else {
        resultKey = resultKeys.BRAIN;
    }

    return resultKey;
}

function restartTest() {
    document.getElementById('js-result').classList.add('-hidden');
    document.getElementById('js-question').classList.remove('-hidden');
    currentQuestion = 0;
    initQuestions();
}