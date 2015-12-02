var w = 0,
    curWord,
    score = 0;

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
    }
}

function playWord() {
    curWord.say();
}

function checkWord() {
    var thisTry = $('#typed').val().toUpperCase();
    console.log(w);
    w++;

    if (curWord.spelledRight(thisTry)) {
        score++;
        var correct = new Word("Good Job!");
        correct.say();
    } else {
        var wrong = new Word("You are an idiot.");
        wrong.say();
    }

    if(w < spellingList.words.length) {
        curWord = new Word(spellingList.words[w]);
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

function Word(src, language) {
    this.src = src.toUpperCase();
    window.speechSynthesis.onvoiceschanged = function() {
        var voices = window.speechSynthesis.getVoices();
        this.voice = voices[1];
    };
    //this.voice = window.speechSynthesis.getVoices()[1];
    this.language = language || "en";
    this.translation = (this.language == 'en') ? new Word('word', 'fr') : null;
    this.say = function () {
        var msg = new SpeechSynthesisUtterance(this.src);
        msg.voice = this.voice;
        window.speechSynthesis.speak(msg);
    };
    this.spelledRight = function (word) {
        return word == this.src;
    }

}
