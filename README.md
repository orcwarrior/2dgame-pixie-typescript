# HUNGRY-HOMELES-VIKING
### (2dgame-pixie-typescript)
![viking-game](https://i.imgur.com/yamjjWr.png)
[Demo](https://hungry-homeless-viking.herokuapp.com/)

# FEATURES
- Całośc kodu jest na tyle elastyczna (albo byłaby gdyby wprowadzić jeszcze kilka poprawek), że pozwala na dość łatwą zmiane
charakteru całości rozgrywki, wiekszość klas/komponentów jest możliwie słabo powiązana.
- System 'fizyki' (Force/ForceContainer) pozwalający osiągnąć dość realistycznie wyglądające ruchy obiektów.
- System kolizji, który ponad zwyklą informacje o kolizji, określa też strony obiektu które objeła kolizja
- Abstrakcyjny Obiekt gry (GameObject) możliwe zmodularyzowane, składające się z płaskich komponentów.
- Bazowe komponenty obiektów gry ( *Components ), są klasami abstrakcyjnymi, które implementują metody wspólne dla wszystkich
  dziedziczących komponentów (np. dodawanie i ustawianie animacji dla AnimsComponent).
- GameManager maksymalnie ogłupiony z działaniem ograniczonym do zachowania referencji oraz obsługą game-loop.
- W wiekszości kodu uzywane elementy progr. funkcyjnego ES2015+, tam gdzie było to problematyczne (obiekty) - lodash.
Game Features:
- Player moves with 'inertia' (like in mario); additionally starting to moving ease in slowly and release slowly too.

# TODO / NOTES:
- Plugin do dzwieku, kilka dzwieków, SoundManager?
- Poprawki kwestii wizualnych.
- Zadecydować miedzy polami z getterami/setterami a getX().
- Można spaść poza mape (OSTROŻNIE!).
- Wrapper Date (Timestamp) / Delay, tak aby nie czas płynał tylko gdy gra jest w stanie GameState.PLAY.
- Anims/VisualComponent dodać kod pozwalający na łatwe skalowanie.
- Wiecej źródeł wyrzucania jedzenia, dodatkowe oznaczenie graficzne przed wyrzuceniem jedzenia (sprite postaci pojawiajacy sie w oknie itp.).
- Przejrzeć ponownie kod pod kątek refaktoryzacji.
- It wasn't good idea to use classes like PIXI.Point without wrapping them, etc. It's simply makes my code tighter coupled with PIXI.js engine. (DONE)
- Skalowanie szybkosci poruszania sie obiektów wzgledem wielkosci okna gry.
- Stały limit FPS.
- High scores.
- Skonfigurowac loadery do plików webpacka, zamiast ładować wszystko loaderami explicite.
- Dodać loggera


## Fetch dependencies
```
npm install
```

## Run webpack
```
npm run build
```

## Start http-server
```
npm start
```
# CREDITS
(TODO)
