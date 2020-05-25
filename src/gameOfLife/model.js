import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
} from "./constants";

export class Model {
  constructor() {
    this.observers = [];
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
        Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  run(date = new Date().getTime()) {
    var stateTemp = Array.from(new Array(this.height), () =>
        Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.width; j++) {
        stateTemp[j][i] = this.state[j][i];
      }
    }
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {
        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            // TODO implement Game of life logic
            if (this.isCellAlive(i, j) === 0 && nbAlive === 3) {
              stateTemp[j][i] = CELL_STATES.ALIVE;
            }
            if (
                this.state[j][i] === CELL_STATES.ALIVE &&
                nbAlive !== 2 &&
                nbAlive !== 3
            ) {
              stateTemp[j][i] = CELL_STATES.DEAD;
            }
          }
        }

        this.state = stateTemp;
        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    // TODO
    this.stop();
    this.init();
  }

  isCellAlive(x, y) {
    return x >= 0 &&
    y >= 0 &&
    y < this.height &&
    x < this.height &&
    this.state[y][x] === CELL_STATES.ALIVE
        ? 1
        : 0;
  }
  aliveNeighbours(x, y) {
    let number = 0;
    // TODO
    number += this.isCellAlive(x - 1, y);
    number += this.isCellAlive(x - 1, y - 1);
    number += this.isCellAlive(x - 1, y + 1);
    number += this.isCellAlive(x + 1, y);
    number += this.isCellAlive(x + 1, y - 1);
    number += this.isCellAlive(x + 1, y + 1);
    number += this.isCellAlive(x, y - 1);
    number += this.isCellAlive(x, y + 1);
    return number;
  }

  addObserver(obs) {
    this.observers.push(obs);
  }

  updated() {
    // TODO update the view
    var model = this;
    this.observers.forEach(observer => observer(model));
  }
}
