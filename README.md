# Lit Finder Macos

Make finder like MacOS

# Installation

`npm i lit-finder --save`

# Usage

##### html
```html
<div id="finder"></div>
```

##### javascript
```javascript
import finder from 'lit-finder';

// init finder
finder.init(document.getElementById('finder'), options);
finder.setBaseData([
  {
    label: 'Parent 01',
    children: [
      {
        label: 'Parent 01 - Children'
      }
    ]
  },
  {
    label: 'Parent 02',
    children: [
      {
        label: 'Parent 02 - Children'
      },
      {
        label: 'Parent 02 - Children 02'
      }
    ]
  }
])
```

##### css
```scss
// if vuejs
<style lang="scss">
  @import "lit-finder/src/finder.scss";
  or
  @import "lit-finder/dist/finder.css";
</style>
```

# Options
##### Usage
| Key             | Type     | Default value |                                                         |
|-----------------|----------|---------------|---------------------------------------------------------|
| recursiveAll    | Boolean  | false         | Expand all nodes.                                       |
| suffixClass     | String   | ''            | Class of suffix content(When node have suffix options). |
| handleItemClick | Function | null          | Handle event when click into node                       |
| containerClass  | String   | ''            | Extra class of finder container                         |

##### handleItemClick example
```javascript
async handleItemClick(nodeData) {
  return Promise.resolve([
    {
      label: 'New node 01'
    },
    {
      label: 'New node 02'
    }
  ])
},
```

# Node options
##### Usage
| Key      | Type    | Default value |                                                          |
|----------|---------|---------------|----------------------------------------------------------|
| label    | String  | required      | Name of node                                             |
| type     | String  | require       | folder|file: show node with type file or folder and css |
| children | Array   | []            | Children node                                            |
| suffix   | String  | ''            | suffix content                                           |
| syncData | Boolean | false         | if true: define handleItemClick function to handle       |

##### Example
```javascript
{
  label: 'Name of node',
  type: 'folder',
  children: [],
  options: {},
  suffix: 'Content of suffix',
  syncData: true
}
```
