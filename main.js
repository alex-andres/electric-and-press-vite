import './style.css';
import branding from '/brand.svg';
import backgroundImage from '/background-image.jpg';
import openingReel from '/opening-reel.mp4';
import secondReel from '/second-reel.mp4';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
gsap.registerPlugin(Observer);

let listening = false,
  direction = 'down',
  current,
  next = 0;

const touch = {
  startX: 0,
  startY: 0,
  dx: 0,
  dy: 0,
  startTime: 0,
  dt: 0,
};
const root = document.documentElement;
const body = document.body;
const page1 = document.querySelector('.page--1');
const videoContainer = page1.querySelector('.revolving-content__video');
const page2 = document.querySelector('.page--2');

const durationFPS = (frames) => frames / 24;
const introAnimationOpts = {
  ease: 'power1.out',
  '--motion-blur': '0px',
};

const timeline = gsap.timeline({ delay: 0.5 });
timeline.to('.revolving-text__better', {
  ...introAnimationOpts,
  y: 0,
  duration: durationFPS(8),
});
timeline.to(
  '.revolving-content__container',
  {
    ...introAnimationOpts,
    y: 0,
    duration: durationFPS(7),
  },
  `>-${durationFPS(1)}`
);

timeline.to(
  '.revolving-content__container',
  {
    ease: 'power1.out',
    y: '-336px',
    duration: durationFPS(9),
  },
  `>+${durationFPS(3)}`
);

timeline.to(
  '.revolving-content__container',
  {
    keyframes: {
      '0%': { '--motion-blur': '0px' },
      '25%': { '--motion-blur': '4.1px' },
      '75%': { '--motion-blur': '3px' },
      '100%': { '--motion-blur': '0px' },
    },
    duration: durationFPS(5),
  },
  '<'
);

timeline.to(
  '.revolving-content__container',
  {
    ease: 'power1.out',
    y: '-662px',
    duration: durationFPS(11),
  },
  `>+${durationFPS(3)}`
);
timeline.to(
  '.revolving-content__container',
  {
    keyframes: {
      '0%': { '--motion-blur': '0px' },
      '25%': { '--motion-blur': '4.1px' },
      '75%': { '--motion-blur': '3px' },
      '100%': { '--motion-blur': '0px' },
    },
    duration: durationFPS(5),
  },
  '<'
);
timeline.to(
  '.revolving-content__container',
  {
    ease: 'power1.out',
    y: '-988px',
    duration: durationFPS(11),
  },
  `>+${durationFPS(6)}`
);
timeline.to(
  '.revolving-content__container',
  {
    keyframes: {
      '0%': { '--motion-blur': '0px' },
      '25%': { '--motion-blur': '4.1px' },
      '75%': { '--motion-blur': '3px' },
      '100%': { '--motion-blur': '0px' },
    },
    duration: durationFPS(5),
  },
  '<'
);
timeline.to(
  '.revolving-text__wrapper--content',
  {
    keyframes: {
      '0%': { height: '255px' },
      '100%': { height: '300px' },
    },
    duration: durationFPS(5),
  },
  `>-${durationFPS(4)}`
);
timeline.to(
  '.hero-heading',
  {
    keyframes: {
      '0%': { y: '0px' },
      '100%': { y: '-22px' },
    },
    duration: durationFPS(5),
  },
  '<'
);
timeline.to('.revolving-text__for', {
  ...introAnimationOpts,
  y: 0,
  duration: durationFPS(8),
});
timeline.to('.revolving-text__less', {
  ...introAnimationOpts,
  y: 0,
  duration: durationFPS(8),
});
timeline.to('.body-content--page-1', {
  ...introAnimationOpts,
  y: 0,
  duration: durationFPS(8),
  onComplete: () => {
    listening = true;
    addScrollListeners();
  },
});

const sections = document.querySelectorAll('section');
let currentSection = sections[0];
function addScrollListeners() {
  document.addEventListener('wheel', handleWheel);
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
  document.addEventListener('keydown', handleKeydown);
}

