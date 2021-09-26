const filter = document.querySelector('form.filter');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let inputs  = Array.from(filter.querySelectorAll('input'));
let sort = document.querySelector('select#sort');

const pages  = document.querySelectorAll('.pagination a');


const searchResultsPage = '/results.html';

const urlEntries =  Array.from(urlParams.entries());


if (urlEntries.length > 0) {
    urlEntries.forEach(entry => {
        if (entry.includes('sort')) {
            setSort(entry);
        } else {
            setItem(entry);
        }
    })
}


if (sort) {
    //INPUTS listeners
    getSort(sort);
    sort.addEventListener('change', (e) => {
        getSort(e.target);
    })
}


if (filter) {
    //INPUTS listeners
    if(inputs.length > 0) {
        inputs.forEach(input => {
            if ((isCheckbox(input) && input.checked) || (!isCheckbox(input) && input.value !== '')) {
                getParamsFromFilter(input);
            }
            input.addEventListener('change', (e) => {
                const input = e.target;
                getParamsFromFilter(input);
            })
        })
    }
}

if (pages.length > 0) {
    pages.forEach(page => {
        if (page.dataset.value === 'paggi-one') {
            urlParams.delete('page');
            page.href = `${page.href}${decodeURI(urlParams.toString())}`;
        } else {
            urlParams.delete('page');
            page.href = `${page.href}&${decodeURI(urlParams.toString())}`;
        }
    })
}

function setItem (entry) {
    const paramName = entry[0];
    const paramValues = entry[1].split('|');
    const currentInputs = inputs.filter(input => input.name === paramName);
    paramValues.forEach((value, index) => {
        if (currentInputs.filter(input => isCheckbox(input)).length > 0) {
            const fitInput = currentInputs.filter(input => input.value === value);
            fitInput[0].checked = 'checked';
        } else if (currentInputs.filter(input => isTextNumber(input)).length > 0) {
            currentInputs[index].value = value;
        }
    })
}

function isCheckbox(input) {
    return input.type === 'checkbox' || input.type === 'radio';
}

function isTextNumber(input) {
    return input.type === 'text' || input.type === 'number';
}

function setSort (entry) {
    const option = sort.querySelector(`option[value="${entry[1]}"]`);
    option.setAttribute('selected', 'selected');
}

function getSort (input) {
    if (!urlParams.has('sort')) {
        urlParams.set(input.name, input.value);
        window.location.search = decodeURI(urlParams.toString());
    }
    if (input.value !== urlParams.get(input.name)) {
        urlParams.set(input.name, input.value);
        window.location.search = decodeURI(urlParams.toString());
    }
}


function getParamsFromFilter(input) {
    if (urlParams.has(input.name)) {
        const ParamsCollections = inputs.filter(inp => inp.name === input.name && ((isCheckbox(input)) ? inp.checked : inp.value !== ''))
            .reduce((acc,inp) => {
                acc.push(inp.value);
                return acc;
            },[])
            .join('|');

        if (!ParamsCollections) {
            urlParams.delete(input.name);
            //window.location.search = decodeURI(urlParams.toString());
        } else if (urlParams.get(input.name) !== ParamsCollections) {
            urlParams.set(input.name, ParamsCollections);
            //window.location.search = decodeURI(urlParams.toString());
        }

    } else {
        const ParamsCollections = inputs.filter(inp => inp.name === input.name && ((isCheckbox(input)) ? inp.checked : inp.value !== ''))
            .reduce((acc,inp) => {
                acc.push(inp.value);
                return acc;
            },[])
            .join('|');

        if (urlParams.get(input.name) !== ParamsCollections ) {
            urlParams.append(input.name, ParamsCollections);
            //window.location.search = decodeURI(urlParams.toString());
        }

    }
}

function formData()  {
    window.location.replace(`${searchResultsPage}?${decodeURI(urlParams.toString())}`);
}


export default formData;