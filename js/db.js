//Real-time listener
db.collection("subscriptions").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type == "added") {
      //Add podast to subsction page
      createSubPodcast(change.doc.data(), change.doc.id);
    }

    if (change.type == "remove") {
      //Remove podcast subsction page
    }
  });
});
