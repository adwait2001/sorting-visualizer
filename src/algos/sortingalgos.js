export function getmergesortanimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxillaryarray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxillaryarray, animations);
    return animations;
}

function mergeSortHelper(
    mainarray,
    startidx,
    endidx,
    auxillaryarray,
    animations
) {
    if (startidx === endidx) return;
    const middleidx = Math.floor((startidx + endidx) / 2)
    mergeSortHelper(auxillaryarray, startidx, middleidx, mainarray, animations)
    mergeSortHelper(auxillaryarray, middleidx + 1, endidx, mainarray, animations)
    domerge(mainarray, startidx, middleidx, endidx, auxillaryarray, animations)
}

function domerge(
    mainarray,
    startidx,
    middleidx,
    endidx,
    auxillaryarray,
    animations
) {
    let k = startidx;
    let i = startidx;
    let j = middleidx + 1;
    while (i <= middleidx && j <= endidx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxillaryarray[i] <= auxillaryarray[j]) {
            animations.push([k, auxillaryarray[i]])
            mainarray[k++] = auxillaryarray[i++]
        }
        else {
            animations.push([k, auxillaryarray[j]])
            mainarray[k++] = auxillaryarray[j++]
        }
    }
    while (i <= middleidx) {
        animations.push([i, i])
        animations.push([i, i])
        animations.push([k, auxillaryarray[i]])
        mainarray[k++] = auxillaryarray[i++]
    }
    while (j <= endidx) {
        animations.push([j, j])
        animations.push([j, j])
        animations.push([k, auxillaryarray[j]])
        mainarray[k++] = auxillaryarray[j++]
    }

}

function swap(auxillaryArray, firstIndex, secondIndex) {
    let temp = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temp;
}

export function bubbleSortAnimations(array) {
    let animations = [];
    let auxillaryarray = array.slice(0)
    bubblesort(auxillaryarray, animations);
    array = auxillaryarray
    return [animations, array];

}

function bubblesort(auxillaryarray, animations) {
    const N = auxillaryarray.length;
    let iters = N - 1;
    while (iters > 0) {
        let swapped = false;
        for (let i = 0; i < iters; i++) {
            animations.push(['animation1', i, i + 1])
            animations.push(['animation2', i, i + 1])
            if (auxillaryarray[i] > auxillaryarray[i + 1]) {
                swapped = true;
                animations.push(['swap', i, auxillaryarray[i + 1]])
                animations.push(['swap', i + 1, auxillaryarray[i]])
                swap(auxillaryarray, i, i + 1)
            }
        }
        if (swapped === false) {
            break;
        }
        iters--;
    }

}


export function getselectionsortanimations(array) {
    let animations = [];
    let auxillaryarray = array.slice(0)
    selectionsort(auxillaryarray, animations);
    array = auxillaryarray
    return [animations, array];

}

function selectionsort(auxillaryarray, animations) {
    const N = auxillaryarray.length;
    for (let i = 0; i < N - 1; i++) {
        let minindex = i;
        for (let j = i + 1; j < N; j++) {
            animations.push(['animation1', j, minindex])
            animations.push(['animation2', j, minindex])
            if (auxillaryarray[j] < auxillaryarray[minindex]) {
                minindex = j;
            }
        }
        animations.push(['swap', minindex, auxillaryarray[i]])
        animations.push(['swap', i, auxillaryarray[minindex]])
        swap(auxillaryarray, minindex, i);
    }

}

export function getinsertionsortanimations(array) {
    let animations = [];
    let auxillaryarray = array.slice(0)
    insertionsort(auxillaryarray, animations);
    array = auxillaryarray
    return [animations, array];
}

function insertionsort(auxillaryArray, animations) {
    const N = auxillaryArray.length;
    for (let i = 1; i < N; i++) {
        let key = auxillaryArray[i];
        let j = i - 1
        animations.push(['animation1', j, i])
        animations.push(['animation2', j, i])
        while (j >= 0 && auxillaryArray[j] > key) {
            animations.push(['overwrite', j + 1, auxillaryArray[j]])
            auxillaryArray[j + 1] = auxillaryArray[j];
            j = j - 1;
            if (j >= 0) {
                animations.push(["animation1", j, i]);
                animations.push(["animation2", j, i]);
            }
        }
        animations.push(['overwrite',j+1,key])
        auxillaryArray[j+1]=key;
    }
}
