import '../styles/base.scss';
import { GameManager } from './engine/GameManager';
import { Greeter } from './greeter';

// import '../res/sprites/goomba.png';
const greeter: Greeter = new Greeter('2dgame-pixie-typescript');

const gm = new GameManager('game-wrapper');
// if (el) {
//   el.innerHTML = greeter.greet();
// }
