interface Data {
  month: number;
  sales: number;
  revenue: number;
}

export const loadData = (): Data[] => {
  const date = new Date('1 Jan 2023');
  const end = new Date('31 Dec 2023').getTime();
  const avg = 700;
  const get = (init = avg): number => {
    const value = init + Math.floor(Math.random() * 41) - 20;

    return Math.random() > 0.5 ? value : get(value);
  };

  const data: Data[] = [];

  for (
    ;
    date.getTime() <= end;
    date.setDate(date.getDate() + 2), date.setHours(0, 0, 0, 0)
  ) {
    const sales = get(data.at(-1)?.sales || 900);
    const revenue = get(data.at(-1)?.revenue || 700);

    data.push({
      month: date.getMonth(),
      sales,
      revenue: revenue,
    });
  }

  return data;
};

function centerText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
) {
  const textMetrics = ctx.measureText(text);

  ctx.fillText(
    text,
    x - 0.5 * textMetrics.width,
    y +
      (textMetrics.actualBoundingBoxAscent -
        textMetrics.actualBoundingBoxDescent) *
        0.5,
  );
}

export function drawAnalytics(
  canvas: HTMLCanvasElement,
  data: Data[],
  translatedMonths: Array<string>,
  currency: string = '$',
): void {
  canvas.width = canvas.offsetWidth;

  const ctx = canvas.getContext('2d');

  if (!(ctx instanceof CanvasRenderingContext2D)) return;

  ctx.fillStyle = 'transparent';

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font =
    '400 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

  const months = translatedMonths;

  const mc = (canvas.width - 48) / months.length;

  for (let i = 0; i < months.length; i++) {
    ctx.fillStyle = '#667085';

    let x = 48 + i * mc + 0.5 * mc;

    let y = canvas.height - 13;

    centerText(ctx, months[i], x, y);
  }

  const ranges = [0, 200, 400, 600, 800, 1000, 1200, 1400];

  const parseRange = (range: number): string =>
    `${currency}${range < 1000 ? range : `${range / 1000}k`}`;

  for (let i = 0; i < ranges.length; i++) {
    ctx.fillStyle = '#667085';

    ctx.font =
      '400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

    let x = 24;

    let y = canvas.height - 26 - i * 28.25;

    centerText(ctx, parseRange(ranges[i]), x, y);
  }

  function drawCurve(
    offsetX: number,
    baseY: number,
    prop: 'sales' | 'revenue',
    color: string,
    mode: string = 'stroke',
  ) {
    if (!(ctx instanceof CanvasRenderingContext2D)) return;

    let lowestY = Infinity;
    let largestY = -Infinity;

    let maxY = canvas.height - baseY;

    let lastX = offsetX;
    let lastY = ((1400 - data[0][prop]) / 1400) * maxY + 14.125;

    ctx.beginPath();
    ctx.moveTo(lastX, Math.min(lastY, maxY));

    for (let i = 1; i < data.length; i++) {
      let x = offsetX + ((i + 1) / data.length) * (canvas.width - offsetX);
      let y = ((1400 - data[i][prop]) / 1400) * maxY + 14.125;

      if (y > largestY) largestY = y;
      if (y < lowestY) lowestY = y;

      ctx.quadraticCurveTo(
        0.5 * (x + lastX),
        Math.min(0.5 * (y + lastY), maxY),
        x,
        Math.min(y, maxY),
      );

      lastX = x;
      lastY = y;

      if (mode === 'stroke') {
        ctx.lineWidth = 1;

        ctx.strokeStyle = color;

        ctx.stroke();
      }
    }

    lastY -= 30;

    ctx.lineTo(lastX, Math.min(lastY, maxY));

    if (mode === 'gradient') {
      for (let i = data.length - 2; i > -1; i--) {
        let x = offsetX + ((i + 1) / data.length) * (canvas.width - offsetX);
        let y = ((1400 - data[i][prop]) / 1400) * maxY + 14.125 + 30;

        ctx.quadraticCurveTo(
          0.5 * (x + lastX),
          Math.min(0.5 * (y + lastY), maxY),
          x,
          Math.min(y, maxY),
        );

        lastX = x;
        lastY = y;
      }

      const gradient = ctx.createLinearGradient(
        0,
        lowestY,
        0,
        Math.min(largestY + 30, canvas.height - maxY),
      );

      gradient.addColorStop(0, color);
      gradient.addColorStop(1, '#ffffff');

      ctx.fillStyle = gradient;

      ctx.fill();
    }
  }

  drawCurve(48, 26, 'revenue', '#7D7AED20', 'gradient');
  drawCurve(48, 26, 'sales', '#E9884120', 'gradient');

  drawCurve(48, 26, 'revenue', '#771FCB');
  drawCurve(48, 26, 'sales', '#E46A11');
}
