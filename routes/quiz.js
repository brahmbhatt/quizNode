const rp = require('request-promise');
const Models = require('../models');

const exAPI1 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
const exAPI2 = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';
const route = [
  {
    method: 'POST',
    path: '/quiz/saveQueEx',
    handler: (request, response) => {
      rp(exAPI1).then((data) => {
        let ques = [];
        ques = JSON.parse(data).allQuestions;
        return ques;
      }).then((ques) => {
        const promiseArray = [];
        for (let i = 0; i < ques.length; i += 1) {
          const qid = ques[i].questionId;
          promiseArray[i] = rp(exAPI2 + qid);
        }
        const data = {
          ques,
          promiseArray,
        };
        return data;
      }).then((data) => {
        Promise.all(data.promiseArray).then((ansArray) => {
          for (let i = 0; i < data.ques.length; i += 1) {
            data.ques[i].ans = JSON.parse(ansArray[i]).answer;
          }
          return data.ques;
        }).then((ques) => {
          for (let i = 0; i < ques.length; i += 1) {
            Models.ques.create({
              qid: ques[i].questionId,
              que: ques[i].question,
              op1: ques[i].option1,
              op2: ques[i].option2,
              op3: ques[i].option3,
              op4: ques[i].option4,
              ans: ques[i].ans,
            });
          }
        }).then(() => {
          response({ statusCode: 201 });
        });
      });
    },
  },
  {
    method: 'POST',
    path: '/quiz/saveQueExx',
    handler: (request, response) => {
      rp(exAPI1).then((data) => {
        let ques = [];
        ques = JSON.parse(data).allQuestions;
        return ques;
      }).then((ques) => {
        const promiseArray = [];
        for (let i = 0; i < ques.length; i += 1) {
          const qid = ques[i].questionId;
          promiseArray[i] = rp(exAPI2 + qid);
        }
        const data = {
          ques,
          promiseArray,
        };
        return data;
      }).then((data) => {
        Promise.all(data.promiseArray).then((ansArray) => {
          for (let i = 0; i < data.ques.length; i += 1) {
            data.ques[i].ans = JSON.parse(ansArray[i]).answer;
          }
          return data.ques;
        }).then((ques) => {
          for (let i = 0; i < ques.length; i += 1) {
            const keys = Object.keys(ques[i]);

            const pattern = new RegExp('option');
            const options = {};
            for (let j = 0; j < keys.length; j += 1) {
              if (pattern.test(keys[j])) {
                options[keys[j]] = ques[i][keys[j]];
              }
            }
            Models.questions.create({
              qid: ques[i].questionId,
              que: ques[i].question,
              options,
              ans: ques[i].ans,

            });
            console.log('options', options);
          }
        }).then(() => {
          response({ statusCode: 201 });
        });
      });
    },
  },
  {
    method: 'GET',
    path: '/quiz/getDbInfo',
    handler: (request, response) => {
      Models.ques.findAll().then((arr) => {
        if (arr.length === 0) {
          response('0');
        } else {
          response('1');
        }
      });
    },
  },
  {
    method: 'GET',
    path: '/quiz/getQueDb',
    handler: (request, response) => {
      Models.questions.findAll().then((data) => {
        const ques = [];
        // data = JSON.parse(data);
        for (let i = 0; i < data.length; i += 1) {
          const obj = {
            qid: data[i].qid,
            que: data[i].que,
            options: data[i].options,
            ans: data[i].ans,
          };
          ques[i] = obj;
        }
        response(ques);
      });
    },
  },
  {
    method: 'POST',
    path: '/quiz/checkUser',
    handler: (request, response) => {
      Models.scores.findAll({ where: { uname: request.payload.uname } }).then((data) => {
        let users = [];
        let scores = [];
        if (data.length === 0) {
          Models.scores.create({
            uname: request.payload.uname,
            score: '0',
          }).then(() => {
            Models.questions.findAll().then((arr) => {
              const promiseArray = [];
              for (let i = 0; i < arr.length; i += 1) {
                promiseArray.push(Models.users.create({
                  uname: request.payload.uname,
                  qid: arr[i].qid,
                  ans: '#',
                }));
              }
              Promise.all(promiseArray).then(() => {
                Models.users.findAll().then((a) => {
                  users = a;
                  Models.scores.findAll().then((ab) => {
                    scores = ab;
                    response({ users, scores });
                  });
                });
              });
            });
          });
        } else {
          Models.users.findAll().then((arr) => {
            users = arr;
            Models.scores.findAll().then((s) => {
              scores = s;
              response({ users, scores });
            });
          });
        }
      });
    },
  },
  {
    method: 'POST',
    path: '/quiz/saveAns',
    handler: (request, response) => {
      Models.users.update({
        ans: request.payload.ans,

      }, {
        where: {
          uname: request.payload.uname,
          qid: request.payload.qid,
        },
      }).then(() => {
        response({ statusCode: 201 });
      });
    },
  },
  {
    method: 'POST',
    path: '/quiz/saveScore',
    handler: (request, response) => {
      Models.scores.update({
        score: request.payload.score,

      }, {
        where: {
          uname: request.payload.uname,
        },
      }).then(() => {
        response({ statusCode: 201 });
      });
    },
  },
];
module.exports = route;
