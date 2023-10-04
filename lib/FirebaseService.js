import firebaseConfig from "@/config/firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

class FirebaseService {
	constructor(firebaseApp) {
		// this.auth = getAuth(firebaseApp);
		// this.db = getFirestore(firebaseApp);
		this.storage = getStorage(firebaseApp);
	}

	 uploadFile(fileBlob, fileUrl) {
		const storageRef = ref(this.storage, "profile-imgs/" + fileUrl);
		return uploadBytes(storageRef, fileBlob).then(() => {
			return getDownloadURL(storageRef);
		});
	 }
}

// Remove this line since FirebaseService has already been imported in the previous code block
// import FirebaseService from './FirebaseService';

const firebaseServiceInstance = new FirebaseService(firebaseConfig.app);

export default firebaseServiceInstance;
