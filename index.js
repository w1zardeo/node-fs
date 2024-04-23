const fs = require('fs/promises');
const path = require('path');

const sumNumbers = async (fileA, fileB) => {
    try {
        const dataA = await fs.readFile(path.resolve(fileA), 'utf-8');
        const dataB = await fs.readFile(path.resolve(fileB), 'utf-8');

        const numA = parseInt(dataA);
        const numB = parseInt(dataB);

        const sum = numA + numB;
        console.log(sum);
    } catch (err) {
        console.log('Error:', error);
    }
}

const pathDataA = './data/a.txt';
const pathDataB = './data/b.txt';

sumNumbers(pathDataA, pathDataB);