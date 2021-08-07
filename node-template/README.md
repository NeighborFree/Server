# Sever

## Redis-Scoket 

- 프로젝트에서 최대한 대규모의 가능성 고려할때 Redis Pub/sub이 필요하다고 생각합니다.

- socket.io-redis 모듈을 사용한다.

- Adapting Redis
```js
io.adapter(redis({ host: 'localhost', port: 6379 }));
io.on('connection', (socket) =>  { /* … */ });
```