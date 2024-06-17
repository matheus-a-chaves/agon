import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { Alert } from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { storage } from '../services/firebaseConfig';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { decode } from 'base-64';
import RNFetchBlob from 'rn-fetch-blob';

if (typeof atob === 'undefined') {
  global.atob = decode;
}

export const upload =
  'https://firebasestorage.googleapis.com/v0/b/agon-c176b.appspot.com/o/campeonato%2Fupload-file.png?alt=media&token=93646a02-44a0-4911-acbd-c883e48a7a34';

export const faq =
  'https://firebasestorage.googleapis.com/v0/b/agon-c176b.appspot.com/o/campeonato%2FFAQ.png?alt=media&token=05158a8e-6ffb-4623-a63f-658dd32401b1';

export const equipe =
  'https://firebasestorage.googleapis.com/v0/b/agon-c176b.appspot.com/o/campeonato%2Fequipe-cadastro.png?alt=media&token=8753c555-3e96-4f75-9e14-e4fbaff276da';

export async function handleImage() {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
  };

  const result = await launchImageLibrary(options);
  if (result.errorMessage) {
    Alert.alert('Error:', result.errorMessage);
  } else {
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const uri: string = result.assets[0]?.uri || '0';
      const base64Document = await RNFS.readFile(uri, 'base64');

      const data: any = {
        uri: base64Document,
        fileName: result.assets[0].fileName,
      };

      return data;
    }
  }
}

export async function handleDocument() {
  try {
    const document = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });

    const url = await RNFetchBlob.fs
      .readFile(document[0].uri, 'base64')
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log('Erro ao converter a url para base64 ' + err);
      });

    const data: any = {
      uri: url,
      fileName: document[0].name,
    };

    return data;
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      console.log('Usuário cancelou a escolha do documento');
    } else {
      console.log('Erro ao escolher o documento' + error);
    }
  }
}

export async function parseInteiro(input: any | undefined) {
  if (input === undefined) {
    return 'error';
  }
  return parseInt(input);
}

export async function uploadImage(uri: any, path: any) {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = ref(storage, path + new Date().getTime());
  const uploadTask = uploadBytesResumable(storageRef, blob);
  uploadTask.on('state_changed');

  const url = getDownloadURL(uploadTask.snapshot.ref).then(
    async downloadURL => {
      return downloadURL;
    },
  );
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

export function formatDate(date: any): string {
  return date.toISOString().split('T')[0];
}

export const applyMask = (value: string): string => {
  value = value.replace(/\D/g, '');
  if (value.length <= 11) {
    return value.replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    return value.replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
};

export const imageConverter = (image: string | undefined | null, padrao: any) => {
  try {
    console.log("Imagem: ", image)
    if (image !== null && image !== undefined) {
      console.log("Imagem: ")
      return { uri: `data:image/*;base64,${image}` }
    }
    return padrao;
  } catch (error) {
    console.error("Erro ao converter a imagem: ", error);
    return null;
  }
}


export function dateFormat(inputDate: any) {
  const [year, month, day] = inputDate.split('-');
  return `${day}/${month}/${year}`;
}