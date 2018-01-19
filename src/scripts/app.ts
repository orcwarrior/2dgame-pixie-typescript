import '../styles/base.scss';
import {GameManager, GameState} from './engine/GameManager';


const gm = new GameManager('game-wrapper');

const stats = document.getElementById('game-stats');
const dialog = document.getElementById('game-dialog');

if (stats) {
    setInterval(() => {
        let gmStats = gm.getStats();
        stats.innerText = `SCORE: ${gmStats.score}\n
                           LIVES: ${gmStats.lives}`;
    }, 100);
}

gm.on('statechange', (state: GameState) => {
    if (!dialog) {
        return;
    }

    if (state === GameState.PLAY) {
        dialog.innerText = '';
    } else if (state === GameState.PAUSED) {
        dialog.innerText = `<KLIKNIJ ESC BY KONTYNUOWAC>`;
    } else if (state === GameState.OVER) {
        dialog.innerText = `<KONIEC GRY NACISNIJ F5 ;-) BY ZACZAC OD NOWA>`;
    }
});

( function loadBGMusic() {
    gm.getSoundManager().play(require('file-loader!res/sfx/bgMusic.mp3'), 0.4, true, true);
})();
