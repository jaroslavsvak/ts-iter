import { iter } from '../index';

interface FileSystemObj {
    name: string,
    content?: FileSystemObj[],
    size?: number
}

const folderStructure: FileSystemObj = {
    name: 'root',
    content: [
        {
            name: 'system',
            content: [
                { name: 'drivers', content: [] },
                { name: 'kernel', size: 20 }
            ]
        },
        {
            name: 'data',
            content: [
                { name: 'app-settings', content: [] },
                {
                    name: 'documents',
                    content: [
                        { name: 'photo1', size: 50 },
                        { name: 'letter', size: 5 },
                        { name: 'spreasheet', size: 17 }
                    ]
                }
            ]
        },
        {
            name: 'software',
            content: [
                { name: 'office suite', size: 50 },
                { name: 'photo editor', size: 78 },
                { name: 'media player', size: 20 }
            ]
        }
    ]
};

// Lists all items in flat view
iter([folderStructure])
    .flatten(x => x.content)
    .forEach(x => console.log(x.name, x.size || ''));

// Creates a tree view
iter([folderStructure])
    .flattenAndMap(
        x => x.content,
        (x, level) => {
            return { name: x.name, size: x.size, level }
        })
    .forEach(x => console.log('- '.repeat(x.level), x.name, x.size || ''));

// Calculates total size of all files
const totalSize = iter([folderStructure]).flatten(x => x.content).sum(x => x.size || 0);
console.log('Total size', totalSize);

// Finds the largest file
const largestFile = iter([folderStructure])
    .flatten(x => x.content)
    .reduce(
        (max: FileSystemObj | undefined, fso) => (fso.size || 0) > (max && max.size || 0) ? fso : max,
        undefined);

console.log('Largest file', largestFile);
