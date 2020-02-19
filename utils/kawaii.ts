export const buildText = (width: number, height: number): createjs.Text => {
  const size = width / 18;
  const text = new createjs.Text(
    "見て！サボテンが踊っているよ",
    `Bold ${size}px Helvetica`,
    "#424242"
  );
  text.x = width / 2 - size * 7;
  text.y = height / 1.6;
  return text;
};

export const buildKawaii = (width: number, height: number): createjs.Text => {
  const size = width / 18;

  const kawaii = new createjs.Text(
    "かわいいね",
    `Bold ${size}px Helvetica`,
    "#424242"
  );
  kawaii.x = width / 2 - size * 7;
  kawaii.y = height / 1.6 + size;
  return kawaii;
};

export const buildCactus = (width: number, height: number): createjs.Text => {
  const size = width / 3;

  const kawaii = new createjs.Text("🌵", `Bold ${size}px Helvetica`, "#424242");
  kawaii.regX = size / 2;
  kawaii.regY = size;
  kawaii.x = kawaii.regX + width / 2 - size / 2;
  kawaii.y = kawaii.regY + height / 1.6 - size;
  return kawaii;
};

export const buildBackground = (
  width: number,
  height: number
): createjs.Shape[] => {
  const colors = ["#FFE78C", "#E89079", "#DD92FF", "#79B7E8"];
  const radius = Math.max(width, height);
  let duration = 500;

  const bgShapes: createjs.Shape[] = [];

  const constrained = new createjs.Shape();
  constrained.graphics.beginFill("#79B7E8").drawRect(0, 0, width, height);

  bgShapes.push(constrained);

  const circles = colors.map((color, index) => {
    let circle = new createjs.Shape();
    circle.graphics.beginFill(color).drawCircle(width / 2, height / 2, radius);
    circle.scaleX = circle.scaleY = 0;

    createjs.Tween.get(circle, { loop: -1 })
      .wait(index * duration)
      .to({ scale: 1 }, duration, createjs.Ease.cubicOut)
      .wait((3 - index) * duration);
    return circle;
  });

  bgShapes.push(...circles);

  return bgShapes;
};
