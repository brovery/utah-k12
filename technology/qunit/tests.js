function stringStartsWith (string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

function TypingModel(doc) {
    this.sourceDoc = doc;
    this.theirDoc = "";

    //What they typed so far is exactly equal to the source.
    this.isAccurate = function() {
        return stringStartsWith (this.sourceDoc, this.theirDoc);
    }
    this.setTheirDoc = function(theirDoc) {
        this.theirDoc = theirDoc;
    }
    //returns percentage of completion (0-100%)
    this.progress = function() {
        return (this.theirDoc.length / this.sourceDoc.length)*100;
    }
}
var sourceDoc = "Now is the time for all good men to come to the aid of the party";
QUnit.test( "Source test", function( assert ) {
    var model = new TypingModel(sourceDoc);
    //var theInput = $("#theInput").val();

    assert.ok( model.isAccurate(), "Passed!" );
    assert.equal(model.sourceDoc, sourceDoc);

});

QUnit.test( "Progress test", function( assert ) {
    var model = new TypingModel(sourceDoc);
    assert.equal(model.progress(), 0.0);

    model.setTheirDoc("N");
    assert.ok(model.progress() > 0, "User has typed in one letter");

    model.setTheirDoc(sourceDoc);
    assert.ok(model.progress() == 100, "Complete!")
});

QUnit.test( "Accuracy test", function( assert ) {
    var model = new TypingModel(sourceDoc);
    model.setTheirDoc("Na");
    assert.equal(model.theirDoc, "Na");

    assert.equal(model.isAccurate(), false);

});
