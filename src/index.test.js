import test from 'ava';
import dthree from './index';

test('dthree should be an object', t => {
  t.is(typeof dthree, 'object');
});

test('dthree.selectAll should be a function', t => {
  t.is(typeof dthree.selectAll, 'function');
});

test('dthree.selectAll called without parameter should throw an error', t => {
  t.throws(() => {
    dthree.selectAll();
  })
});

test('dthree.selectAll called with a parameter namespace should not throw an error', t => {
  t.notThrows(() => {
    dthree.selectAll('toto');
  })
});

test('dthree.selectAll should return an object Selection', t => {
  t.is(typeof dthree.selectAll('namespace'), 'object');
});

test('dthree.selectAll should return the same object Selection with a similar namespace param', t => {
  t.is(dthree.selectAll('test'), dthree.selectAll('test'));
});

test('selections.data should populate a Selection', t => {
  const sel = dthree.selectAll('test1').data([1, 2, 3]);
  t.deepEqual(sel.enter(), [1, 2, 3]);
  t.deepEqual(sel.update(), []);
  t.deepEqual(sel.exit(), []);
  t.deepEqual(sel.all(), [1, 2, 3]);
});

test('selections.data should update an existing selection', t => {
  dthree.selectAll('test2').data([1, 2, 3, 4]);
  dthree.selectAll('test2').data([1, 2, 3]);
  t.deepEqual(dthree.selectAll('test2').enter(), []);
  t.deepEqual(dthree.selectAll('test2').update(), [1, 2, 3]);
  t.deepEqual(dthree.selectAll('test2').exit(), [4]);
  t.deepEqual(dthree.selectAll('test2').all(), [1, 2, 3]);
  dthree.selectAll('test2').data([1, 2, 4, 5]);
  t.deepEqual(dthree.selectAll('test2').enter(), [5]);
  t.deepEqual(dthree.selectAll('test2').update(), [1,2,4]);
  t.deepEqual(dthree.selectAll('test2').exit(), []);
  t.deepEqual(dthree.selectAll('test2').all(), [1,2,4,5]);
});

