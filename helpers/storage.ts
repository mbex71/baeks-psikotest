const setStorage =  (key: string, value: any) => {
    if(typeof window !== 'undefined'){

        window.localStorage.setItem(key, JSON.stringify(value));
    }
    
}

const getStorage = (key: string) => {
    if(typeof window !== 'undefined'){

        const item =  window.localStorage.getItem(key)
        return item ? JSON.parse(item as string) : null;
    }
    
    
}

export {
    setStorage,
    getStorage
}