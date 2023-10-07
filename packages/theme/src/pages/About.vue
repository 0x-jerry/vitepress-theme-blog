<script setup lang="ts">
import VClientOnly from '@@/components/VClientOnly.vue'
import VSentence from '@@/components/VSentence.vue'
import { useTheme } from '@@/hooks/useTheme'

const theme = useTheme()
</script>

<template>
  <div class="flex-(~ col) items-center gap-4 mt-3">
    <div class="rainbow w-full p-10">
      <div class="heti max-w-full">
        <Content></Content>
      </div>
    </div>

    <div
      class="relative border-(1 solid gray-100) bg-black"
      style="width: 100%; aspect-ratio: 16 / 9; max-height: 500px"
    >
      <img class="block object-cover w-full h-full" src="https://0x-jerry.icu/api/img" />
      <div class="w-full h-full absolute top-0 left-0 flex items-center justify-center">
        <div
          class="w-4/5 bg-(black opacity-10) p-4 rounded-lg backdrop-(filter blur-sm) text-(white xs) sm:(text-sm p-6) md:(p-10)"
          style="text-shadow: 0 0 2px rgb(240, 240, 240)"
        >
          <VClientOnly>
            <VSentence>
              {{ theme.motto }}
            </VSentence>
          </VClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
:root {
  --angle: 45deg;
  --opacity: 0.5;
}

.rainbow {
  --border-size: 0.3rem;
  border: var(--border-size) solid transparent;

  /* Paint an image in the border */
  border-image: conic-gradient(
      from var(--angle),
      #d53e33 0deg 90deg,
      #fbb300 90deg 180deg,
      #377af5 180deg 270deg,
      #399953 270deg 360deg
    )
    1 stretch;
  background: rgb(255 255 255 / var(--opacity));
}

/* Animate when Houdini is available */
@supports (background: paint(houdini)) {
  @property --opacity {
    syntax: '<number>';
    initial-value: 0.5;
    inherits: false;
  }

  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes opacityChange {
    to {
      --opacity: 1;
    }
  }

  @keyframes rotate {
    to {
      --angle: 360deg;
    }
  }

  .rainbow {
    animation: rotate 4s linear infinite, opacityChange 3s infinite alternate;
  }
}
</style>
