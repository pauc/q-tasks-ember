export default function() {
  this.post('/oauth/token', function() {
    return {
      access_token: "a08bd89e8fde90f06eac199165ff414bc10e276b5b73a3effa27bad786c36a33",
      token_type: "bearer",
      expires_in: 2943,
      refresh_token: "9aba732caa2c269b6e502341fd7cd8118b2353b84eaef5800dfe0e3faa45eeb1",
      created_at: 1450714792,
      resource_owner_id: 1
    };
  });

  this.get('/teams/:id');

  this.get('/quipu/projects', function({ project }) {
    return project.all();
  });

  this.namespace = 'quipu';

  this.get('/projects/:id');
  this.get('/users');
  this.get('/users/:id');
  this.get('/goals');
  this.get('/goals/:id');
  this.post('/goals');
  this.get('/tasks');
  this.post('/tasks');
  this.get('/tasks/:id');
  this.patch('tasks/:id');

  this.namespace = 'empty';

  this.get('/projects', function({ project }) {
    return project.where({ taeamId: 'empty' });
  });

  this.post('/projects', function({ project }, request) {
    const json  = JSON.parse(request.requestBody);
    const attrs = json.data.attributes;

    attrs.teamId = 'empty';

    return project.create(attrs);
  });

  this.get('/projects/:id');
  this.get('/users');
  this.get('/users/:id');
  this.get('/goals');
  this.get('/goals/:id');
  this.get('/tasks');
  this.post('/tasks');
  this.get('/tasks/:id');
}
