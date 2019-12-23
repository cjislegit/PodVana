//Real-time listener
db.collection('subscriptions').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type == 'added') {
      //Add podast to subsction page
      createSubPodcast(change.doc.data(), change.doc.id);
    }

    if (change.type == 'remove') {
      //Remove podcast subsction page
    }
  });
});

//Add new subscription
const addNewSub = podcastId => {
  const newSub = {
    podcastId: podcastId
  };

  db.collection('subscriptions')
    .where('podcastId', '==', podcastId)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        db.collection('subscriptions').add(newSub);
        return;
      }
      db.collection('subscriptions')
        .doc(snapshot.docs[0]['id'])
        .delete();
    });
};
