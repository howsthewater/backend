const surfers = require('./surfer.js');
const { PubSub } = require('apollo-server-express');
const pubsub = new PubSub();

const SURFERS_TOPIC = "newSurfer";

// The resolvers
const resolvers = {
    Query: {
      getSurfers: () => surfers,
      retrieveSurfer: (obj, { id }) => surfers.find(surfer => surfer.id === id)
    },
    Mutation: {
      createSurfer: (obj, { name, age, gender, beach }) => {
        const id = String(surfers.length + 1);
   //     const { name, gender } = args;
        const newSurfer = {
          id,
          info: {
            name,
            age,
            gender,
            beach
          }
        }
        surfers.push(newSurfer);
        return newSurfer;
      },
      updateSurfer: (obj, { id, name, gender, age, beach }) => {
        const surfer = surfers.find(surfer => surfer.id === id);
        if (surfer) {
          const surferIndex = surfers.indexOf(surfer);
          if (name) surfer.name = name;
          if (gender) surfer.gender = gender;
          if (age) surfer.age = age;
          if (beach) surfer.beach = beach;
          surfers[surferIndex] = { id, info: surfer }; // Update surfer using index
          return { id, info: surfer };
        } else {
          throw new Error('Surfer Id not found');
        }
      },
      deleteSurfer: (obj, { id, name, gender, age }) => {
        const surfer = surfers.find(surfer => surfer.id === id);
        if (surfer) {
          const surferIndex = surfers.indexOf(surfer);
          surfers.splice(surferIndex, 1);
          return { id, message: `Surfer with Id ${id} deleted successfully` }
        } else {
          throw new Error('Surfer Id not found');
        }
      }
    }
  };

  module.exports = resolvers;
  