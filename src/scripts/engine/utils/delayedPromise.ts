export async function delayedPromise(delayMs: number, callback: Function, bind?: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (bind) {
                resolve(callback.bind(bind)());
            } else {
                resolve(callback());
            }
        }, delayMs);
    });

}