function handleDirection(e, passedSection) {
  listening = false;
  const currentSection = document.querySelector('[data-active]');
  const currentSectionPageNumber = currentSection.dataset.pageNumber;

  const passedSectionPageNumber = passedSection.dataset.pageNumber;

  if (Math.abs(passedSectionPageNumber - currentSectionPageNumber) > 1) {
    listening = true;
    return;
  }

  if (direction === 'down') {
    playAnimation();
  }

  if (direction === 'up') {
    reverseAnimation();
  }
}

function handleWheel(e) {
  if (!listening) return;
  direction = e.wheelDeltaY < 0 ? 'down' : 'up';
  const currentSection = document.querySelector('[data-active]');
  handleDirection(e, currentSection);
}

function handleTouchStart(e) {
  if (!listening) return;
  const t = e.changedTouches[0];
  touch.startX = t.pageX;
  touch.startY = t.pageY;
}

function handleTouchMove(e) {
  if (!listening) return;
  e.preventDefault();
}

function handleTouchEnd(e) {
  if (!listening) return;
  const t = e.changedTouches[0];
  touch.dx = t.pageX - touch.startX;
  touch.dy = t.pageY - touch.startY;
  if (touch.dy > 10) direction = 'up';
  if (touch.dy < -10) direction = 'down';
  const currentSection = document.querySelector('[data-active]');
  handleDirection(e, currentSection);
}

function handleKeydown(e) {
  if (!listening) return;
  if (e.key === 'ArrowDown') {
    direction = 'down';
  } else if (e.key === 'ArrowUp') {
    direction = 'up';
  } else {
    return;
  }
  const currentSection = document.querySelector('[data-active]');
  handleDirection(e, currentSection);
  handleDirection(e);
}

function playAnimation() {
  listening = false;
  const currentSection = document.querySelector('[data-active]');
  if (currentSection === sections[0]) {
    zoomInAnimation();
  } else if (currentSection === sections[1]) {
    scrollDown();
  } else if (currentSection === sections[2]) {
    zoomOutToVideo();
  } else {
    listening = true;
    return;
  }
}

function reverseAnimation() {
  listening = false;
  const currentSection = document.querySelector('[data-active]');
  if (currentSection === sections[1]) {
    zoomOutAnimation();
  } else if (currentSection === sections[2]) {
    scrollUp();
  } else if (currentSection === sections[3]) {
    zoomInToVideo();
  } else {
    listening = true;
    return;
  }
}

function zoomInAnimation() {
  const animateFrom = videoContainer;
  const animateTo = page2;
  const clone = animateFrom.cloneNode(true);
  const cloneVideo = clone.querySelector('video');
  clone.style.borderRadius = '7px';
  clone.style.overflow = 'hidden';
  cloneVideo.style.borderRadius = '7px';

  const from = calculatePosition(animateFrom);
  const to = calculatePosition(animateTo);

  gsap.set([animateFrom, animateTo], { visibility: 'hidden' });
  gsap.set(clone, { position: 'absolute', margin: 0 });

  body.appendChild(clone);
  gsap.set(clone, from);
  const style = {
    x: to.left - from.left,
    y: to.top - from.top,
    width: to.width,
    height: to.height,
    autoRound: false,
    ease: 'none',
    filter: 'brightness(1.1)',
    duration: durationFPS(18),
  };
  const forwardTL = gsap.timeline();
  forwardTL.to(clone, style);
  const videoTime = animateFrom.querySelector('video').currentTime;
  const endVideo = animateTo.querySelector('video');
  cloneVideo.currentTime = videoTime;
  endVideo.currentTime = videoTime;
  endVideo.play();
  forwardTL.set(page2, { visibility: 'visible' });
  forwardTL.to(
    clone,
    {
      duration: durationFPS(1),
      ease: 'power1.Out',
      borderRadius: '0px',
      opacity: 0,
      onComplete: () => {
        body.removeChild(clone);
      },
    },
    '<'
  );
  const page2HeadingContainer = page2.querySelector(
    '.page-2__heading-container'
  );
  const page2BodyContent = page2.querySelector('.body-content--page-2');
  forwardTL.to(
    page2HeadingContainer,
    {
      ease: 'none',
      y: 0,
      duration: durationFPS(8),
      delay: durationFPS(-1),
    },
    `<`
  );
  forwardTL.to(page2BodyContent, {
    ease: 'none',
    y: 0,
    duration: durationFPS(8),
    onComplete: () => {
      const nextSection = currentSection.nextElementSibling;
      nextSection.setAttribute('data-active', '');
      body.setAttribute('data-active-page', 'page-2');
      currentSection.removeAttribute('data-active');
      listening = true;
    },
  });
}

