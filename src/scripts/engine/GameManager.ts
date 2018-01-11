import * as PIXI from 'pixi.js';
// import * as goombaUrl from 'sprites$/goomba.png';
let goombaUrl = require('file-loader!../../res/sprites/goomba.png');

export class GameManager {
  private app: any;
  private gameWrapper: HTMLElement | null;

  constructor(wrapperId: string) {
    const myConsole = document.getElementById('my-console');
    const app = (this.app = new PIXI.Application(800, 600, {
      backgroundColor: 0x551111,
    }));
    // noinspection TsLint
    this.gameWrapper = document.getElementById(wrapperId);
    if (this.gameWrapper) {
      this.gameWrapper.appendChild(app.view);
    }

    const goomba = PIXI.Sprite.fromImage(goombaUrl);
    goomba.anchor.set(0.5);
    goomba.x = app.screen.width / 2;
    goomba.y = app.screen.height / 2;
    goomba.width = 80;
    goomba.height = 80;

    app.stage.addChild(goomba);
    // if (myConsole) myConsole.innerText = "APP: "+JSON.stringify(goomba);

    app.ticker.add(delta => {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent tranformation
      goomba.rotation += 0.1 * delta;
    });

    // PIXI.loader.add('food', '/res/sprites/goomba.png')
    //    .load((_, resource) => {

    //    })
  }
}
