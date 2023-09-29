import Vue from "vue";

const state = Vue.observable({
  time: new Date(),
});

function getStartTimeOfNextSecond() {
  return new Promise((resolve) => {
    const now = new Date();
    const timestamp = now.getTime();
    const remainder = timestamp % 1000;
    const millisecondsUntilNextSecond = 1000 - remainder;

    setTimeout(() => {
      state.time = new Date();
      resolve();
    }, millisecondsUntilNextSecond + 10);
  });
}

export { state, getStartTimeOfNextSecond };
