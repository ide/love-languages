/**
 * These questions are from PDFs from www.5lovelanguages.com. The PDFs give permission in writing to
 * use the quiz questions (but not the PDFs themselves). They say:
 *
 * This profile is an excerpt from The 5 Love Languages® (2015, Northfield Publishing). Reproduction
 * and distribution for use, personal and/or professional (workshops, organizations, churches,
 * nonprofits, small groups, etc.) is permitted provided the profiles are distributed free of
 * charge.
 */

const Languages = {
  WORDS_OF_AFFIRMATION: 'Words of Affirmation',
  QUALITY_TIME: 'Quality Time',
  RECEIVING_GIFTS: 'Receiving Gifts',
  ACTS_OF_SERVICE: 'Acts of Service',
  PHYSICAL_TOUCH: 'Physical Touch',
};

const singleQuestions = [
  [
    {
      text: `someone I love sends me a loving note/text/email for no special reason.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
    {
      text: `I hug someone I love.`,
      language: Languages.PHYSICAL_TOUCH,
    },
  ],
];
let x = [
  [
    {
      text: `I can spend alone time with someone I love — just us.`,
      language: Languages.QUALITY_TIME,
    },
    {
      text: `someone I love does something practical to help me out.`,
      language: Languages.ACTS_OF_SERVICE,
    },
  ],
  [
    {
      text: `someone I love gives me a little gift as a token of our love of concern for each other.`,
      language: Languages.RECEIVING_GIFTS,
    },
    {
      text: `I get to spend uninterrupted leisure time with those I love.`,
      language: Languages.QUALITY_TIME,
    },
  ],
  [
    {
      text: `someone I love does something unexpected for me to help me with a project.`,
      language: Languages.ACTS_OF_SERVICE,
    },
    {
      text: `I can share an innocent touch with someone I love.`,
      language: Languages.PHYSICAL_TOUCH,
    },
  ],
  [
    {
      text: `someone I love puts their arm around me in public.`,
      language: Languages.PHYSICAL_TOUCH,
    },
    {
      text: `someone I love surprises me with a gift.`,
      language: Languages.RECEIVING_GIFTS,
    },
  ],
  [
    {
      text: `I'm around someone I love, even if we're not really doing anything.`,
      language: Languages.QUALITY_TIME,
    },
    {
      text: `I can be comfortable holding hands, high-fiving, or putting my arm around someone I love.`,
      language: Languages.PHYSICAL_TOUCH,
    },
  ],
  [
    {
      text: `I receive a gift from someone I love.`,
      language: Languages.RECEIVING_GIFTS,
    },
    {
      text: `I hear from someone I love that they love me.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
  ],
  [
    {
      text: `I sit close to someone I love.`,
      language: Languages.PHYSICAL_TOUCH,
    },
    {
      text: `I am complimented by someone I love for no apparent reason.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
  ],
  [
    {
      text: `I get the chance to just "hang out" with someone I love.`,
      language: Languages.QUALITY_TIME,
    },
    {
      text: `I unexpectedly get small gifts from someone I love.`,
      language: Languages.RECEIVING_GIFTS,
    },
  ],
  [
    {
      text: `I hear someone I love tell me, "I'm proud of you."`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
    {
      text: `someone I love helps me with a task.`,
      language: Languages.ACTS_OF_SERVICE,
    },
  ],
  [
    {
      text: `I get to do things with someone I love.`,
      language: Languages.QUALITY_TIME,
    },
    {
      text: `I hear supportive words from someone I love.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
  ],
  [
    {
      text: `someone I love does things for me instead of just talking about doing nice things.`,
      language: Languages.ACTS_OF_SERVICE,
    },
    {
      text: `I feel connected to someone I love through a hug.`,
      language: Languages.PHYSICAL_TOUCH,
    },
  ],
  [
    {
      text: `I hear praise from someone I love.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
    {
      text: `someone I love gives me something that shows they were really thinking about me.`,
      language: Languages.RECEIVING_GIFTS,
    },
  ],
  [
    {
      text: `I'm able to just be around someone I love.`,
      language: Languages.QUALITY_TIME,
    },
    {
      text: `I get a back rub from someone I love.`,
      language: Languages.PHYSICAL_TOUCH,
    },
  ],
  [
    {
      text: `someone I love reacts positively to something I've accomplished.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
    {
      text: `someone I love does something for me that I know they don't particularly enjoy.`,
      language: Languages.ACTS_OF_SERVICE,
    },
  ],
  [
    {
      text: `I'm able to be in close physical proximity to someone I love.`,
      language: Languages.PHYSICAL_TOUCH,
    },
    {
      text: `I sense someone I love showing interest in the things I care about.`,
      language: Languages.QUALITY_TIME,
    },
  ],
  [
    {
      text: `someone I love works on special projects with me that I have to complete.`,
      language: Languages.ACTS_OF_SERVICE,
    },
    {
      text: `someone I love gives me an exciting gift.`,
      language: Languages.RECEIVING_GIFTS,
    },
  ],
  [
    {
      text: `I'm complimented by someone I love on my appearance.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
    {
      text: `someone I love takes the time to listen to me and really understand my feelings.`,
      language: Languages.QUALITY_TIME,
    },
  ],
  [
    {
      text: `I can share a meaningful touch in public with someone I love.`,
      language: Languages.PHYSICAL_TOUCH,
    },
    {
      text: `someone I love offers to run errands for me.`,
      language: Languages.ACTS_OF_SERVICE,
    },
  ],
  [
    {
      text: `someone I love does something special for me to help me out.`,
      language: Languages.ACTS_OF_SERVICE,
    },
    {
      text: `I get a gift that someone I love put thought into choosing.`,
      language: Languages.RECEIVING_GIFTS,
    },
  ],
  [
    {
      text: `someone I love doesn't check their phone while we're talking with each other.`,
      language: Languages.QUALITY_TIME,
    },
    {
      text: `someone I love goes out of their way to do something that relieves pressure on me.`,
      language: Languages.ACTS_OF_SERVICE,
    },
  ],
  [
    {
      text: `I can look forward to a holiday because I'll probably get a gift from someone I love.`,
      language: Languages.RECEIVING_GIFTS,
    },
    {
      text: `I hear the words, "I appreciate you" from someone I love.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
  ],
  [
    {
      text: `someone I love and haven't seen in a while thinks enough of me to give me a little gift.`,
      language: Languages.RECEIVING_GIFTS,
    },
    {
      text: `someone I love takes care of something I'm responsible to do that I feel too stressed to do at the time.`,
      language: Languages.ACTS_OF_SERVICE,
    },
  ],
  [
    {
      text: `someone I love doesn't interrupt me while I'm talking.`,
      language: Languages.QUALITY_TIME,
    },
    {
      text: `gift giving is an important part of the relationship with someone I love.`,
      language: Languages.RECEIVING_GIFTS,
    },
  ],
  [
    {
      text: `someone I love helps me out when they know I'm already tired.`,
      language: Languages.ACTS_OF_SERVICE,
    },
    {
      text: `I get to go somewhere while spending time with someone I love.`,
      language: Languages.QUALITY_TIME,
    },
  ],
  [
    {
      text: `someone I love touches my arm or shoulder to show their care or concern.`,
      language: Languages.PHYSICAL_TOUCH,
    },
    {
      text: `someone I love gives me a little gift that they picked up in the course of their normal day.`,
      language: Languages.RECEIVING_GIFTS,
    },
  ],
  [
    {
      text: `someone I love says something encouraging to me.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
    {
      text: `I get to spend time in a shared activity or hobby with someone I love.`,
      language: Languages.QUALITY_TIME,
    },
  ],
  [
    {
      text: `someone I love surprises me with a small token of their appreciation.`,
      language: Languages.RECEIVING_GIFTS,
    },
    {
      text: `I'm touching someone I love frequently to express our friendship.`,
      language: Languages.PHYSICAL_TOUCH,
    },
  ],
  [
    {
      text: `someone I love helps me out — especially if I know they're already busy.`,
      language: Languages.ACTS_OF_SERVICE,
    },
    {
      text: `I hear someone I love tell me that they appreciate me.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
  ],
  [
    {
      text: `I get a hug from someone whom I haven't seen in a while.`,
      language: Languages.PHYSICAL_TOUCH,
    },
    {
      text: `I hear someone I love tell me how much I mean to him/her.`,
      language: Languages.WORDS_OF_AFFIRMATION,
    },
  ],
];

export default {
  Languages,
  prompt: `It's more meaningful to me when…`,
  singleQuestions,
};
