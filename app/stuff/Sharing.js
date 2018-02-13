import { Constants } from 'expo';

import Quiz from '../quiz/Quiz';

const expoProjectUri = 'https://expo.io/@ide/love-languages';

const hearts = {
  [Quiz.Languages.WORDS_OF_AFFIRMATION]: '💚',
  [Quiz.Languages.QUALITY_TIME]: '💛',
  [Quiz.Languages.RECEIVING_GIFTS]: '❤️',
  [Quiz.Languages.ACTS_OF_SERVICE]: '💙',
  [Quiz.Languages.PHYSICAL_TOUCH]: '🧡',
};

function getShareMessage(primaryLanguages) {
  let sentences = [];

  if (primaryLanguages.length === 1) {
    sentences.push(`I found that ${primaryLanguages[0]} is my love language.`);
  } else if (primaryLanguages.length === 2) {
    sentences.push(
      `I found that ${primaryLanguages[0]} and ${primaryLanguages[1]} are my love languages.`
    );
  } else {
    let languages = primaryLanguages.slice(0, -1);
    languages.push(`and ${primaryLanguages[primaryLanguages.length - 1]}`);
    sentences.push(`I found that ${languages.join(', ')} are my love languages.`);
  }

  let linkPhrase;
  if (Constants.appOwnership === 'expo') {
    linkPhrase = expoProjectUri;
  } else {
    // TODO: use the Google Play and App Store URLs
    linkPhrase = expoProjectUri;
  }
  sentences.push(`Take the quiz with this app to find out your love language too: ${linkPhrase}`);

  // Add a decorative heart at the end
  if (primaryLanguages.length > 0) {
    sentences.push(hearts[primaryLanguages[0]]);
  }

  return sentences.join(' ');
}

export default {
  expoProjectUri,
  getShareMessage,
};
