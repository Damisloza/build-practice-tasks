const seconds = Number(process.argv[2]) || 30;
console.log(`Waiting ${seconds} seconds to simulate a slow check...`);
setTimeout(() => {
    console.log('Slow check finished.');
}, seconds * 1000);