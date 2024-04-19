const fs = require('fs/promises');

const sumNumbers = async (fileA, fileB) => {
    try {
        const dataA = await fs.readFile(fileA, 'utf-8');
        const dataB = await fs.readFile(fileB, 'utf-8');

        const numA = parseInt(dataA);
        const numB = parseInt(dataB);

        const sum = numA + numB;
        console.log(sum);
    } catch (err) {
        console.log('Error:', error);
    }
}

sumNumbers('./data/a.txt', './data/b.txt');
