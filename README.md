# walkthrough-js
------------------------------

## A javascript library for easy walkthrough and site tour / tutorial / step-by-step / how-to / guide

[full documentation and demo](https://ranbuch.github.io/walkthrough-js/)


### Installation

```sh
$ cd your-project
$ npm install walkthrough-js --save
```

### Usage

include script:
```javascript
<script type="text/javascript" src="node_modules/walkthrough-js/dist/walkthrough.bundle.js"></script>
```
or use ES6 (ESNext):
```javascript
import { Walkthrough } from "walkthrough-js/dist/walkthrough";
import { TutorialStage } from 'walkthrough-js/dist/interface';
```

initialize component:
```javascript
const wt = new Walkthrough();
let steps = [] as Array<TutorialStage>;
// define steps . . .
steps.push({
    title: 'Title:',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry . . .',
    selector: '#Example'
});
// start the tour
wt.setTutorial(steps);
```

### Options
```javascript
import { TutorialOptions } from 'walkthrough-js/dist/interface';

let options = new TutorialOptions();
options.identifier: 'my_page';
options.maxIdentifier = 2;

wt.setTutorial(steps, options);
```