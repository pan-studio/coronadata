import React from 'react';
import './automata.css';
import Cell from './Cell';
import { WIDTH, HEIGHT, CELL_SIZE } from './constants';


//gli individui possono essere sani, positivi, ricoverati o isolati (in quarantena)
//inoltre, sono suddivisi per eta' (giovani, adulti, anziani) e possono avere o meno
//altre malattie in corso. in questo modo e' possibile calcolare la percentuale
//di morte in caso di contagio (ad esempio sappiamo che i giovani hanno una percentuale di morte
//pressocche' nulla rispetto agli anziani, e chi e' malato ha una percentuale di morte maggiore
//rispetto a una persona sana)
//in italia abbiamo la seguente situazione (fonte istat 2019)
// giovani (0-14):7.962.215	
//adulti(14-65): 38.613.751	
//anziani(65+): 13.783.580	
//totale: 60.359.546
//formula percentagee: valoreFinale-valoreIniziale/valoreFinale
const EMPTY = 'EMPTY'
const SANE = 'SANE';
const POSITIVE = 'POSITIVE';
const RECOVERED = 'RECOVERED';
const OTHERSICK = "OTHERSICK";
const DIE = 'DIE';
const HEALTH = 'HEALTH';
const YOUNG = 'YOUNG';
const ADULT = 'ADULT';
const OLD = 'OLD';
const WARNING = 'WARNING';
const ISOLATED = false;
const PROPABILITY_TO_DIE = 0;
const PERCENTAGE_OF_OTHER_SICK = 0;
const PERCENTAGE_OF_YOUNG = 14;
const PERCENTAGE_OF_ADULT = 64;
const PERCENTAGE_OF_OLD = 22;
const PERCENTAGE_OF_ISOLATED = 0;
const PERCENTAGE_OF_PEOPLE_WITH_CORONA = 0;
const CHANCE_TO_MOVE = 0.5;
const DIRECTIONS = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];


//RULES:
//Recovered cannot move
//se un individuo sano si trova nel range di un positivo o ricoverato, allora si ammala
//le celle si spostano casualmente in una delle direzioni del vicinato
//il virus in un indiviudo contagiato resta 'in vita' sempre, fino a quando l individuo non muore
//l' individuo sana in due casi: se da positivo entra in una cella con stato quarantena 
//dopo 30 iterazioni sana (1 mese)
//se ricoverato, dopo 20 iterazioni sana
//se positivo, ha una probabilita' del dieci per cento di morire nel giro di 15 giorni
//



