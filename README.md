# event-stack-factory
#### Utility for handling global Event Listeners which attached to window

##### How to use:

###### Initializing Event Stack

```js
import { eventStackFactory } from 'event-stack-factory';

const EventStack = eventStackFactory(options); // *
```
See detailed about [options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) * 


###### Pushing new listener to stack
This operation adds new listener to Event Emitter and deletes previous, if exists
```js
const eventListener = event => console.log(event.target.value);

EventStack.push({
  click: eventListener,
  keydown: eventListener,
}) // etc.

```

###### Removing listener from stack
This operation deletes latest listener from Event Emitter and sets previous, if exists
```js
EventStack.pop();

```

If Stack is not empty will fires only last added Event Listener.
Useful for "Escape" keydown or "Click" for several opened modal.