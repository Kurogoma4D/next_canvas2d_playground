/// <reference types="../node_modules/@types/createjs/" />

export const buildTextline = (): createjs.Container => {
  const container = new createjs.Container();
  let firstText = "サンプル、";

  let texts = firstText
    .split("")
    .map((s, i) => buildLetter(s, i, 20 * i + 60, 50));

  container.addChild(...texts);

  return container;
};

const buildLetter = (
  letter: string,
  index: number,
  x: number,
  y: number
): createjs.Text => {
  const element = new createjs.Text(letter, "20px San-serif", "#424242");
  element.x = x;
  element.y = y;

  createjs.Tween.get(element, { loop: -1 })
    .to({ scale: 0 }, 1000 * (index + 1), createjs.Ease.cubicOut)
    .wait(1000 * (4 - index));

  return element;
};
