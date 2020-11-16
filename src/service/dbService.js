import firebase from '../dataBase/firebase';

const user = firebase.firestore().collection('users');


const api = {

    fetchUserData : async () => {
        return await user.get().then((snapshot)=> {
            snapshot.docs.forEach(doc => {
              console.log(doc.data());
              
            })
          }).catch(err => console.error(err));
    }
}


export default api; 