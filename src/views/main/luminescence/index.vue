<template>
  <div class="flex w-100% h-full flex-wrap justify-around luminescence-wrapper">
    <div class="luminescence" @mousemove="onmousemove">
      <div>
        <h1>Taiwan</h1>
        <h2>Nancy Fleming</h2>
        <h3>http://sugi.tk/rugInstantly & Effortless!</h3>
        <p>
          black quite care danger needed canal floor reason teeth luck jack morning mill driven
          airplane column onto swim form light written cabin hour lie
        </p>
      </div>
    </div>
    <div class="luminescence" @mousemove="onmousemove">
      <div>
        <h1>Côte d'Ivoire</h1>
        <h2>Ronnie Lucas</h2>
        <h3>http://li.ga/nojverafInstantly & Effortless!</h3>
        <p>
          rate greatly missing row indicate themselves word neck fox brush aid bite drove melted
          common health soil children plan friend average farmer copy darkness
        </p>
      </div>
    </div>
    <div class="luminescence" @mousemove="onmousemove">
      <div>
        <h1>Oman</h1>
        <h2>Victor Bryant</h2>
        <h3>http://to.gn/vabnitfupInstantly & Effortless!</h3>
        <p>
          every trace safe nails pain nearby upon unusual which minute dot butter ship third
          straight men victory dirty tropical work seed suppose coal outer
        </p>
      </div>
    </div>
    <div class="luminescence" @mousemove="onmousemove">
      <div>
        <h1>Russia</h1>
        <h2>Ola Hansen</h2>
        <h3>http://celriuf.wf/itvafInstantly & Effortless!</h3>
        <p>
          taken task are blanket improve girl milk underline firm once war gave brown stove chamber
          welcome principle must plane lot column figure year tonight
        </p>
      </div>
    </div>
    <div class="luminescence" @mousemove="onmousemove">
      <div>
        <h1>Bosnia & Herzegovina</h1>
        <h2>Tom Mason</h2>
        <h3>http://zicvojsiz.za/sojInstantly & Effortless!</h3>
        <p>
          living news crack knowledge twenty secret whole rhyme date complete learn only handsome
          pressure education twice observe roll poor silk tiny wool signal upon
        </p>
      </div>
    </div>
    <div class="luminescence" @mousemove="onmousemove">
      <div>
        <h1>Gabon</h1>
        <h2>Nina Weber</h2>
        <h3>http://cocagopa.pf/vobvijInstantly & Effortless!</h3>
        <p>
          beginning chair pull include know letter acres see machinery type stronger function seen
          occur refused spell duty cage between underline bee share rest influence
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core';
import { ref } from 'vue';
definePage({
  meta: {
    title: '发光效果',
    icon: 'share',
    keepAlive: true,
  },
});

// const { x, y } = useMouse();

const x = ref(0);
const y = ref(0);

const rx = ref(0);
const ry = ref(0);

const onmousemove = (e: MouseEvent) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  x.value = e.clientX - left;
  y.value = e.clientY - top;

  // 计算旋转角度
  if (x.value > width / 2) {
    rx.value = (x.value - width / 2) / (width / 2);
  } else {
    rx.value = (x.value - width / 2) / (width / 2);
  }
  if (y.value > height / 2) {
    ry.value = (y.value - height / 2) / (height / 2);
  } else {
    ry.value = (y.value - height / 2) / (height / 2);
  }
};
</script>

<style scoped lang="scss">
.luminescence-wrapper {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
}
.luminescence {
  position: relative;
  color: #fff;
  width: 40%;
  height: 180px;
  margin-top: 20px;
  padding: 5px;
  z-index: 1;
  background-color: rgba(75, 75, 75, 0.1);
  overflow: hidden;
  transition: all 0.5s;
}

.luminescence:hover {
  z-index: 2;
}

.luminescence > div {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  z-index: 2;
}

.luminescence:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 150%;
  height: 150%;
  background: radial-gradient(
    circle at calc(v-bind(x) * 1px) calc(v-bind(y) * 1px),
    rgba(255, 211, 211, 0.2),
    transparent 50%
  );
  z-index: 1;
  /* animation: flicker 3s infinite; */
}
</style>
