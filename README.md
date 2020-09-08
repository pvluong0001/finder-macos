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
| Key         | Type          | Default value |                                                         |
|-------------|---------------|---------------|---------------------------------------------------------|
| label       | String        | required      | Name of node                                            |
| type        | String        | require       | folder,file: show node with type file or folder and css |
| children    | Array         | []            | Children node                                           |
| suffix      | String,Number | ''            | suffix content                                          |
| syncData    | Boolean       | false         | if true: define handleItemClick function to handle      |
| suffixClass | String        | ''            | style for suffix content                                |

### Init options
| Key             | Type     | Default value |                                                         |
|-----------------|----------|---------------|---------------------------------------------------------|
| recursiveAll    | Boolean  | false         | Expand all nodes.                                       |
| suffixClass     | String   | ''            | Class of suffix content(When node have suffix options). |
| handleItemClick | Function | null          | Handle event when click into node                       |
| containerClass  | String   | ''            | Extra class of finder container                         |
| wrapperClass    | String   | ''            | Custom wrapper class                                    |

### Actions
##### Rerender
```vue
<template>
    <finder
        ...
        ref="finder"
    >
    
    </finder>
</template>

<script>
export default {
    // ...,
    data: () => ({
        keyword: ''
    }),
    methods: {
        someHandle() {
            // call something to get data
            const data = [
                {
                    label: 'Parent 01',
                    type: 'folder',
                    children: [
                        {label: 'Parent 01 - Child 1', syncData: true, type: 'folder'},
                        {label: 'Parent 01 - Child 2', type: 'file'},
                    ],
                    suffix: 10
                }
            ]
    
            /** render with keyword */
            this.$refs.finder.reRender(data, {
                keyword: this.keyword,
                noData: 'No data specific' // you can use node element instead string
                // highlightFile: true,
                // highlightFolder: false,
            })
        }
    }
}
</script>
```

- Rerender options:

| Key            | Type                 | Default value       | Explain                                                     |
|----------------|----------------------|---------------------|-------------------------------------------------------------|
| keyword        | String               | ''                  | highlight name file or folder match which match keyword     |
| noData         | String, Node Element | 'No data specific!' | Show message no data when the finder have no data           |
| highlightFile  | Boolean              | true                | default highlight word inside file name which match keyword |
| highlighFolder | Boolean              | false               | highlight folder name like the way highlightFile works      |