function zoomOutAnimation() {
  const animateFrom = page2;
  const animateTo = videoContainer;
  const clone = animateFrom.cloneNode(true);
  const cloneVideo = clone.querySelector('video');
  clone.style.borderRadius = '7px';
  clone.style.overflow = 'hidden';
  cloneVideo.style.borderRadius = '7px';

  const from = calculatePosition(animateFrom);
  const to = calculatePosition(animateTo);

  gsap.set([animateFrom, animateTo], { visibility: 'hidden' });
  gsap.set(clone, { position: 'absolute', margin: 0 });

  body.appendChild(clone);
  gsap.set(clone, from);
  const style = {
    x: to.left - from.left,
    y: to.top - from.top,
    width: to.width,
    height: to.height,
    autoRound: false,
    ease: 'power1.Out',
    filter: 'brightness(1.1)',
    duration: durationFPS(18),
  };
  const cloneHeading = clone.querySelector('.page-2__heading-container');
  const cloneBody = clone.querySelector('.body-content--page-2');
  const reverseTL = gsap.timeline();
  reverseTL.to(cloneBody, {
    ease: 'none',
    yPercent: 101,
    duration: durationFPS(8),
  });
  reverseTL.to(cloneHeading, {
    ease: 'none',
    yPercent: -101,
    duration: durationFPS(8),
  });
  reverseTL.to(
    clone,
    {
      duration: durationFPS(5),
      ease: 'power1.Out',
      opacity: 1,
    },
    '<'
  );
  const videoTime = animateFrom.querySelector('video').currentTime;
  const endVideo = animateTo.querySelector('video');
  cloneVideo.currentTime = videoTime;
  endVideo.currentTime = videoTime;
  cloneVideo.play();
  reverseTL.set(page2, { visibility: 'hidden' });
  reverseTL.to(clone, {
    ...style,
    onComplete: () => {
      body.removeChild(clone);
      gsap.set(animateTo, { visibility: 'visible' });
      const page2BodyContent = page2.querySelector('.body-content--page-2');
      const page2HeadingContainer = page2.querySelector(
        '.page-2__heading-container'
      );
      gsap.set(page2BodyContent, { clearProps: 'all' });
      gsap.set(page2HeadingContainer, { clearProps: 'all' });
      gsap.set(page2, { clearProps: 'all' });
      const currentSection = document.querySelector('[data-active]');
      const previousSection = currentSection.previousElementSibling;
      previousSection.setAttribute('data-active', '');
      body.setAttribute('data-active-page', 'page-1');
      currentSection.removeAttribute('data-active');

      listening = true;
    },
  });
}

function calculatePosition(element) {
  const rect = element.getBoundingClientRect();

  const scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
  const scrollLeft =
    window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;

  const clientTop = root.clientTop || body.clientTop || 0;
  const clientLeft = root.clientLeft || body.clientLeft || 0;

  return {
    top: Math.round(rect.top + scrollTop - clientTop),
    left: Math.round(rect.left + scrollLeft - clientLeft),
    height: rect.height,
    width: rect.width,
  };
}

function scrollDown() {
  const currentSection = document.querySelector('[data-active]');
  const nextSection = currentSection.nextElementSibling;
  const nextPageNumber = nextSection.dataset.pageNumber;
  nextSection.style.visibility = 'visible';
  const video = nextSection.querySelector('video');
  video.play();
  const scrollTimeline = gsap.timeline();
  scrollTimeline.to(currentSection, {
    yPercent: -100,
    duration: durationFPS(24),
    ease: 'power1.out',
  });

  scrollTimeline.to(
    nextSection,
    {
      y: 0,
      duration: durationFPS(24),
      ease: 'power1.out',
      onStart: () => {
        timelines[nextPageNumber].timeline.play().delay(durationFPS(9));
      },
      onComplete: () => {
        currentSection.removeAttribute('data-active');
        nextSection.setAttribute('data-active', '');
        gsap.set(page2, { clearProps: 'all' });
      },
    },
    '<'
  );
}

