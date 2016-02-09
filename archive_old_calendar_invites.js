function archiveOldCalendarInvites() {

  var cutoffDate = new Date();

  var threads = GmailApp.search("from:calendar-notification@google.com in:inbox");
  var oldThreads = [];

  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var subject = thread.getMessages()[0].getSubject();
    var matches = /.* @ (.+)( \S+ - \S+)* \(/.exec(subject);

    if (matches == null || matches.length < 2) {
      continue;
    }

    var subjectDateString = matches[1];
    var subjectDate = new Date(subjectDateString);

    if (subjectDate < cutoffDate) {
      oldThreads.push(thread);
    }
  }

  GmailApp.moveThreadsToArchive(oldThreads);

}
