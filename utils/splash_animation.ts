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

export const buildLoading = (canvas: HTMLCanvasElement): createjs.Container => {
  const text = new createjs.Container();
  text.scaleX = text.scaleY = 0.6;
  text.regX = canvas.width / 2;
  text.regY = canvas.height / 2;
  text.y = canvas.height / 2;

  const first = buildTextline(
    canvas.width,
    "クリエイターなら、",
    canvas.height / 2.2,
    500,
    "#F78E8A"
  );

  const second = buildTextline(
    canvas.width,
    "つくり続けた奴が正義だ。",
    canvas.height / 2.2,
    1700,
    "#754342"
  );

  let size = canvas.width / 13;
  createjs.Tween.get(first)
    .wait(70 * 9 + 800)
    .to({ y: canvas.height / 2.2 - size }, 500, createjs.Ease.backInOut);

  text.addChild(first);
  text.addChild(second);

  createjs.Tween.get(text)
    .wait(70 * 9 + 800)
    .to({ scale: 1.1 }, 320, createjs.Ease.cubicOut)
    .to({ scale: 1 }, 460, createjs.Ease.cubicInOut);

  return text;
};
