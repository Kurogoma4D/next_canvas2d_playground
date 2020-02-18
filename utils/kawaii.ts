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
