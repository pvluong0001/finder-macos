# Finder MacOS by Lit

### Installation

`npm install lit-finder`

### Example

```vue
<template>
    <div>
        <finder
            :tree="tree"
            :handleItemClick="handleItemClick"
        >
            <template v-slot:finder-file-detail="{data}">
                {{data.label}}
            </template>
        </finder>
    </div>
</template>

<script>
import Finder from 'lit-finder';

export default {
    components: {Finder},
    data: () => ({
        tree: [
            {
                label: 'Parent 01',
                type: 'folder',
                children: [
                    {label: 'Parent 01 - Child 1', syncData: true, type: 'folder'},
                    {label: 'Parent 01 - Child 2', type: 'file'},
                ],
                suffix: 10
            },
            {
                label: 'Parent 02',
                type: 'folder',
                children: [
                    {label: 'Parent 01 - Child 1', type: 'file'},
                    {label: 'Parent 01 - Child 2', type: 'file'},
                ]
            },
        ]
    }),
    methods: {
        async handleItemClick(nodeData) {
            // do something, return Promise
            return Promise.resolve([
                {
                    label: 'New node 01'
                },
                {
                    label: 'New node 02'
                }
            ])
        }
    }
}
</script>
```

### Props
| Name            | Type     | Default |                                    |
|-----------------|----------|---------|------------------------------------|
| tree            | Array    | []      | Base data of finder. Array of node |
| handleItemClick | Function | null    | Handle event when click on node    |
| options         | Object   | {}      | Init finder options(detail below)  |

### Node properties
| Key      | Type         | Default value |                                                          |
|----------|---------     |---------------|----------------------------------------------------------|
| label    | String       | required      | Name of node                                             |
| type     | String       | require       | folder|file: show node with type file or folder and css |
| children | Array        | []            | Children node                                            |
| suffix   | String,Number| ''            | suffix content                                           |
| syncData | Boolean      | false         | if true: define handleItemClick function to handle       |

### Init options
| Key             | Type     | Default value |                                                         |
|-----------------|----------|---------------|---------------------------------------------------------|
| recursiveAll    | Boolean  | false         | Expand all nodes.                                       |
| suffixClass     | String   | ''            | Class of suffix content(When node have suffix options). |
| handleItemClick | Function | null          | Handle event when click into node                       |
| containerClass  | String   | ''            | Extra class of finder container                         |