const setStorage = async (key: string, value: any) => {
    await localStorage.setItem(key, JSON.stringify(value));
}

const getStorage = async(key: string) => {
    const item = await localStorage.getItem(key)
    return item ? JSON.parse(item as string) : null;
}

export {
    setStorage,
    getStorage
}