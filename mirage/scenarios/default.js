export default function(server) {
  const quipu = server.create('team', {
    id:        "quipu",
    name:      "Quipu",
    subdomain: "quipu"
  });

  server.create('team', {
    id:        "empty",
    name:      "Emptyness S.L.",
    subdomain: "empty"
  });

  const quipuProject1 = server.create('project', {
    name:   "New frontend",
    description: `Building a completely new frontend for Quipuapp. It will be
      a single page javascript application that comunicates with the backend
      via a REST API.`
  });

  server.create('project', {
    name:   "Founding round 2016",
    description: `We want to close a founding in late 2016 - early 2017 that
      will enable the company to grow and target new markets`
  });

  server.create('user', {
    email:  'quipu-user-1@example.com',
    username: "Gorka",
    teamId: quipu.id,
    currentProjectId: null
  });

  server.create('user', {
    email: 'quipu-user-2@example.com',
    username: "Hayk",
    teamId: 'quipu'
  });

  const goal1 = server.create('goal', {
    name: "New income invoice form",
    description: "",
    projectId: quipuProject1.id
  });

  const goal2 = server.create('goal', {
    name: "Refactor taxes calculations",
    description: "",
    projectId: quipuProject1.id
  });

  const goal3 = server.create('goal', {
    name: "Optimize API performance",
    description: "",
    projectId: quipuProject1.id
  });

  for (let i = 0; i < 3; i++) {
    server.create('task', {
      name: `Task ${i}`,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed mi vulputate, eleifend sem vel, eleifend nulla. Aenean non venenatis ipsum. Fusce sollicitudin quam id diam facilisis, eu sollicitudin risus bibendum. Nunc volutpat mattis gravida. Vestibulum dignissim suscipit pellentesque.",
      goalId: goal1.id,
      position: i + 1
    });

    server.create('task', {
      name: `Task ${i}`,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed mi vulputate, eleifend sem vel, eleifend nulla. Aenean non venenatis ipsum. Fusce sollicitudin quam id diam facilisis, eu sollicitudin risus bibendum. Nunc volutpat mattis gravida. Vestibulum dignissim suscipit pellentesque.",
      goalId: goal2.id,
      position: i + 1
    });
  }
}
