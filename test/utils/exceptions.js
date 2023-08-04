const PREFIX = 'Returned error: VM Exception while processing transaction: ';

async function tryCatch(promise, message) {
  try {
    await promise;
    throw null;
  } catch (error) {
    console.dir(error);
    assert(error, 'Expected an error but did not get one');
    assert(
      error.message.startsWith(PREFIX + message),
      "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead",
    );
  }
}

async function catchRevert(promise) {
  await tryCatch(promise, 'revert');
}
async function catchOutOfGas(promise) {
  await tryCatch(promise, 'out of gas');
}
async function catchInvalidJump(promise) {
  await tryCatch(promise, 'invalid JUMP');
}
async function catchInvalidOpcode(promise) {
  await tryCatch(promise, 'invalid opcode');
}
async function catchStackOverflow(promise) {
  await tryCatch(promise, 'stack overflow');
}
async function catchStackUnderflow(promise) {
  await tryCatch(promise, 'stack underflow');
}
async function catchStaticStateChange(promise) {
  await tryCatch(promise, 'static state change');
}

module.exports = {
  catchStaticStateChange,
  catchRevert,
  catchStackUnderflow,
  catchStackOverflow,
  catchInvalidOpcode,
  catchOutOfGas,
  catchInvalidJump,
};
