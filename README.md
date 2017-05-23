# Chunk Chute

Cascading chunks of data (promises) and transform them stepwise into one or multiple outputs.

## Install

```bash
npm install chunk-chute
```

## Usage

### Setup chute chain

Create chute

```javascript
var chute = new ChunkChute(function () {
  this.push('chunk', 'to', 'push'); // produce some chunks
});
```

Add processor

```javascript
var nextChute = chute.pipe(function (arg1, arg2, arg3) {
  arg1 += 'next'; // do some transformation
  arg2 += 'next';
  arg3 += 'next';
  this.push(arg1, arg2, arg3);
});
```

Add another sequential processer

```javascript
var followerChute = nextChute.pipe(function (arg1, arg2, arg3) {
  this.push(arg1); // push may be called multiple times
  this.push(arg2);
  this.push(arg3); 
});
```

Add parallel processor

```javascript
var parallelChute = chute.pipe(function (arg1, arg2, arg3) {
  console.log(arg1 === 'chunk' && arg2 === 'to' && arg3 === 'push'); // create another chunk flow
  this.push('something', 'else');
});
```

### Forking

Create filtered flow

```javascript
var filteredChute = chute.fork(function (arg1, arg2, arg3) {
  return arg1 === 'chunk' && arg2 === 'to' && arg3 === 'push';
});
```

Process only passing chunks

```javascript
var filterFollowerChute = filteredChute.pipe(function (arg1, arg2, arg3) {
  console.log(arg1 === 'chunk' && arg2 === 'to' && arg3 === 'push'); // process filtered chunks
  this.push(arg1 + arg2 + arg3);
});
```

### Joining

Join multiple chutes into one

```javascript
var joined = ChunkChute.join(followerChute, parallelChute, filterFollowerChute);
```

Pipes of a joined chute receive all chunks which are pushed by the source chutes

```javascript
var collection = joined.pipe(function(arg1, arg2, arg3) {
  // process the chute
});
```

### Manual feeding

Push chunks manually into the chute

```javascript
chute.push('some', 'spoiled', 'chunk', 'here');
```

### Promise behavior

Chunks are thenable

```javascript
var chunkPromise = chunk.then(function(data) {
  console.log('the chunk fulfilled with', data);
}, function(error) {
  console.log('the chunk rejected with', error);
});
```

The created chunk promise still has all chunk functions

```javascript
chunkPromise.pipe(function(){
  // ...
}).fork(function() {
  // ...
}).then(function() {
  // ...
}, function() {
  // ...
});
```

Chutes can be served to the native promise API

```javascript
var promise = Promise.all(chute1, chute2, chute3);
```

There are active indicator to see if the chunk is still processing

```javascript
var done = chunk.resolved || chunk.rejected;
```

## Chute instance

The following properties are available on a chute instance

### push()

Directly insert some chunk data into the chute. Each call creates one chunk and can contain zero or multiple parameter.

This function returns the chute instance.

### pull()

Trigger the chunk processing. This function does not take any parameter and returns a promise which resolves when the chunk is processed.

### pipe()

Add a chunk processor. The processor is a function given as the only parameter. The return value is a newer created chute wrapping the processing function.

### fork()

Create a forked chunk flow where the chunks got filtered. The only parameter is the filter function which receives the chunks and returns a boolean value. The return value is a new chute which only flows the passing chunks.
 
### then()

Chute behaves like a promise and also may work asynchronously. This function behaves like the promise function and takes a success and error handler. The return value is a newer created promise which still has all chute properties.
 
### resolved - rejected

These boolean properties indicate if the chute is still active or either fulfilled or rejected.

## Processor API

The processor functions given in the constructor or during piping and forking are the working places.
 
### The arguments

The arguments of the function calls are the given chunk data which then can be processed and pushed further.

### The context

The context gives control to the flow of the chunks. The following functions are members of the calling context.

#### resolve() - reject()

Either resolve or reject the chute. After calling these functions, the chute will stop working and no more calls to the processor will happen.

#### push()

Push a chunk to the next chutes. These functions takes zero to multiple parameters which will represent one chunk. There is no return value.

### The return value

The return value indicates if the next processing should start right after this one is finished. A truly value will trigger the next process. A falsy value will hold further processing until a trigger from outside happens.
 
A returned promise will stop the further processing until it either resolves or rejects. The resolved value will trigger the same behavior as a direct returned value. If the promise rejects, then the chute rejects also and will stop any further processing.

---

Happy Coding ;)