function scrollUp() {
  const currentSection = document.querySelector('[data-active]');
  const previousSection = currentSection.previousElementSibling;
  previousSection.setAttribute('data-active', '');
  previousSection.style.visibility = 'visible';
  const pageNumber = currentSection.dataset.pageNumber;
  timelines[pageNumber].timeline.delay(0);
  timelines[pageNumber].timeline
    .reverse()
    .eventCallback('onReverseComplete', () => {
      timelines[pageNumber].elements.forEach((element) => {
        gsap.set(element, { clearProps: 'all' });
      });
      gsap.to(currentSection, {
        yPercent: 100,
        duration: durationFPS(24),
        ease: 'power1.out',
      });
      const video = previousSection.querySelector('video');
      if (video) {
        video.play();
      }
      gsap.to(
        previousSection,
        {
          yPercent: 0,
          duration: durationFPS(24),
          ease: 'power1.out',
          onComplete: () => {
            currentSection.removeAttribute('data-active');
            gsap.set(currentSection, { clearProps: 'all' });

            listening = true;
          },
        },
        '<'
      );
      currentSection.removeAttribute('data-active');
    });
}

function zoomOutToVideo() {
  const currentSection = document.querySelector('[data-active]');
  const nextSection = currentSection.nextElementSibling;
  const { pageNumber } = currentSection.dataset;
  const nextPageNumber = nextSection.dataset.pageNumber;
  currentSection.removeAttribute('data-active');
  nextSection.setAttribute('data-active', '');
  nextSection.style.visibility = 'visible';
  timelines[nextPageNumber].timeline.play();
}
function zoomInToVideo() {
  const currentSection = document.querySelector('[data-active]');
  const previousSection = currentSection.previousElementSibling;
  previousSection.setAttribute('data-active', '');
  previousSection.style.visibility = 'visible';
  currentSection.removeAttribute('data-active');
  const pageNumber = currentSection.dataset.pageNumber;
  timelines[pageNumber].timeline.reverse();
  timelines[pageNumber].timeline.eventCallback('onReverseComplete', () => {
    currentSection.removeAttribute('style');
  });
}

const timeline3 = gsap
  .timeline({ paused: true })
  .to('.page-3__heading-container', {
    y: 0,
    duration: durationFPS(8),
    ease: 'power1.out',
  })
  .to('.white-box--1', {
    y: 0,
    duration: durationFPS(8),
    ease: 'power1.out',
  })
  .to('.white-box--2', {
    y: 0,
    duration: durationFPS(8),
    ease: 'power1.out',
  })
  .to('.white-box--3', {
    y: 0,
    duration: durationFPS(8),
    ease: 'power1.out',
  })
  .to('.white-box--4', {
    y: 0,
    duration: durationFPS(8),
    ease: 'power1.out',
  })
  .eventCallback('onComplete', () => {
    listening = true;
  });

const page3Elements = [
  '.page-3__heading-container',
  '.white-box--1',
  '.white-box--2',
  '.white-box--3',
  '.white-box--4',
];
const timeline4 = gsap
  .timeline({ paused: true })
  .to('.page-3__text-content', {
    scale: 949 / 207,
    opacity: 0,
    duration: durationFPS(8),
    ease: 'power1.out',
  })
  .to(
    '.background-video--page-3',
    {
      scale: 207 / 949,
      duration: durationFPS(8),
      ease: 'power1.out',
    },
    '<'
  )
  .to('.page--3', {
    opacity: 0,
    duration: durationFPS(8),
    ease: 'power1.out',
  })
  .to('.page-4__heading-container', {
    y: 0,
    duration: durationFPS(8),
    ease: 'power1.out',
  })
  .eventCallback('onComplete', () => {
    listening = true;
  })
  .eventCallback('onReverseComplete', () => {
    listening = true;
  });

const page4Elements = [
  '.background-video--page-3',
  '.page--3',
  '.page-4__heading-container',
];
const timelines = {
  3: {
    timeline: timeline3,
    elements: page3Elements,
  },
  4: {
    timeline: timeline4,
    elements: page4Elements,
  },
};
