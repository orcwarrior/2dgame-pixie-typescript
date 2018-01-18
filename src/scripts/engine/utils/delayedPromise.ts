export async function  delayedPromise(delayMs: number, callback: Function): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(callback());
        }, delayMs);
    });

}
