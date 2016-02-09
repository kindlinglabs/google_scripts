function archiveOldCalendarInvites() {

  var cutoffDate = new Date();

  var threads = GmailApp.search("from:calendar-notification@google.com in:inbox");
  var oldThreads = [];

  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var subject = thread.getMessages()[0].getSubject();

    // The \s.? is a bit of a mystery to me; appears that some subjects have extra whitespace.
    var matches = /\D{3} \D{3} \d+,\s.?\d{4}/.exec(subject);

    if (matches == null || matches.length < 1) {
      continue;
    }

    var subjectDateString = matches[0];
    var subjectDate = new Date(subjectDateString);

    if (dateIsValid(subjectDate) && subjectDate < cutoffDate) {
      oldThreads.push(thread);
    }
  }

  GmailApp.moveThreadsToArchive(oldThreads);

}

function dateIsValid(d) {
  // http://stackoverflow.com/a/1353711

  if ( Object.prototype.toString.call(d) === "[object Date]" ) {
    // it is a date
    if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
      return false;
    }
    else {
      return true;
    }
  }
  else {
    return false;
  }
}