class Automata extends React.Component {

    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.makeEmptyBoard();

    }


    state = {
        cells: [],
        isRunning: false,
        interval: 100,
        initialPercentage: 0,
        firstIteration: true,
        totalStartingPeople: 0,
        numberOfPositive: 0,
        iterationDays: [0],
        iterationPositive: [0],
        peopleRecovered: [],
        peopleDie: [],
    };



    makeEmptyBoard = () => {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = {};
                board[y][x].free = true;

            }
        }

        return board;
    }


    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }


    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    evaluateNumberOfPeopleBasedOnPercentage(percentageValue, totalValue) {
        return (percentageValue / 100) * totalValue;
    }


    shuffleFisherYates(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    generateRandomWhoMoveFirst(stopindex) {
        var position = []
        for (var i = 0; i < stopindex; i++)
            position[i] = i;

        return this.shuffleFisherYates(position);
    }

    runIteration() {
        let newBoard = this.makeEmptyBoard();
        var tmpCells = this.state.cells;
        var numberOfPositive = this.state.numberOfPositive;

        var arrX = this.generateRandomWhoMoveFirst(this.rows);
        var arrY = this.generateRandomWhoMoveFirst(this.cols);

        for (let r = 0; r < arrY.length; r++) {
            for (let c = 0; c < arrX.length; c++) {

                var x = arrX[r];
                var y = arrY[c];
                var moved = false;
                //check in a random way where the people can move
                //in a free position on the board
                let neighbors = this.calculateNeighbors(newBoard, x, y);
                //update the newboard
                let seeds = Math.floor(Math.random() * DIRECTIONS.length);
                //if there is a people inside the cell
                if (this.board[y][x].free == false) {
                    var tmp = tmpCells[y + "_" + x];
                    tmp.x = x;
                    tmp.y = y;

                    let dir = DIRECTIONS[seeds];
                    let y1 = y + dir[0];
                    let x1 = x + dir[1];
                    if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && newBoard[y1][x1].free == true && this.board[y1][x1].free == true) {
                        newBoard[y][x].free = true;
                        newBoard[y1][x1].free = false;
                        delete tmpCells[y + "_" + x];
                        if (neighbors.withCorona) {
                            if (tmp.status.hasCorona == false) {
                                tmp.status.hasCorona = true;
                                tmp.status.condition = POSITIVE;
                            }
                        }
                        tmp.x = x1;
                        tmp.y = y1;
                        tmpCells[y1 + "_" + x1] = tmp;
                        moved = true;
                    }
                    if (moved == false) {
                        newBoard[y][x].free = false;
                        tmpCells[y + "_" + x] = tmp;
                    }
                }
            }
        }

        this.board = newBoard;
        var days = this.state.iterationDays;
        days.push(days[days.length - 1] + 1);
        var newPositive = this.state.iterationPositive;
        newPositive.push(this.state.numberOfPositive);

        this.setState({ cells: tmpCells });
        this.setState({ numberOfPositive: numberOfPositive });
        this.setState({ iterationDays: days })
        this.setState({ iterationPositive: newPositive });
        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }





    /**
     * Calculate the number of neighbors at point (x, y)
     * @param {Array} board 
     * @param {int} x 
     * @param {int} y 
     */
    calculateNeighbors(board, x, y) {

        var neighbors = {
            number: 0,
            withCorona: 0,
        };

        for (let i = 0; i < DIRECTIONS.length; i++) {
            const dir = DIRECTIONS[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            //I also check if I can move in the first free position

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1].free == false) {
                neighbors.number++;

                if (this.state.cells[y1 + "_" + x1].status.hasCorona == true)
                    neighbors.withCorona++;
            }
        }

        return neighbors;
    }

    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    }

    handleInitialPercentageChange = (event) => {
        this.setState({ initialPercentage: event.target.value });
    }

    handleClear = () => {
        this.setState({
            cells: [],
            isRunning: false,
            interval: 100,
            initialPercentage: 0,
            firstIteration: true,
            totalStartingPeople: 0,
            numberOfPositive: 0,
            iterationDays: [0],
        })
        this.board = this.makeEmptyBoard();


    };

    handleEvaluatePopulation(counterPopulation) {

        let newCell = Array();


        var arr = [PERCENTAGE_OF_YOUNG, PERCENTAGE_OF_ADULT, PERCENTAGE_OF_OLD];
        var label = [];
        arr.sort((a, b) => a - b);
        var i = 0;
        arr.forEach(element => {
            if (element == PERCENTAGE_OF_YOUNG) {
                label[i] = {};
                label[i].label = "PERCENTAGE_OF_YOUNG";
                label[i].age = YOUNG;
                label[i].percentage = PERCENTAGE_OF_YOUNG;
                label[i].counter = 0;
                label[i].total = this.evaluateNumberOfPeopleBasedOnPercentage(PERCENTAGE_OF_YOUNG, counterPopulation);
            } if (element == PERCENTAGE_OF_ADULT) {
                label[i] = {};
                label[i].label = "PERCENTAGE_OF_ADULT";
                label[i].age = ADULT;
                label[i].percentage = PERCENTAGE_OF_ADULT;
                label[i].counter = 0;
                label[i].total = this.evaluateNumberOfPeopleBasedOnPercentage(PERCENTAGE_OF_ADULT, counterPopulation);
            } if (element == PERCENTAGE_OF_OLD) {
                label[i] = {};
                label[i].label = "PERCENTAGE_OF_OLD";
                label[i].age = OLD;
                label[i].percentage = PERCENTAGE_OF_OLD;
                label[i].counter = 0;
                label[i].total = this.evaluateNumberOfPeopleBasedOnPercentage(PERCENTAGE_OF_OLD, counterPopulation);
            }
            i++;
        });

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                var status = {
                    condition: HEALTH,
                    alreadySick: false,
                    age: YOUNG,
                    hasCorona: false
                }
                let randomSeed = Math.random();
                //order the percentage


                //check if the cell contain an element or not

                if (this.board[y][x].free == false) {
                    var added = false;
                    if ((randomSeed <= arr[0] / 100) &&
                        label[0].total > label[0].counter && added == false) {
                        status.age = label[0].age;
                        label[0].counter = label[0].counter + 1;
                        added = true;
                    }

                    else if ((randomSeed >= arr[0] / 100 && randomSeed <= arr[1] / 100) &&
                        label[1].total > label[1].counter && added == false) {
                        status.age = label[1].age;
                        label[1].counter = label[1].counter + 1;
                        added = true;
                    }

                    else if ((randomSeed >= arr[1] / 100 && randomSeed <= arr[2] / 100) &&
                        label[2].total > label[2].counter && added == false) {
                        status.age = label[2].age;
                        label[2].counter = label[2].counter + 1;
                        added = true;
                    }

                    //check if i reached the number (and did not enter inside the right else)
                    //is old not added
                    if (label[0].counter > label[0].total && label[1].counter > label[1].total && added == false) {
                        status.age = label[2].age;
                        label[2].counter = label[2].counter + 1;
                        added = true;
                    }

                    if (label[0].counter > label[0].total && label[2].counter > label[2].total && added == false) {
                        status.age = label[1].age;
                        label[1].counter = label[1].counter + 1;
                        added = true;
                    }

                    if (label[1].counter > label[1].total && label[2].counter > label[2].total && added == false) {
                        status.age = label[0].age;
                        label[0].counter = label[0].counter + 1;
                        added = true;
                    }

                    //if only one is full, i choose in random between two 
                    if (label[0].counter > label[0].total && added == false) {
                        if (Math.random() <= 0.5) {
                            status.age = label[1].age;
                            label[1].counter = label[1].counter + 1;
                            added = true;
                        } else {
                            status.age = label[2].age;
                            label[2].counter = label[2].counter + 1;
                            added = true;
                        }
                    }

                    if (label[1].counter > label[1].total && added == false) {
                        if (Math.random() <= 0.5) {
                            status.age = label[0].age;
                            label[0].counter = label[0].counter + 1;
                            added = true;
                        } else {
                            status.age = label[2].age;
                            label[2].counter = label[2].counter + 1;
                            added = true;
                        }
                    }

                    if (label[2].counter > label[2].total && added == false) {
                        if (Math.random() <= 0.5) {
                            status.age = label[0].age;
                            label[0].counter = label[0].counter + 1;
                            added = true;
                        } else {
                            status.age = label[1].age;
                            label[1].counter = label[1].counter + 1;
                            added = true;
                        }
                    }

                    if (Math.random() <= this.state.initialPercentage / 100) {
                        status.hasCorona = true;
                        status.condition = POSITIVE;
                    }
                    newCell[y + "_" + x] = { x: x, y: y, status: status };
                }
            }
        }

        this.setState({ cells: newCell });
    }

    handleRandom = () => {
        var counterPopulation = 0;
        this.board = this.makeEmptyBoard();
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                //we give a chance of 25 percent that a people is there
                if ((Math.random() <= 0.25)) {
                    this.board[y][x].free = false;
                    //we count the number of population
                    counterPopulation++;
                }
            }
        }


        //now that we have the popolation, we choose, in a random way, who is
        //sick and who not, who has coronavirus, and who is old, adult or young
        // based on the setted percentage
        this.handleEvaluatePopulation(counterPopulation);
    }



    render() {
        const { cells, interval, isRunning } = this.state;

        return (
            <div>
                <div className="Board"
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {

                        Object.keys(cells).map(key => (
                            <Cell status={cells[key].status} x={cells[key].x} y={cells[key].y} key={key} />

                        )
                        )}

                </div>

                <div className="controls">
                    Aggiorna ogni <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
                    Percentuale iniziale di malati <input value={this.state.initialPercentage} onChange={this.handleInitialPercentageChange} />
                    {isRunning ?
                        <button className="button" onClick={this.stopGame}>Stop</button> :

                        <button className="button" onClick={this.runGame}>Avvia</button>
                    }
                    <button className="button" onClick={this.handleRandom}>Casuale</button>
                    <button className="button" onClick={this.handleClear}>Cancella</button>
                </div>

            </div>

        );
    }
}
export default Automata;