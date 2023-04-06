
class Question {
    constructor(question, rightAnswer, ...options) {
        this.question = question
        this.rightAnswer = rightAnswer
        this.options = options
    }
};

class Answer {
    constructor(answer, id) {
        this.answer = answer
        this.id = id
    }
}

let questionList = [
    new Question("Ո՞րն է Ռուսաստանի Դաշնության մայրաքաղաքը։", "Մոսկվա", "Մինսկ", "Մոսկվա", "Կիև", "Սանկտ-Պետերբուրգ"),
    new Question("Նշվածներից ո՞ր ֆիլմն է նկարահանվել Գյուրիում։", "Մեր մանկության տանգոն ", "Երջանկության մեխանիկա", "Մենք ենք մեր սարերը", "Մեր մանկության տանգոն ", "Ռեմբո "),
    new Question("Նշվածներից ո՞րի հեղինակը չէ՜ Հ.Թումանյանը։", "`Աբու Լալա Մահարի`", "`Գիքոր`", "`Թմբկաբերդի առումը`", "`Շունն ու կատուն`", "`Աբու Լալա Մահարի`"),
    new Question("Ե՞րբ է հռչակվել Հայաստանի առաջին հանրապետությունը։", "1918թ Մայիսի 28-ին", "1920թ Նոյեմբերի 7-ին", "1991թ սեպտեմբերի 21-ին", "1918թ Մայիսի 28-ին", "Մ.Թ.Ա 3րդ դար"),
    new Question("Նշված կենդանիներից ո՞րն ունի ամենաերկար լեզուն։", "Ընձուղտ", "Արջ", "Վագր", "Ընձուղտ", "Աքլոր"),
    new Question("Ի՞նչ անունով է ավեի շատ հայտնի «Պոլիգրաֆ» կոչվող սարքը։", "Ստի դետեկոր", "Ստի դետեկոր", "Քսերոքս", "Ռադար", "Գծագրական գործիք"),
    new Question("Նշվածներից ո՞րը ծրագրավորման լեզու չէ։", "CSS ", "PHP", "Java Script", "CSS ", "C#"),
    new Question("Ո՞ր հանքանյութի անունն է ծագել հունարեն 'գրում եմ' բառից։", "Գրաֆիտ", "Ասբեստ", "Ագաթ", "Գրաֆիտ", "նռնաքար"),
    new Question("Ո՞ր երկիրն է կոչվում «հազար լճերի երկիր»։", "Ֆինլանդիա", "Շվեդիա", "Ֆինլանդիա", "Նորվեգիա", "Իսլանդիա"),
    new Question("Այս գրողներից ո՞վ է մասնակցել առաջին համաշխարհային պատերազմին։", "Էռնեստ Հեմիգուեյ", "Լև Տոլստոյ", "Մարկ Տվեն", "Էռնեստ Հեմիգուեյ", "Չարլզ Դիքենս"),
    new Question("Իտալերենից թարգմանաբար «վերմիշել» նշանակում է...։", "Որդեր", "Ծղոտներ", "Թելեր", "Լարեր", "Որդեր"),


];
let sound = document.getElementById("audio")
let checkedAnswer = []
let requiredHelp = []
let count = 0
let game = true
let randerQuestion = null
let helpButtons = document.querySelectorAll(".fordesign")
helpButtons = [...helpButtons]
let buttonFiftyFifty = helpButtons[0]     ///can use without ID
buttonFiftyFifty.addEventListener("click", fiftyFifty);
buttonFiftyFifty.addEventListener("click", usedFiftyFifty)
buttonFiftyFifty.addEventListener("click", stopFiftyfifty)
let buttonCall = helpButtons[1]
buttonCall.addEventListener("click", useCall)
let buttonHallHelp = helpButtons[2]
buttonHallHelp.addEventListener("click", useHallHelp)
let music = null
let elem = null
let leaveGame = document.querySelector(".takeMoney")
leaveGame.addEventListener("click",take)
console.log(leaveGame);
let showNotification = null
let hideNotification = null
let scoreList = document.querySelectorAll(".currentScore")
scoreList = [...scoreList]
let scoreNum = scoreList.length - 1
defineStyles()

