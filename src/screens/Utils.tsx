import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {Alert} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {storage} from '../services/firebaseConfig';
import {assets} from '../../react-native.config';

export const bascket =
  'https://firebasestorage.googleapis.com/v0/b/agon-c176b.appspot.com/o/campeonato%2Fbasketball.png?alt=media&token=eaa42139-c587-4265-835d-fd6b430eccd2';

export const upload =
  'https://firebasestorage.googleapis.com/v0/b/agon-c176b.appspot.com/o/campeonato%2Fupload-file.png?alt=media&token=93646a02-44a0-4911-acbd-c883e48a7a34';

export const faq =
  'https://firebasestorage.googleapis.com/v0/b/agon-c176b.appspot.com/o/campeonato%2FFAQ.png?alt=media&token=05158a8e-6ffb-4623-a63f-658dd32401b1';

export async function handleImage() {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
  };

  const result = await launchImageLibrary(options);
  if (result.errorMessage) {
    Alert.alert('Error:', result.errorMessage);
  } else {
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const data: any = {
        uri: result.assets[0].uri,
        fileName: result.assets[0].fileName,
      };
      return data;
    }
  }
}

export async function uploadImage(uri: any, type: any) {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(storage, `campeonato/` + new Date().getTime());
  const uploadTask = uploadBytesResumable(storageRef, blob);
  uploadTask.on('state_changed');

  const url = getDownloadURL(uploadTask.snapshot.ref).then(
    async downloadURL => {
      return downloadURL;
    },
  );
  console.log(url);
  return url;
}

export async function findByNameImage(name: any) {
  let url: string = '';
  getDownloadURL(ref(storage, name)).then(async downloadURL => {
    url = downloadURL;
    console.log(url);
  });
  return url;
}
