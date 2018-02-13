import { Audio } from 'expo';
import { Platform } from 'react-native';

const _enabled = Platform.OS === 'ios';

const _buttonPressSound = new Audio.Sound();
_buttonPressSound.setOnPlaybackStatusUpdate(playbackStatus =>
  _handlePlaybackStatusUpdate(_buttonPressSound, playbackStatus)
);

const _completionSound = new Audio.Sound();
_completionSound.setOnPlaybackStatusUpdate(playbackStatus =>
  _handlePlaybackStatusUpdate(_completionSound, playbackStatus)
);

export default {
  buttonPress: _buttonPressSound,
  completion: _completionSound,

  async loadAsync() {
    if (!_enabled) {
      return;
    }

    await Promise.all([
      _buttonPressSound.loadAsync(require('./sounds/button.m4a')),
      _completionSound.loadAsync(require('./sounds/completion.m4a')),
    ]);
  },

  async playEffectAsync(sound) {
    if (!_enabled) {
      return;
    }
    await sound.replayAsync();
  },
};

function _handlePlaybackStatusUpdate(sound, playbackStatus) {
  if (playbackStatus.didJustFinish) {
    sound.stopAsync();
  }
}