function defineStyles() {
    let optionCheck = document.getElementsByClassName("option")
    optionCheck = [...optionCheck]
    optionCheck.forEach(el => el.addEventListener("mouseover", () => el.classList.toggle("optionHover")))
    optionCheck.forEach(el => el.addEventListener("mouseout", () => el.classList.remove("optionHover")))
    optionCheck.forEach(el => el.addEventListener("click", checkOption))
    optionCheck.forEach(el => el.addEventListener("click", styleCheckedOption))
    function checkOption(ev) {
        checkedAnswer.push(new Answer(this.lastElementChild.textContent.toString(), ev.currentTarget.id))
    }
};








/////////////////////////////////////// Start the game //////////////////////////////////////////////////


play()


async function play() {
    if (game) {
        randerQuestion = nextLevel()
        randerQuestion.next()
        let compearingOption = await getAnswer("20")
        let notificationList = document.getElementById("noteList")
        notificationList.innerHTML = ""
        //console.log(compearingOption);
        if (checkedAnswer[0].answer == questionList[0].rightAnswer) {
            sound.src = "./Sounds/RightAnswer.mp3 "
            elem = document.getElementById(checkedAnswer[0].id)
            elem.classList.add("green")
            music = await stopMusic(1700)
            afterLevelNotificationList()
            showNotification = await winNotification()
            hideNotification = await hideNotifikations()
            questionList.shift()
            checkedAnswer.splice(0, 3)

            scoreList[scoreNum].classList.toggle("green")
            scoreNum--
            //console.log(questionList);
            let x = await play()

        } else {
            sound.src = "./Sounds/Wrong.mp3 "
            elem = document.getElementById(checkedAnswer[0].id)
            elem.style.backgroundColor = "FireBrick"
            let rightAnswer = document.querySelectorAll(".option")
            rightAnswer = [...rightAnswer].filter((el) => el.lastElementChild.textContent == questionList[0].rightAnswer)
            let rightElem = document.getElementById(rightAnswer[0].id)
            rightElem.style.backgroundColor = "green"
            afterLevelNotificationList()
            showNotification = await loseNotification()
            stopFiftyfifty()
            stopCall()
            stopHallHelp()
            game = false
        }
    }
};


async function getAnswer(ms) {
    return new Promise((resolve, reject) => {
        let answerTime = ms
        let timerColor = document.getElementById("timer")
        timerColor.style.borderColor = "rgb(78, 221, 73)"
        let timer = setInterval(() => {
            answerTime--
            let timeRender = document.getElementById("timer")
            if (answerTime < 0) {
                clearInterval(timer)
                sound.src = "./Sounds/WrongAnswer.mp3"
                let note = document.getElementById("noteList")
                note.innerHTML = ""
                afterLevelNotificationList()
                let rightAnswer = document.querySelectorAll(".option")
                rightAnswer = [...rightAnswer].filter((el) => el.lastElementChild.textContent == questionList[0].rightAnswer)
                let rightElem = document.getElementById(rightAnswer[0].id)
                rightElem.style.backgroundColor = "green"
                loseNotification()
                stopFiftyfifty()
                stopCall()
                game = false

            } else if (requiredHelp[0] !== undefined) {
                requiredHelp.shift()
                answerTime = "30"
            }
            else if (answerTime == 6) {
                timerColor.style.borderColor = "red"
                sound.src = "./Sounds/TimeOver.mp3"
            }
            else if (checkedAnswer[0] == undefined) {
                answerTime = answerTime.toString()
                timeRender.textContent = answerTime.padStart(2, "0")
            } else {
                clearInterval(timer)
                resolve(checkedAnswer[0].answer)
            }
        }, 1000)
    })
};








////////////////////////////////       50/50       ////////////////////////////////////////////////////////////


function fiftyFifty() {
    let optionTextBox = document.getElementsByClassName("optionCheck")
    optionTextBox = [...optionTextBox]
    let wrongOptions = optionTextBox.filter((el) => el.innerHTML !== questionList[0].rightAnswer)
    wrongOptions.splice(wrongOptions[Math.floor(Math.random() * 3)], 1)
    //optionTextBox.splice(rightOption,1)
    let randomOption = optionTextBox[Math.floor(Math.random() * 3)]
    //optionTextBox.splice(randomOption,1)
    wrongOptions.forEach((el) => el.parentElement.style.visibility = "hidden")

};

