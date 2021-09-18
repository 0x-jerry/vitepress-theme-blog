<script setup lang="ts"></script>

<template>
  <div w="screen" h="screen" overflow="hidden" class="relative" bg="black">
    <img
      src="https://api.tiny-online.online/img/random?id=home"
      w="100vw"
      h="100vh"
      display="block"
      object="cover"
    />
    <div
      class="absolute top-0 left-0"
      h="screen"
      w="screen"
      z="10"
      display="flex"
      justify="center"
      align="items-center"
      bg="black opacity-10"
      text="white"
    >
      <div>
        <h1 text="4xl" p="x-10 y-5" border="rounded-md" font="mono">0x-Jerry's Blog</h1>
        <br />
        <ul
          w="min-content"
          m="auto"
          display="flex"
          justify="center"
          align="items-center"
          text="2xl"
          p="y-3 x-5"
          border="rounded-md"
        >
          <li class="mx-5">
            <VLink href="/blog" theme="white">
              <mdi:book></mdi:book>
            </VLink>
          </li>
          <li class="mx-5">
            <VLink href="/notes" theme="white">
              <mdi:notebook></mdi:notebook>
            </VLink>
          </li>
          <li class="mx-5">
            <VLink href="/timeline" theme="white">
              <mdi:timeline></mdi:timeline>
            </VLink>
          </li>
          <li class="mx-5">
            <VLink href="https://github.com/0x-jerry" :icon="false" theme="white">
              <mdi:github></mdi:github>
            </VLink>
          </li>
          <li class="mx-5">
            <VLink href="mailto:x.jerry.wang@gmail.com" :icon="false" theme="white">
              <mdi:email></mdi:email>
            </VLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less"></style>
