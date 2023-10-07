<script setup lang="ts">
navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (const registration of registrations) {
    registration.unregister()
  }
})
</script>

<template></template>
