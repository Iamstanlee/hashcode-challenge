const fs = require('fs');
const fileName = 'e_also_big';
// Pizza class
class P {
   constructor(slice, type) {
      this.slice = slice;
      this.type = type;
   }
}

var pizzaList = [];
var orderedTypes = [];
var sum = 0;
var max = 0;
var count = 0;

fs.readFile(__dirname + '/' + fileName + '.in', 'utf8', function(err, data) {
   let d = data.split('\n');
   d.pop();
   max = d[0].split(' ')[0];
   pizzaList = d[1].split(' ').map((p, i) => {
      return new P(parseInt(p), parseInt(i));
   });
   count = pizzaList.length;
   console.time('pizza');
   getP(pizzaList, count);
   console.log(sum);
   console.timeEnd('pizza');
   orderedTypes.sort((a, b) => a.type - b.type);
   var types = orderedTypes.map(i => i.type);
   console.log('PROCESSING...');
   fs.writeFile(
      __dirname + '/' + fileName + '.out',
      `${types.length}\n${types.join(' ')}`,
      'utf8',
      function(err, res) {
         console.log('DONE');
      }
   );
});

function getP(Ps, ct) {
   while (ct > 0) {
      for (let j = Ps.length - 1; j >= 0; j--) {
         if (Ps[j].slice < max) {
            sum += Ps[j].slice;
            orderedTypes.push(Ps[j]);
            if (sum > max) {
               sum -= Ps[j].slice;
               orderedTypes.pop();
            }
         }
      }
      ct--;
   }
}
