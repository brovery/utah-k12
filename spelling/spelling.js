var w = 0,
    curWord,
    utter,
    voices,
    score = 0;

window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
};

function myWords() {
    var mylist = $('#hi').val();
    if (mylist.length < 1) {
        $('#warning').fadeIn();
    } else {
        spellingList = new WordList(mylist, ", ");
        $('.enterWords').remove();
        $('#enterWords').append('<button class="btn btn-info" onclick="playWord()">Play</button><br><br>Please spell the word in the input below')
            .append('<input class="form-control" type="text" id="typed" placeholder="enter word here"/><br>')
            .append('<button id="scoreBtn" class="btn btn-info" onclick="checkWord()">Submit</button>');
        curWord = new Word(spellingList.words[w]);
        utter = new Speech(spellingList.words[w]);
    }
}

function playWord() {
    utter.say();
}

function checkWord() {
    var thisTry = $('#typed').val().toUpperCase();
    console.log(w);
    w++;

    if (curWord.spelledRight(thisTry)) {
        score++;
        var correct = new Speech("Good Job!");
        correct.say();
    } else {
        var wrong = new Speech("You are an idiot.");
        wrong.say();
    }

    if(w < spellingList.words.length) {
        curWord = new Word(spellingList.words[w]);
        utter = new Speech(spellingList.words[w]);
        $('#typed').val("");
    }

    // change button to grade when you reach the end of the words list.
    if(w == spellingList.words.length) {
        $('#scoreBtn').text("Grade").attr("onclick","grade()").removeClass("btn-info").addClass("btn-warning");
    }
}

function grade() {
    var grade = score/spellingList.words.length*100;
    alert("Your grade is: " + grade + "%");
}

function WordList(source, delimeter) {
    this.delimeter = delimeter || " ";
    this.words = source.split(this.delimeter);
    this.size = function () {
        return this.words.length;
    };
    this.get = function (i) {
        return new Word(this.words[i]);
    };
    this.sort = function () {
        this.words.sort()
    }

}

function Word(src) {
    this.src = src.toUpperCase();

    this.spelledRight = function (word) {
        return word == this.src;
    }
}

function Speech(message) {
    var msg = new SpeechSynthesisUtterance(message);
    msg.lang = 'en';
    msg.voice = voices[3];


    this.say = function() {
        window.speechSynthesis.speak(msg);
    }
}