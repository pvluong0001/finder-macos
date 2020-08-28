export default (function() {
  let container;
  let options = {};
  let loadingElement;
  let loading = false;
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

    /** init loading element */
    loadingElement = document.getElementById('finder-loader');

    /** create detail element */
    options = {
      ...baseConfig,
      ...initOptions,
    };
  };

  const setBaseData = function(data) {
    if (!data || !data.length) {
      __createNoData();

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
      if (
          (index === 0 && cellIndex === 0) ||
          (options.recursiveAll && cellIndex === 0 && item.type !== 'file')
      ) {
        cell.classList.add('active')
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

  function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  function __createCell(data, index) {
    const { children, syncData = false, type, suffix} = data;
    let label = data.label || '';
    const node = document.createElement('div');
    node.classList.add('finder-cell-item');

    if(
        (options.highlightFile && type === 'file') ||
        (options.highlightFolder && type === 'folder')
    ) {
      if(options.keyword) {
        // const regex = new RegExp(options.keyword, "ig");
        // label = label.replace(regex, `<span class="${options.highlightClass || 'finder-highlight'}">${options.keyword}</span>`)
      }
    }
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
      /** disable event click */
      node.style.pointerEvents = 'none';

      /** remove old active element */
      const currentActiveElement = node.parentNode.querySelector('.active');
      if (currentActiveElement) {
        currentActiveElement.classList.remove('active');
      }

      /** add active class */
      if (!node.classList.contains('active')) {
        node.classList.add('active');
      }

      /** add children */
      if (options.hasOwnProperty('handleItemClick')) {
        if (syncData) {
          if(loading) {
            return alert('Dang loading nhe');
          }
          loading = true;
          loadingElement.style.display = 'block';
          options.handleItemClick(data).then((data) => {
            /** remove right column from target column */
            const columns = Array.from(container.children);
            const targetIndex = columns.indexOf(node.parentNode);
            columns.forEach((element, elementIndex) => {
              if (elementIndex > targetIndex) {
                element.remove();
              }
            });

            __recursiveTree(data, true, false, ++index);
          }).catch(() => {
            /** remove right column from target column */
            const columns = Array.from(container.children);
            const targetIndex = columns.indexOf(node.parentNode);
            columns.forEach((element, elementIndex) => {
              if (elementIndex > targetIndex) {
                element.remove();
              }
            });
          }).finally(() => {
            /** enable event click */
            node.style.pointerEvents = 'auto';
            loading = false;
            loadingElement.style.display = 'none';
          });
        } else {
          /** remove right column from target column */
          const columns = Array.from(container.children);
          const targetIndex = columns.indexOf(node.parentNode);
          columns.forEach((element, elementIndex) => {
            if (elementIndex > targetIndex) {
              element.remove();
            }
          });

          if(data.options || type === 'file') {
            options.handleItemClick(data).finally(() => {
              node.style.pointerEvents = 'auto';
            })
          }
          if(data.children && data.children.length) {
            __recursiveTree(children, true, false, ++index);
            try {
              if(isFunction(options.handleItemClick)) {
                options.handleItemClick(data).finally(() => {
                  node.style.pointerEvents = 'auto';
                })
              }
            } catch (e) {
              /** enable event click */
              node.style.pointerEvents = 'auto';
            }
          }
        }

        // options.handleItemClick()
        // __recursiveTree(children, true, false, ++index)
      } else {
        if (children && children.length) {
          __recursiveTree(children, true, false, ++index);
        }

        /** enable event click */
        node.style.pointerEvents = 'auto';
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

  function __createNoData(message = null) {
    /** */
    if(message && message.nodeType === Node.ELEMENT_NODE) {
      container.appendChild(message);
    } else {
      const div = document.createElement('div');
      div.style.padding = '10px';
      div.innerText = message;

      container.appendChild(div)
    }
  }

  /** rerender with own custom */
  function reRender(data, customOptions = {}) {
    const {
      noData = 'No data specific!',
      highlightFile = true,
      highlightFolder = false,
      keyword = ''
    } = customOptions;

    container.innerHTML = '';

    if(!data || data.length === 0) {
      __createNoData(noData);
    } else {
      options = {
        ...options,
        recursiveAll: true,
        highlightFile,
        highlightFolder,
        keyword
      };
      setBaseData(data, true, true)
    }

    options.recursiveAll = false;
  }

  return {
    init,
    setBaseData,
    reRender
  };
}());