function usedFiftyFifty() {
    let helpDivs = document.querySelectorAll(".fordesign")
    helpDivs = [...helpDivs]
    let currentDiv = helpDivs[0]
    let currentHelp = currentDiv.firstElementChild
    return new Promise((resolve) => {
        setTimeout(() => {
            currentDiv.classList.remove("fordesign")
            currentHelp.classList.remove("fifty")
            currentDiv.classList.toggle("usedForDesign")
            currentHelp.classList.toggle("usedHelp")
            //console.log(currentDiv)
            resolve()
        }, 1000);

    })

};
function soundFifty() {
    sound.src = "./Sounds/Fiftyfifty.mp3"
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 2000);
    })
}
async function stopFiftyfifty() {
    let sound = await soundFifty()
    buttonFiftyFifty.removeEventListener("click", fiftyFifty)
    buttonFiftyFifty.removeEventListener("click", usedFiftyFifty)
    buttonFiftyFifty.removeEventListener("click", stopFiftyfifty)
};



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////       Callig /////////////////////////////////////////////////////////////////////////////


function callSound() {
    sound.src = "./Sounds/Fiftyfifty.mp3"
    return new Promise((resolve) => {
        setTimeout(() => {
            sound.src = "#"
            resolve()
        }, 2000)
    })
};

function makePhoneCallSound() {
    return new Promise((resolve) => {
        sound.src = "./Sounds/Call.mp3"
        setTimeout(() => {
            resolve()
        }, 2000);
    })
}

async function useCall() {
    let helpDivs = document.querySelectorAll(".fordesign")
    helpDivs = [...helpDivs]
    let currentDiv = null
    console.log(helpDivs.length);
    if (helpDivs.length < 3) {
        currentDiv = helpDivs[0]
    } else {
        currentDiv = helpDivs[1]
    }
    let currentHelp = currentDiv.firstElementChild
    //console.log(currentHelp);
    let notifice = document.getElementById("noteList")
    notifice.innerHTML = ""
    let sound = await callSound()
    let phoneCallSound = await makePhoneCallSound()
    currentHelp.style.backgroundImage = "url(./Images/CallRed.png)"
    currentDiv.classList.remove("fordesign")
    currentDiv.classList.toggle("usedForDesign")
    notifice.style.visibility = "visible"
    requiredHelp.push("Help me")
    let builtNotification = await callImatateNotification()
    // let timer = await getAnswer("30")
    stopCall()
    //console.log(notifice);

};

function stopCall() {
    buttonCall.removeEventListener("click", useCall)
};



/////////////////////////////////////////////////   Hall Help ////////////////////////////////////////////////////////////

function hallSound() {
    return new Promise((resolve) => {
        sound.src = "./Sounds/HallHelp.mp3"
        setTimeout(() => {
            resolve()
        }, 1500);
    })
};


async function useHallHelp() {
    let helpDivs = document.querySelectorAll(".fordesign")
    helpDivs = [...helpDivs]
    let currentDiv = null
    if(helpDivs.length<3){
        currentDiv = helpDivs[1]
    }else{
        currentDiv = helpDivs[helpDivs.length - 1]
    }
    let currentHelp = currentDiv.firstElementChild
    let notifice = document.getElementById("noteList")
    notifice.innerHTML = ""
    let sound = await callSound()
    let hallHelpound = await hallSound()
    requiredHelp.push("Help me")
    currentHelp.style.backgroundImage = "url(./Images/HallRed.png)"
    currentDiv.classList.remove("fordesign")
    currentDiv.classList.toggle("usedForDesign")
    notifice.style.visibility = "visible"
    let buildHallNotification = await hallHelpImitation()
};


