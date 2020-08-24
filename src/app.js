const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
 
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const repository = { id: uuid(), title, url, techs, likes : 0 };

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url, techs} = request.body;
 
  const updatedRepositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(updatedRepositoryIndex >= 0){
    
    const repository = {
      ...repositories[repositoryIndex],
      title,
      url,
      techs,
    }

    return response.json(repository);
  }
  else
    return response.status(400).send();


});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const updRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(updRepositoryIndex >= 0)
    repositories.splice(updRepositoryIndex);
  else
    return response.status(400).send();

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const updRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  console.log(id);

  if(updRepositoryIndex >= 0)
    repositories.find(repository => repository.id === id).likes++;
  else
    return response.status(400).send();

  return response.json(repositories[updRepositoryIndex]);
});

module.exports = app;
