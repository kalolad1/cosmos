const localStorageMock = (function () {
    let store = {};
    return {
        getItem: function (key) {
            if (!Object.prototype.hasOwnProperty.call(store, key)) {
                return null;
            }
            return store[key];
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key) {
            delete store[key];
        },
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