async function hallHelpImitation() {
    let notifice = document.getElementById("noteList")
    notifice.style.width = "400px"
    notifice.style.height = "300px"
    let mainDiv = document.createElement("div")
    notifice.append(mainDiv)
    let renderMainDiv = await setHallhelpMainDiv()
    let footter = document.createElement("div")
    notifice.append(footter)
    let renderFooter = await setHallhelpFooter()
    let mainDivHeader = document.createElement("div")
    notifice.firstElementChild.append(mainDivHeader)
    stopHallHelp()
    let renderMainDivHeader = await setMainDivHeader()

    return new Promise((resolve) => {
        resolve()
    })
    async function setMainDivHeader() {
        let footer = document.createElement("div")
        let header = document.createElement("div")
        let div = document.createElement("div")
        let div1 = document.createElement("div")
        let div2 = document.createElement("div")
        let div3 = document.createElement("div")
        let div4 = document.createElement("div")
        let div5 = document.createElement("div")
        let div6 = document.createElement("div")
        let div7 = document.createElement("div")
        let mainDiv = notifice.firstElementChild.lastElementChild
        mainDiv.append(header)
        mainDiv.append(footer)
        mainDiv.lastElementChild.classList.add("hallHelpMainHeader")
        mainDiv.lastElementChild.style.height = "120px"
        mainDiv.firstElementChild.classList.add("hallHelpMainHeader")
        mainDiv.firstElementChild.append(div)
        mainDiv.firstElementChild.append(div1)
        mainDiv.firstElementChild.append(div2)
        mainDiv.firstElementChild.append(div3)
        mainDiv.lastElementChild.append(div4)
        mainDiv.lastElementChild.append(div5)
        mainDiv.lastElementChild.append(div6)
        mainDiv.lastElementChild.append(div7)
        let getRightAnswerForHeader = await setRightAnswer()
        //console.log(rightId,rightBox)
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(mainDiv)
                resolve()
            }, 500);
        })
        function setRightAnswer() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let optionsList = document.querySelectorAll(".optionCheck")
                    optionsList = [...optionsList]
                    let rightAnswer = optionsList.filter((el) => el.innerHTML == questionList[0].rightAnswer)
                    let array = mainDiv.firstElementChild.getElementsByTagName("div")
                    array = [...array]
                    let rightId = rightAnswer[0].parentElement.id
                    let rightBox = null
                    let rightTower = null
                    switch (rightId) {
                        case "a":
                            rightBox = 0;
                            rightTower = div4;
                            break;
                        case "b":
                            rightBox = 1;
                            rightTower = div5;
                            break;
                        case "c":
                            rightBox = 2;
                            rightTower = div6;
                            break;
                        case "d":
                            rightBox = 3;
                            rightTower = div7
                            break;
                        default:
                            break;
                    }
                    let arrayTower = mainDiv.lastElementChild.getElementsByTagName("div")
                    arrayTower = [...arrayTower]
                    rightTower.style.height = "83px"
                    arrayTower.forEach((el) => el.style.backgroundColor = "rgb(76, 76, 179)")
                    array[rightBox].textContent = "83%"
                    array.splice(rightBox, 1)
                    array.forEach((el) => el.textContent = 10 + Math.floor(Math.random() * 9) + "%")
                    resolve()
                }, 200);
            })
        }
    };

    function stopHallHelp(){
        buttonHallHelp.removeEventListener("click", useHallHelp)
    };

    function setHallhelpFooter() {
        return new Promise((resolve) => {
            setTimeout(() => {
                let currentDiv = notifice.lastElementChild
                currentDiv.classList.add("hallHelpFootter")
                currentDiv.textContent = ` աբգդ `
                resolve()
            }, 500);
        })
    }
    function setHallhelpMainDiv() {
        return new Promise((resolve) => {
            setTimeout(() => {
                let currentDiv = notifice.lastElementChild
                currentDiv.classList.toggle("hallHelpMainDiv")
                resolve()
            }, 500);
        })
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function stopMusic(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            sound.src = "#"
            resolve()
        }, ms);
    })
}

function* nextLevel() {
    while (questionList[0] !== undefined) {
        yield askQuestion()
    }
};


function askQuestion() {
    let divForOptions = document.querySelectorAll(".option")
    divForOptions = [...divForOptions]
    divForOptions.forEach((el) => el.style.visibility = "visible")
    divForOptions.forEach((el) => el.classList.remove("green"))
    divForOptions.forEach((el) => el.classList.remove("checkedOption"))
    //console.log(divForOptions);
    let currentQuestion = questionList[0]
    let currentAskingQuestion = questionList[0].question
    let questionPlace = document.getElementsByClassName("askingQuestion")
    questionPlace[0].textContent = currentAskingQuestion
    count++
    let questionNum = document.getElementsByClassName("questioNumber")
    questionNum[0].textContent = " Հարց " + count
    let optionPlase = document.getElementsByClassName("optionCheck")
    optionPlase = [...optionPlase]
    let optionList = [...currentQuestion.options]
    // console.log(optionList);
    optionPlase.forEach(el => {
        let num = Math.floor(Math.random() * optionList.length)
        el.textContent = optionList[num]
        //console.log(el.textContent);
        optionList.splice(num, 1)
    })

};

 ///////////////////////////////////////////// Notifications /////////////////////////////////////////////////////////

function winNotification() {
    let notifice = document.getElementById("noteList")
    let header = document.getElementById("header")
    let body = document.getElementById("body")
    return new Promise((resolve) => {
        setTimeout(() => {
            header.textContent = "Win"
            body.textContent = scoreList[scoreNum].textContent
            notifice.style.border = "6px solid green"
            notifice.style.visibility = "visible"
            resolve()
        });
    })
};

