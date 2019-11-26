export default function (func) {
    let load = false;
    return function () {
        let args = arguments;
        if(!load) {
            load = true;
            return new Promise((resolve, reject) => {
                func.apply(this, args)
                    .then(resp => {
                        load = false;
                        resolve(resp);
                    })
                    .catch(e => {
                        load = false;
                        reject(e);
                    })
            })
        } else {
            console.log(`Request ${func.name} don't send`)
        }
    }
}