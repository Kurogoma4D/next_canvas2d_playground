/// <reference types="../node_modules/@types/createjs/" />

export const buildTextline = (
  width: number,
  text: string,
  y: number,
  offset: number,
  color: string
): createjs.Container => {
  const container = new createjs.Container();
  const size = width / (text.length + 4);
  container.y = y;

  let texts = text
    .split("")
    .map((s, i) => buildLetter(s, i, size, offset, color));

  container.addChild(...texts);

  return container;
};

const buildLetter = (
  letter: string,
  index: number,
  size: number,
  offset: number,
  color: string
): createjs.Text => {
  const element = new createjs.Text(letter, `bold ${size}px Helvetica`, color);
  element.x = size * index + size / 2;
  element.y = 0;
  element.regX = element.regY = size / 2;
  element.scaleX = 0;
  element.scaleY = 0;
  element.rotation = -220;

  createjs.Tween.get(element)
    .wait(offset)
    .wait(70 * index)
    .to({ scale: 1, rotation: 0 }, 250, createjs.Ease.backOut);

  return element;
};
