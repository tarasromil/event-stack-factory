/**
 * @desc Factory of stack handler for global events
 * @function
 * @param {boolean|object} args - See detailed about options:
 * @link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * @returns {{push: (function(Object)), pop: (function()), stack: {Array}}}
 */
const eventStackFactory = (...args) => {
  /**
   * @desc Contains all EventListeners
   * @protected
   * @type {Array}
   */
  let stack = [];


  /**
   * @desc Adds or removes EventListeners into window Element
   * @function
   * @private
   * @param {function} action - "addEventListener" OR "removeEventListener" function
   * @param {object} events - List of events and handlers. E.g. {{ click: function(event) }}
   */
  const handleEvents = (action, events) => {
    Object.entries(events).forEach(([type, handler]) => {
      action(type, handler, ...args);
    });
  };


  /**
   * @function
   * @private
   * @returns {object} Last element of stack
   * */
  const getLast = () => stack[stack.length - 1];


  /**
   * @function
   * @private
   * @returns {boolean} Stack is not empty
   */
  const isNotEmpty = () => stack.length > 0;

  /**
   * @desc Pushes new events to stack and handles global EventListeners
   * @function
   * @public
   * @example
   * push({ click: () => { do something } })
   * @param {object} nextEvents - List of Events
   */
  const push = (nextEvents) => {
    if (isNotEmpty()) {
      const prevEvents = getLast();
      handleEvents(window.removeEventListener, prevEvents);
    }

    stack = stack.concat(nextEvents);

    handleEvents(window.addEventListener, nextEvents);
  };


  /**
   * @desc Pops last events from stack and handles global EventListeners
   * @function
   * @public
   * @example
   * pop()
   * */
  const pop = () => {
    if (isNotEmpty()) {
      const prevEvents = getLast();
      handleEvents(window.removeEventListener, prevEvents);

      stack = stack.slice(0, -1);

      if (isNotEmpty()) {
        const nextEvents = getLast();
        handleEvents(window.addEventListener, nextEvents);
      }
    }
  };


  return {
    push,
    pop,
    get stack() {
      return stack;
    },
  };
};


export { eventStackFactory };
