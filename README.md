# 2dgame-pixie-typescript

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


- Abstrakcyjny Obiekt gry (GameObject) możliwe zmodularyzowane, składające się z płaskich komponentów.
- Bazowe komponenty obiektów gry ( *Components ), są klasami abstrakcyjnymi, które implementują metody wspólne dla wszystkich
  dziedziczących komponentów (np. dodawanie i ustawianie animacji dla AnimsComponent).
- Dziedziczące, konkretne komponenty mają konstruktory oznaczone jako private, jest to inaczej final class co zapewnia płaskie
  dziedziczenie w projekcie.
- GameManager maksymalnie ogłupiony z działaniem ograniczonym do zachowania referencji oraz obsługą game-loop.

Game Features:
- Player moves with 'inertia' (like in mario); additionally starting to moving ease in slowly and release slowly too.
