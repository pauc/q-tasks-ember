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

  this.get('/quipu/users/:id', function({ user }, request) {
    return user.find(request.params.id);
  });

  this.get('/teams/:id');

  this.get('/empty/projects', function() {
    return {
      data: []
    };
  });

  this.get('/quipu/projects', function({ project }) {
    return project.all();
  });

  this.namespace = 'quipu',

  this.get('/projects/:id');
  this.get('/goals');
  this.get('/goals/:id');
  this.get('/tasks');
  this.get('/tasks/:id');
}
