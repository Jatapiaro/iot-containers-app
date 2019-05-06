import AsyncStorage from '@react-native-community/async-storage';

export default class AsyncStorageService {

    constructor() {}

    /**
     * Store data
     */
    store(key, data) {
        data = JSON.stringify(data);
        return AsyncStorage.setItem(key, data)
            .then((res) => {
                console.log("Data was stored: ", data);
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    fetch(key) {
        return AsyncStorage.getItem(key)
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    remove(key) {
        return AsyncStorage.removeItem(key)
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            });        
    }

}