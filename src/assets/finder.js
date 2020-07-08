export default (function() {
  let container;
  let options = {};
  const baseConfig = {
    recursiveAll: false,
    suffixClass: '',
    columnWidth: '250px',
  };
  const init = function(element, initOptions = {}) {
    /** create list container */
    container = element;
    container.classList.add('finder-container');
    if (initOptions.containerClass) {
      container.classList.add(initOptions.containerClass);
    }

    /** create detail element */

    options = {
      ...baseConfig,
      ...initOptions,
    };
  };

  const setBaseData = function(data) {
    if (!data || !data.length) {
      throw new Error('Data invalid');
    }

    __recursiveTree(data, true, true);
  };

  function __recursiveTree(
    data, isVisible = false, recursiveAll = false, index = 0) {
    const uuid = uuidv4();
    const column = __createColumn(uuid, isVisible);
    // finderTreeItem[index] = data;

    data.forEach((item, cellIndex) => {
      const cell = __createCell(item, index);
      if (index === 0 && cellIndex === 0) {
        cell.classList.add('active');
      }
      column.appendChild(cell);
    });

    container.appendChild(column);
    /** auto scroll right when add new column */
    container.scrollLeft += 1000;

    /** check if first parent have children */
    if (recursiveAll && data[0].hasOwnProperty('children') &&
      data[0].children.length) {
      __recursiveTree(data[0].children, true, options.recursiveAll, ++index);
    }
  }

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(
        16),
    );
  }

  function __createCell(data, index) {
    const {label, children, syncData = false, type, suffix} = data;
    const node = document.createElement('div');
    node.classList.add('finder-cell-item');
    let content = `<div>${label}</div>`;

    if (suffix) {
      content += `<span class="${options.suffixClass}">${suffix}</span>`;
    }
    if (type === 'folder') {
      node.className += ' folder las la-folder';
      content += '<span class="arrow"></span>';
    } else {
      node.className += ' folder las la-file';
    }

    node.innerHTML = content;

    /** add event listener */
    node.addEventListener('click', () => {
      /** remove old active element */
      const currentActiveElement = node.parentNode.querySelector('.active');
      if (currentActiveElement) {
        currentActiveElement.classList.remove('active');
      }

      /** add active class */
      if (!node.classList.contains('active')) {
        node.classList.add('active');
      }

      /** remove right column from target column */
      const columns = Array.from(container.children);
      const targetIndex = columns.indexOf(node.parentNode);
      columns.forEach((element, elementIndex) => {
        if (elementIndex > targetIndex) {
          element.remove();
        }
      });

      /** add children */
      if (options.hasOwnProperty('handleItemClick')) {
        if (syncData) {
          options.handleItemClick(data).then((data) => {
            __recursiveTree(data, true, false, ++index);
          });
        } else {
          if(data.options) {
            options.handleItemClick(data)
          }
          if(data.children && data.children.length) {
            __recursiveTree(children, true, false, ++index);
          }
        }

        // options.handleItemClick()
        // __recursiveTree(children, true, false, ++index)
      } else {
        if (children && children.length) {
          __recursiveTree(children, true, false, ++index);
        }
      }
    });

    return node;
  }

  function __createColumn(id, visible = false) {
    var node = document.createElement('div');
    node.id = id;
    node.style.width = options.columnWidth;
    node.style.minWidth = options.columnWidth;
    node.classList.add('finder-column');
    if (!visible) {
      node.classList.add('finder-column-hidden');
    }
    node.style.borderRight = '1px dotted #c2c2c2';

    return node;
  }

  return {
    init,
    setBaseData,
  };
}());