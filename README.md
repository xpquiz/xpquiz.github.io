# 🤔 XPQuiz - xpquiz.github.io

## Table of Contents

- [1. Game description](#1-game-description)
  - [1.2. Normal mode](#12-normal-mode)
  - [1.3. Trifecta mode](#13-trifecta-mode)
  - [1.4. Time-Rush mode](#14-time-rush-mode)
- [2. Technologies Used](#2-technologies-used)
  - [2.1. Styling](#21-styling)
  - [2.2. Programming](#22-programming)

A quiz game, with 3 different modes.

### 1. Game description

You have 3 different game modes to choose from.\
Each mode has a different number of questions, scoring system, and wait time depending on your performance.

#### 1.2. Normal mode

You have **ONE QUESTION** to answer - just one.

Whether you're right or wrong, you'll have to wait **3 HOURS**.

#### 1.3. Trifecta mode

You'll have **THREE QUESTIONS** to answer.

To win this mode you'll have to guess every one of them correctly.\
Winning gives you the standard score for each question summed up and _multiplied by three_, and you'll only wait **3 HOURS**.\
If you get even one of them wrong, you'll earn no points and will face **24 HOURS** to play the game again.

#### 1.4. Time-Rush mode

You'll have **FIVE QUESTIONS** to answer.

There's _30 seconds_ to answer each question, and _10 seconds_ for a break after answering each one.\
Answer correctly all five in time to get each question score summed up and _multiplied by 5_. And wait just **3 HOURS** to play again.\
Missing a single question - or not answering in time - will make you lose all points and give you **72 HOURS** wait time.

### 2. Technologies used

#### 2.1. Styling

For the styling I've used several libraries and media collections to make the app as faithful as possible to the Windows XP design.

- [XP.css](https://botoxparty.github.io/XP.css)  
  - I've used this CSS library to give the app the closest possible feeling to the Windows XP design (greatly appreciated by the creator 😀). And also used one of the most famous wallpapers ever, [Bliss](https://en.wikipedia.org/wiki/Bliss_(photograph)).
- [Windows XP sounds at archive.org](https://archive.org/details/windowsxpstartup_201910) 
  - Looking in ways to enhance even more the Windows XP felling, I've found this site which contained a lot of the OS sound effects, some of which were used in the app.
- [Windows XP icons by marchmountain@deviantart](https://www.deviantart.com/marchmountain/art/Windows-XP-High-Resolution-Icon-Pack-916042853) 
  - And also found some icons which helped me illustrate the app. They were very carefully enhanced by marchmountain@deviantart.

#### 2.2. Programming

On the tech side of the app, I've used:

- [Angular/Typescript](https://angular.dev/)
  - Used in the front-end. I'm not using any back-end technologies, because I wanted this to be a single page working site, which inspired me to locally store scores/matches, that also led me to choose... 
- [Dexie.js](https://dexie.org/)
  - Used for offline app storage of the questions answered and score. I've previously used the standard localstorage API, but went through a lot of problems, eventually leading me to redesign it and use the IndexedDB with Dexie.
- [The Trivia API](https://the-trivia-api.com/) and [OpenTriviaDB](https://opentdb.com/)
  - Open APIs being used to fetch all questions shown in the app. Kudos for their creators and maintainers!
- [GitHub Pages](https://pages.github.com/)
  - For hosting the site for free (or as we brazilians like to say - [_feito no 0800_](https://www.dicionarioinformal.com.br/0800/)).

---

The site is available at [xpquiz.github.io](https://xpquiz.github.io) - go ahead, play it, and share your results with friends! \
Feel free to contact me with suggestions, feedback, or just to say hi!
