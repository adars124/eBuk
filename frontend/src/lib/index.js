const setInStorage = (key, value, remember = false) => remember ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value)

const fromStorage = key => localStorage.getItem(key) || sessionStorage.getItem(key)

const clearStorage = key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
};

const setInForm = (ev, state, setState) => {
    const { name, value } = ev.target;

    setState({
        ...state,
        [name]: value,
    });
};

export { setInStorage, fromStorage, clearStorage, setInForm };