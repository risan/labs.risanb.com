const { Engine, Render, World, Bodies } = Matter;

const engine = Matter.Engine.create();

const $app = document.getElementById('app');

const render = Render.create({
  element: $app,
  engine,
  options: {
    height: 600,
    width: $app.clientWidth,
    wireframes: false,
    background: '#fafafa',
  },
});

const ground = Bodies.rectangle($app.clientWidth / 2, 595, 800, 10, { isStatic: true });

World.add(engine.world, ground);

render.canvas.addEventListener('click', e => {
  let body;
  const size = Math.floor(Math.random() * 40) + 20;
  const angle = Math.random() * 3.14;
  const idx = Math.floor(Math.random() * 3);

  if (idx === 0) {
    body = Bodies.rectangle(e.offsetX, e.offsetY, size, size, { angle });
  } else if (idx === 1) {
    body = Bodies.circle(e.offsetX, e.offsetY, size);
  } else {
    body = Bodies.polygon(e.offsetX, e.offsetY, 3, size, { angle });
  }

  World.add(engine.world, body);
});

Engine.run(engine);

Render.run(render);