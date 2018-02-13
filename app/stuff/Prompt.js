import { Alert } from 'react-native';

function alertAsync(title, text, { acceptText }) {
  return new Promise(resolve => {
    Alert.alert(title, text, [{ text: acceptText, onPress: () => resolve(true) }], {
      onDismiss: () => resolve(false),
    });
  });
}

function promptAsync(title, text, { acceptText, cancelText }) {
  return new Promise(resolve => {
    Alert.alert(
      title,
      text,
      [
        { text: cancelText, onPress: () => resolve(false), style: 'cancel' },
        { text: acceptText, onPress: () => resolve(true) },
      ],
      { onDismiss: () => resolve(false) }
    );
  });
}

export default {
  alertAsync,
  promptAsync,
};