function loseNotification() {
    let notifice = document.getElementById("noteList")
    let header = document.getElementById("header")
    let body = document.getElementById("body")
    let currentScore = +scoreList[scoreNum].textContent
    console.log(currentScore > 32000);
    if (currentScore < 32000) {
        currentScore = 0
    } else if (currentScore >= 250000) {
        currentScore = 250000
    } else if (currentScore >= 32000 || currentScore < 250000) {
        currentScore = 32000
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            header.textContent = "Win"
            body.textContent = currentScore
            notifice.style.border = "6px solid red"
            notifice.style.visibility = "visible"
            resolve()
        });
    })
};


function afterLevelNotificationList() {
    let notifice = document.getElementById("noteList")
    notifice.style.width = "200px"
    notifice.style.height = "100px"
    let div = document.createElement("div")                    //// ????????????????????????????????????????????????????
    let div1 = document.createElement("div")                  //// Չի ստացվում ավելացնել 2 էլեմենտ 1 փոփոխականի օգնւթյամբ
    notifice.prepend(div1)
    notifice.append(div)
    notifice.firstElementChild.id = "header"
    notifice.lastElementChild.id = "body"
    console.log(notifice);
};


async function callImatateNotification() {
    let notifice = document.getElementById("noteList")
    notifice.style.width = "700px"
    notifice.style.height = "250px"
    let div = document.createElement("div")
    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let div3 = document.createElement("div")
    let div4 = document.createElement("div")
    let div5 = document.createElement("div")
    notifice.append(div)
    notifice.append(div1)
    notifice.append(div2)
    notifice.append(div3)
    notifice.append(div4)
    notifice.append(div5)
    let allDivs = notifice.getElementsByTagName("div")
    allDivs = [...allDivs]
    let firstString = await setFirstLine()
    let secondString = await setSecondLine()
    let thidString = await setThirdLine()
    let forthString = await setForthLine()
    let fifthString = await setFifthLine()
    let sisthString = await setSixthLine()
    return new Promise((resolve) => {
        resolve()
    })

    function setSixthLine() {
        return new Promise((resolve) => {
            setTimeout(() => {
                allDivs[5].classList.add("playerSpeech")
                allDivs[5].textContent = `Շնորհակալ եմ շատ`
                resolve()
            }, 1000);
        })
    }

    function setFifthLine() {
        return new Promise((resolve) => {
            setTimeout(() => {
                allDivs[4].classList.add("friendSpeech")
                allDivs[4].textContent = `Հմմմմ....Կարծում եմ ճիշտ պատասխանն է ` + questionList[0].rightAnswer
                resolve()
            }, 1000);
        })
    }
    function setForthLine() {
        return new Promise((resolve) => {
            setTimeout(() => {
                let types = questionList[0].options.join(",")
                allDivs[3].classList.add("playerSpeech")
                allDivs[3].textContent = questionList[0].question + "\n" + types
                resolve()
            }, 1000);
        })
    }
    function setThirdLine() {
        return new Promise((resolve) => {
            setTimeout(() => {
                allDivs[2].classList.add("friendSpeech")
                allDivs[2].textContent = `Ողջույն։Կփորձեմ։ ի՞նչ է հարցը։`
                resolve()
            }, 1000);
        })
    }
    function setSecondLine() {
        return new Promise((resolve) => {
            setTimeout(() => {
                allDivs[1].classList.add("playerSpeech")
                allDivs[1].textContent = `Բարև ընկերս։ Կարող ե՞ս օգնել ինձ պատասխանել մեկ հարցի։`
                resolve()
            }, 1000);
        })
    }
    function setFirstLine() {
        return new Promise((resolve) => {
            setTimeout(() => {
                allDivs[0].classList.add("callNoteCalling")
                allDivs[0].textContent = "Calling ..."
                resolve()
            }, 1000)
        })
    }

    // console.log(allDivs);

}

function hideNotifikations() {
    let notifice = document.getElementById("noteList")
    return new Promise((resolve) => {
        setTimeout(() => {
            notifice.style.border = "none"
            notifice.style.visibility = "hidden"
            resolve()
        }, 2000)
    })
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



                           /////////////////////// Take money/////////////////////////////


async function take(){
    sound.src = "./Sounds/RightAnswer.mp3 "
    game = false
    afterLevelNotificationList()
    let showNotification = await loseNotification()
}


function styleCheckedOption() {
    this.classList.toggle("checkedOption")
    //console.log(this);
}

