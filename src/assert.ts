export default function assert(d, m = 'assert error') {
  if (!d) throw new Error(m);
}
