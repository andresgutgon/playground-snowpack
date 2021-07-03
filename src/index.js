import {helloWorld} from './hello-world.js';

helloWorld();


import confetti from 'canvas-confetti';

function fun () {
  confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
  })({ particleCount: 200, spread: 200 });
}
const all = document.getElementById('body')
all.addEventListener('click', fun, false)

fun()
