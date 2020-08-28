import React from 'react';
import './sortingvisualizer.css'
import { getmergesortanimations, getselectionsortanimations, bubbleSortAnimations,getinsertionsortanimations } from '../algos/sortingalgos.js'

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 400));
        }
        this.setState({ array })
    }

    mergeSort() {
        const animations = getmergesortanimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arraybars = document.getElementsByClassName('array-bar')
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barone, bartwo] = animations[i];
                const baroneStyle = arraybars[barone].style
                const bartwoStyle = arraybars[bartwo].style
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    baroneStyle.backgroundColor = color;
                    bartwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barone, height] = animations[i]
                    const baroneStyle = arraybars[barone].style
                    baroneStyle.height = `${height}px`;
                }, i * ANIMATION_SPEED_MS);
            }

        }

    }

    bubbleSort() {
        const [animations, Sortarray] = bubbleSortAnimations(this.state.array)
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === 'animation1' || animations[i][0] === 'animation2';
            const arraybars = document.getElementsByClassName('array-bar')
            if (isColorChange === true) {
                const color = (animations[i][0] === "animation1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparison, idx1, idx2] = animations[i];
                const baronestyle = arraybars[idx1].style
                const bartwoStyle = arraybars[idx2].style
                setTimeout(() => {
                    baronestyle.backgroundColor = color;
                    bartwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, idx1, height] = animations[i];
                if (idx1 === -1) {
                    continue;
                }
                const barstyle = arraybars[idx1].style;
                setTimeout(() => {
                    barstyle.height = `${height}px`
                }, i * ANIMATION_SPEED_MS);
            }

        }
    }

    selectionsort() {
        const [animations, Sortarray] = getselectionsortanimations(this.state.array)
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === 'animation1' || animations[i][0] === 'animation2';
            const arraybars = document.getElementsByClassName('array-bar')
            if (isColorChange === true) {
                const color = (animations[i][0] === "animation1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [comparison, idx1, idx2] = animations[i];
                const baronestyle = arraybars[idx1].style
                const bartwoStyle = arraybars[idx2].style
                setTimeout(() => {
                    baronestyle.backgroundColor = color;
                    bartwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [swap, idx1, height] = animations[i];
                if (idx1 === -1) {
                    continue;
                }
                const barstyle = arraybars[idx1].style;
                setTimeout(() => {
                    barstyle.height = `${height}px`
                }, i * ANIMATION_SPEED_MS);
            }

        }
    }

    insertionsort() {
        const [animations, Sortarray] = getinsertionsortanimations(this.state.array)
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === 'animation1') || (animations[i][0] === 'animation2');
            const arraybars = document.getElementsByClassName('array-bar')
            if (isColorChange === true) {
                const color = (animations[i][0] === "animation1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, idx1, idx2] = animations[i];
                const baronestyle = arraybars[idx1].style
                const bartwoStyle = arraybars[idx2].style
                setTimeout(() => {
                    baronestyle.backgroundColor = color;
                    bartwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, idx1, height] = animations[i];
                const barstyle = arraybars[idx1].style;
                setTimeout(() => {
                    barstyle.height = `${height}px`
                }, i * ANIMATION_SPEED_MS);
            }

        }
    }


    render() {
        const { array } = this.state;
        return (
            <div>
                <h1>SORTING VISUALIZER</h1>

                <div className="header">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.selectionsort()}>Selection Sort</button>
                    <button onClick={() => this.insertionsort()}>Insertion Sort</button>

                </div>

                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                            }}></div>
                    ))}
                </div>
            </div>
        )
    }

}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}