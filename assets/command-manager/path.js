import os from "os";

class Path {
  constructor() {
    this._path = os.homedir();
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }
}

export const currentPath = new Path();
