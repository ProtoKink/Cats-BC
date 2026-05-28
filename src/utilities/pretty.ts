export function catsify(messageElement: HTMLElement) {
  const emojiBackground = ElementCreate({
    tag: 'div',
    classList: ['cats-emoji-background'],
  });
  
  messageElement.prepend(emojiBackground);

  let frameAttempts = 0;
  const maxFrameAttempts = 10;

  const renderEmojis = () => {
    const rect = emojiBackground.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (!width || !height) {
      frameAttempts += 1;
      if (frameAttempts <= maxFrameAttempts) {
        requestAnimationFrame(renderEmojis);
      }
      return;
    }

    emojiBackground.textContent = '';

    const minDim = Math.min(width, height);
    const sizeScale = Math.min(1, minDim / 80);

    const emojiSizePx = minDim * 0.18; // ~18% of container
    const minDistancePx = emojiSizePx * (1.15 + 0.2 * (1 - sizeScale));
    const radiusPx = emojiSizePx / 2;

    // estimate how many can fit: area of container / area of one emoji * packing factor
    const containerArea = width * height;
    const emojiArea = Math.PI * (radiusPx * radiusPx);
    const packingFactor = 0.35 * Math.max(0.55, sizeScale);
    const maxEmojis = 48;
    // scale with message height so multi-line messages get more emojis
    const maxByHeight = Math.min(48, Math.max(5, Math.round(height / 10)));
    const emojiCount = Math.min(
      maxEmojis,
      maxByHeight,
      Math.max(1, Math.floor((containerArea / emojiArea) * packingFactor))
    );

    const placed: { x: number; y: number }[] = [];

    const isValid = (x: number, y: number) => {
      for (const neighbor of placed) {
        const dx = neighbor.x - x;
        const dy = neighbor.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < minDistancePx) {
          return false;
        }
      }
      return true;
    };

    const addPoint = (x: number, y: number) => {
      placed.push({ x, y });
    };

    const placedCountTarget = Math.max(1, emojiCount);
    const maxAttempts = placedCountTarget * 120;

    let attempts = 0;
    while (placed.length < placedCountTarget && attempts < maxAttempts) {
      attempts += 1;

      // stratified picks to spread across full area
      const x = radiusPx + Math.random() * (width - 2 * radiusPx);
      const y = radiusPx + Math.random() * (height - 2 * radiusPx);

      if (!isValid(x, y)) continue;
      addPoint(x, y);
    }

    placed.forEach(({ x, y }) => {
      ElementCreate({
        tag: 'span',
        classList: ['cats-emoji'],
        children: [Math.random() > 0.5 ? '🐱' : '🐾'],
        style: {
          position: 'absolute',
          top: `${y}px`,
          left: `${x}px`,
          transform: 'translate(-50%, -50%)'
        },
        parent: emojiBackground
      });
    });
  };

  renderEmojis();
}
