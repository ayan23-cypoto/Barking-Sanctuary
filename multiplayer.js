
export class Multiplayer {
  constructor(game) {
    this.game = game;
    this.addPlayer = false;
    this.BackendWork();
    this.plrX
    this.plrY
  }

  BackendWork() {
    const firebaseConfig = {
      databaseURL: 'https://barking-sanctuary-default-rtdb.asia-southeast1.firebasedatabase.app/'
    };
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    document.getElementById('mutiplayerBtn').onclick = () => {
      this.addPlayer = true;

      const Usrname = document.getElementById('Name');
      const password = document.getElementById('Password');
      const listRef = database.ref('messages/');
      const newRef = listRef.push();

      if (this.addPlayer == true) {
        newRef.set({
          usrName: Usrname.value,
          UsrPassword: password.value,
          plrDistance: this.plrX
        });
        this.addPlayer = false;
      }
    };

    // fetch data
    var fetchedData = database.ref('messages/');
    fetchedData.on('value', snapshot => {
      var data = snapshot.val();
      for (var key in data) {
        var value = data[key];
        console.log(value.name);
        // you c an also use object keys
        console.log(key);
      }
    });
  }
}