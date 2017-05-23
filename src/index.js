(function (create) {
  'use strict';

  var Class = create();

  if (typeof module === 'object' && module instanceof Object && module.exports instanceof Object) {
    module.exports = Class;
  } else if (typeof window === 'object' && window instanceof Object) {
    window[Class.name] = Class;
  } else {
    throw new Error('No valid context available.');
  }

})(function () {
  'use strict';

  /**
   * Create chunk chute instance
   * @param {Function} callback
   * @param {ChunkChute} [source]
   * @constructor
   */
  function ChunkChute(callback, source) {
    var chute, stack, pipes, process, promise, resolve, reject, resolved, rejected;

    /**
     * Execute chunk
     * @returns {Promise}
     */
    function exec() {
      var context, issue;

      context = {
        resolve: resolve,
        reject: reject,
        push: function () {
          var args = arguments;
          pipes.forEach(function (pipe) {
            pipe.push.apply(pipe, args);
          });
        }
      };

      issue = callback.apply(context, stack.shift());

      process = Promise.resolve(issue).then(function (proceed) {
        process = null;
        pipes.forEach(function (pipe) {
          /** @type {ChunkChute} */
          pipe.pull();
        });

        if (proceed) {
          pull();
        }
      });
      return process;
    }

    /**
     * Push arguments
     * @this {ChunkChute}
     * @returns {ChunkChute}
     */
    function push() {
      stack.push(arguments);
      return this;
    }

    /**
     * Execute item
     * @returns {Promise}
     */
    function pull() {
      if (resolved || rejected) {
        return Promise.resolve();
      }

      if (process) {
        return process;
      }

      if (stack[0]) {
        return exec();
      }

      if (!source) {
        stack.push([]);
        return pull();
      }

      if (source.resolved || source.rejected) {
        source.then(resolve, reject);
        return Promise.resolve();
      }

      process = source.pull().then(function () {
        process = null;
        return pull();
      }, reject);
      return process;
    }

    /**
     * Add pipe
     * @param {Function} callback
     * @returns {ChunkChute}
     */
    function pipe(callback) {
      var pipe = new ChunkChute(callback, chute);
      pipes.push(pipe);
      return pipe;
    }

    /**
     * Split the chunk chute
     * @param {Function} filter
     * @returns {ChunkChute}
     */
    function fork(filter) {
      return chute.pipe(function () {
        var args = Array.prototype.slice.call(arguments);
        if (filter.apply(null, args)) {
          this.push.apply(this, args);
        }
      });
    }

    /**
     * Extends object by chute functions
     * @param {Object} context
     */
    function extend(context) {
      var then = context.then;

      /**
       * Extend then to ensure the created promise does have the chute functions
       * @param {Function} [resolved]
       * @param {Function} [rejected]
       * @returns {Promise}
       */
      context.then = function (resolved, rejected) {
        var promise = then.call(context, resolved, rejected);
        return extend(promise);
      };

      context.push = push;
      context.pull = pull;
      context.pipe = pipe;
      context.fork = fork;

      Object.defineProperty(context, 'resolved', {
        get: function () {
          return resolved;
        },
        set: function () {
        },
        enumerable: true,
        configurable: false
      });
      Object.defineProperty(context, 'rejected', {
        get: function () {
          return rejected;
        },
        set: function () {
        },
        enumerable: true,
        configurable: false
      });

      return context;
    }

    /**
     * Ensure instance was created using new operator
     */
    if (!(this instanceof ChunkChute)) {
      return new ChunkChute(callback, source);
    }

    /**
     * Store context for nested usage
     * @type {ChunkChute}
     */
    chute = this;

    /**
     * Incoming stack
     * @type {Array}
     */
    stack = [];

    /**
     * Pipe stack
     * @type {ChunkChute[]}
     */
    pipes = [];

    /**
     * Represent final state by promise
     * @type {Promise}
     */
    promise = new Promise(function (res, rej) {
      resolve = res;
      reject = rej;
    });

    /**
     * Make promise status available
     */
    resolved = false;
    rejected = false;
    promise.then(function () {
      resolved = true;
    }, function () {
      rejected = true;
    });

    /**
     * Make chute thenable
     * @param {Function} [resolved]
     * @param {Function} [rejected]
     * @returns {Promise}
     */
    this.then = function (resolved, rejected) {
      return promise.then(resolved, rejected);
    };

    extend(this);
  }

  /**
   * Join multiple chunk chutes
   * @returns {ChunkChute}
   */
  ChunkChute.join = function () {
    var sources, chute;

    /**
     * Is chute finished?
     * @param {ChunkChute} chute
     * @returns {boolean}
     */
    function isDone(chute) {
      return chute.resolved || chute.rejected;
    }

    /**
     * Has chute failed?
     * @param {ChunkChute} chute
     * @returns {boolean}
     */
    function isFail(chute) {
      return chute.rejected;
    }

    /**
     * Is chute still active?
     * @param {ChunkChute} chute
     * @returns {boolean}
     */
    function isOpen(chute) {
      return !isDone(chute);
    }

    /**
     * Pull from chute
     * @param {ChunkChute} chute
     * @returns {Promise}
     */
    function pull(chute) {
      return chute.pull();
    }

    /**
     * Every argument is a chute
     * @type {ChunkChute[]}
     */
    sources = Array.prototype.slice.call(arguments);

    /**
     * Join chutes
     * @type {ChunkChute}
     */
    chute = new ChunkChute(function () {
      this.push.apply(this, arguments);
    }, new ChunkChute(function () {
      if (sources.every(isDone) || sources.some(isFail)) {
        return Promise.all(sources).then(this.resolve, this.reject);
      } else {
        return Promise.race(sources.filter(isOpen).map(pull));
      }
    }));

    /**
     * Forward push
     */
    sources = sources.map(function (source) {
      return source.pipe(function () {
        chute.push.apply(chute, arguments);
      });
    });

    return chute;
  };

  return ChunkChute;
});