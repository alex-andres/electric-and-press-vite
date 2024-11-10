import './style.css';
import branding from '/brand.svg';
import openingReel from '/opening-reel.mp4';
import secondReel from '/second-reel.mp4';
import { gsap } from 'gsap';
gsap.registerPlugin('ScrollTrigger');

document.querySelector('#app').innerHTML = `
  <section class="page page--1" data-active>
    <div class="header">
      <img src="${branding}" class="logo" alt="Electric & Press logo" />
    </div>
    <div class="outer">
      <div class="inner">
        <h1 class="hero-heading">
          <span class="revolving-text__wrapper">
            <span class="revolving-text revolving-text__better">Better</span>
          </span>
          <span class="revolving-text__wrapper revolving-text__wrapper--content">
            <span class="revolving-content__container">
              <span class="revolving-content__item revolving-content__text revolving-content__text--video">video</span>
              <span class="revolving-content__item revolving-content__text revolving-content__text--photo">photo</span>
              <span class="revolving-content__item revolving-content__text revolving-content__text--print">print</span>
              <div class="revolving-content__item revolving-content__video">
                <video class="" autoplay loop muted>
                  <source src="${openingReel}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
            </span>
          </span>
          <span class="revolving-text__wrapper">
            <span class="revolving-text revolving-text__for">for</span>
          </span>
          <span class="revolving-text__wrapper">
            <span class="revolving-text revolving-text__less">less.</span>
          </span>
        </h1>
        <div class="body-content__wrapper">
          <div class="body-content body-content--page-1">
            <p>
              We partner with publicly funded institutions and handpicked companies to create better physical & digital media for less dollars than the competition.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="page page--2">
    <div class="outer outer--page-2">
      <div class="inner">
        <video class="background-video background-video--page-2" loop muted>
          <source src="${openingReel}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="page-2__text-content">
          <div class="page-2__heading-container white-box">
            <h2 class="page-2__heading">Better clients.</h2>
          </div>
          <div class="body-content--page-2 white-box">
            <p>
              All clients of Electric & Press make a positive impact on society. We work to amplify and accelerate their impact through effective digital and physical media.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="page page--3">
    <div class="outer">
      <div class="inner">
        <video class="background-video background-video--page-3" loop muted>
          <source src="${secondReel}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="page-3__text-content">
          <div class="page-3__heading-container white-box">
            <h2 class="page-3__heading">Better business.</h2>
          </div>
          <div class="body-content--page-3">
            <div class="body-content__line-1">
              <p class="white-box white-box--1">
                Total transparency.
              </p>
              <p class="white-box white-box--2">
                Directly control your dollars.
              </p>
            </div>
            <div class="body-content__line-2">
              <p class="white-box white-box--3">
                Set pricing.
              </p>
              <p class="white-box white-box--4">
                Industry leading working conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

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
const videoContainer = document.querySelector('.revolving-content__video');
const page2 = document.querySelector('.page--2');

const durationFPS = (frames) => frames / 24;
const introAnimationOpts = {
  ease: 'power2.out',
  '--motion-blur': '0px',
};

const timeline = gsap.timeline({ delay: 0.5, autoRound: false });
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
    ease: 'power2.out',
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
    ease: 'power2.out',
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
    ease: 'power2.out',
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
    addScrollListeners();
    listening = true;
  },
});

const sections = document.querySelectorAll('section');
const outerWrappers = gsap.utils.toArray('.outer');
const innerWrappers = gsap.utils.toArray('.inner');
let initial = 0;
let currentSection = sections[initial];

function addScrollListeners() {
  document.addEventListener('wheel', handleWheel);
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('touchend', handleTouchEnd);
  document.addEventListener('keydown', handleKeydown);
}

function handleDirection() {
  listening = false;

  if (direction === 'down') {
    next = current + 1;
    if (next >= sections.length) next = 0;
    playAnimation(currentSection);
  }

  if (direction === 'up') {
    next = current - 1;
    if (next < 0) next = sections.length - 1;
    reverseAnimation(currentSection);
  }
}

function handleWheel(e) {
  if (!listening) return;
  direction = e.wheelDeltaY < 0 ? 'down' : 'up';
  handleDirection();
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
  handleDirection();
  console.log('touch end');
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
  handleDirection();
}

function playAnimation() {
  const currentSection = document.querySelector('[data-active]');
  if (currentSection === sections[0]) {
    zoomAnimation(videoContainer, page2);
    // make all inside of animation callback
    const nextSection = currentSection.nextElementSibling;
    nextSection.setAttribute('data-active', '');
    currentSection.removeAttribute('data-active');
  }
  listening = true;
}

function reverseAnimation() {
  const currentSection = document.querySelector('[data-active]');
  if (currentSection === sections[1]) {
    zoomAnimation(page2, videoContainer);
    // make all inside of animation callback
    const previousSection = currentSection.previousElementSibling;
    previousSection.setAttribute('data-active', '');
    currentSection.removeAttribute('data-active');
  }
  listening = true;
}

function zoomAnimation(animateFrom, animateTo) {
  const clone = animateFrom.cloneNode(true);
  const cloneVideo = clone.querySelector('video');
  clone.style.borderRadius = '7px';
  clone.style.overflow = 'hidden';
  cloneVideo.style.borderRadius = '7px';
  const videoTime = animateFrom.querySelector('video').currentTime;
  const endVideo = animateTo.querySelector('video');
  cloneVideo.currentTime = videoTime;
  endVideo.currentTime = videoTime;
  endVideo.play();

  const from = calculatePosition(animateFrom);
  const to = calculatePosition(animateTo);

  gsap.set([animateFrom, animateTo], { visibility: 'hidden' });
  gsap.set(clone, { position: 'absolute', margin: 0 });

  body.appendChild(clone);

  const style = {
    x: to.left - from.left,
    y: to.top - from.top,
    width: to.width,
    height: to.height,
    autoRound: false,
    ease: 'power2.Out',
    onComplete: () => {
      if (animateTo === page2) {
        console.log('clone', clone);
        gsap.to([clone, cloneVideo], {
          borderRadius: '0px',
          duation: durationFPS(5),
          ease: 'power2.Out',
          onComplete: onComplete,
        });
      } else {
        onComplete();
      }
    },
  };

  gsap.set(clone, from);
  gsap.to(clone, durationFPS(18), style);

  function onComplete() {
    gsap.set(animateTo, { visibility: 'visible' });

    body.removeChild(clone);
  }
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
