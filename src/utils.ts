import {
  NOTEPAD, RESUME,
  NV_WIN_RESIZE, N_WIN_RESIZE, NE_WIN_RESIZE, V_WIN_RESIZE,
  E_WIN_RESIZE, SV_WIN_RESIZE, S_WIN_RESIZE, SE_WIN_RESIZE
} from "./constants";
import { GenericPrg } from "./programs";

export function inArr<T>(arr: Array<T>, item: T) {
  for (let i = 0; i < arr.length; i++) {
    if (item === arr[i])
      return true;
  }

  return false;
}

export type Dict<T> = { [index: string]: T };

export function mapDict<T, U>(
  dict: Dict<T>,
  fun: (value: T, key: string, dict: Dict<T>) => U
): Dict<U> {
  const result: Dict<U> = {};

  Object.keys(dict).forEach((key) => {
    result[key] = fun(dict[key], key, dict);
  });
  return result;
};

export function filterDict<T>(
  dict: Dict<T>,
  fun: (value: T, key: string, dict: Dict<T>) => boolean
): Dict<T> {
  const result: Dict<T> = {};

  Object.keys(dict).forEach((key) => {
    if (fun(dict[key], key, dict))
      result[key] = dict[key];
  });
  return result;
};

export function mapDictFlat<T, U>(
  dict: Dict<T>,
  fun: (value: T, key: string, dict: Dict<T>) => U
): Array<U> {
  const result: Array<U> = [];

  Object.keys(dict).forEach((key) => {
    result.push(fun(dict[key], key, dict));
  })

  return result;
};

export function lenDict<T>(dict: Dict<T>): number {
  return Object.keys(dict).length;
};

export function defArg<T, U>(value: T, def: U) {
  return (typeof value === "undefined") ? def : value;
};

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (1 + max - min)) + min;
};

interface DebFun {
  (): void;
  interval: number;
};

export let debounce = function(fun: Function, wait: number): Function {
  let debFun = function() {
    window.clearTimeout(debFun.interval);
    debFun.interval = window.setTimeout(fun, wait);
  } as DebFun;
  debFun.interval = NaN;
  return debFun;
};

export interface State {
  upid: number;
  desktopWidth: number;
  desktopHeight: number;
  isDragging: boolean;
  isResizing: boolean;
  programs: Dict<GenericPrg>;
};
